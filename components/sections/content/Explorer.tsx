'use client';

import { useMemo, useState } from 'react';
import Modal from '@/components/common/Modal';
import { COURSES, PILLARS, pillarGrad, type Course } from '@/data/courses';

const IcSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>;

// F9: 기본 정렬 = 대표 우선 (featured desc → rank asc → 차시 desc)
function sortFeatured(a: Course[]) {
  return [...a].sort(
    (x, y) => Number(y.featured) - Number(x.featured) || x.rank - y.rank || (y.curriculum_count || 0) - (x.curriculum_count || 0),
  );
}

const refundLabel = (r: Course['refund']) => (r === '예정' ? '환급 예정' : r === '환급' ? '환급' : null);

function Card({ c, onOpen }: { c: Course; onOpen: () => void }) {
  const rf = refundLabel(c.refund);
  return (
    <button className={`ccard pil-${c.pillar}`} onClick={onOpen}>
      <div className="thumb" style={{ background: pillarGrad(c.pillar) }}>
        <span className="cat">{c.pillar_label}</span>
        <span className="hrs">{c.duration}</span>
        {c.featured && <span className="featbdg">대표</span>}
      </div>
      <div className="body">
        <h3>{c.title}</h3>
        <div className="meta"><span>차시 {c.curriculum_count}</span>{c.sme && <span>{c.sme}</span>}</div>
        <div className="badges">
          <span className="bdg tg">{c.target}</span>
          <span className="bdg lv">{c.level}</span>
          {rf && <span className="bdg gov">{rf}</span>}
        </div>
        <div className="kw">{c.keywords.slice(0, 3).map((k) => <span key={k}>{k}</span>)}</div>
      </div>
    </button>
  );
}

function Detail({ c, onConsult }: { c: Course; onConsult: () => void }) {
  const rf = refundLabel(c.refund);
  return (
    <div>
      <div className="cdetail-head" style={{ background: pillarGrad(c.pillar) }}>
        <div className="cat">{c.pillar_label}</div>
        <h3 id="cdetail-title">{c.title}</h3>
        <div className="mb">
          <span>{c.target}</span><span>{c.level}</span><span>{c.duration}</span><span>차시 {c.curriculum_count}</span>{rf && <span>{rf}</span>}
        </div>
      </div>
      <div className="mblock"><div className="lb">학습 개요</div><p>{c.overview}</p></div>
      {c.objectives.length > 0 && <div className="mblock"><div className="lb">학습 목표</div><ul>{c.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul></div>}
      {c.curriculum.length > 0 && <div className="mblock"><div className="lb">커리큘럼</div><ol>{c.curriculum.map((o, i) => <li key={i}>{o}</li>)}</ol></div>}
      {c.tools.length > 0 && <div className="mblock"><div className="lb">활용 툴</div><div className="mtools">{c.tools.map((t) => <span key={t}>{t}</span>)}</div></div>}
      {c.sme && <div className="mblock"><div className="lb">강사</div><p><b>{c.sme}</b>{c.sme_affil && <span className="sme-affil"> · {c.sme_affil}</span>}</p></div>}
      {c.linked_courses.length > 0 && <div className="mblock"><div className="lb">추천 연계 과정</div><div className="mtools">{c.linked_courses.map((t) => <span key={t}>{t}</span>)}</div></div>}
      <div className="mcta">
        <span className="src">원본: {c.detail_pdf}</span>
        <button className="btn btn-ink" onClick={onConsult}>이 과정 도입 문의</button>
      </div>
    </div>
  );
}

// 공유 렌더 엔진 — 페이지 섹션(#featured)과 모달이 동일 컴포넌트 재사용 (F2·F3)
export function CourseExplorer({ openConsult }: { openConsult: (axis: string) => void }) {
  const [pillar, setPillar] = useState('all');
  const [q, setQ] = useState('');
  const [detail, setDetail] = useState<Course | null>(null);

  const cc = (k: string) => (k === 'all' ? COURSES.length : COURSES.filter((c) => c.pillar === k).length);

  const list = useMemo(() => {
    const match = (c: Course) => {
      if (pillar !== 'all' && c.pillar !== pillar) return false;
      if (q) {
        const h = (c.title + ' ' + c.keywords.join(' ') + ' ' + c.overview + ' ' + c.tools.join(' ') + ' ' + (c.sme || '')).toLowerCase();
        if (!h.includes(q.toLowerCase())) return false;
      }
      return true;
    };
    return sortFeatured(COURSES.filter(match));
  }, [pillar, q]);

  return (
    <div className="cexp">
      <div className="exp-tabs" role="tablist" aria-label="카테고리">
        {PILLARS.map((p) => (
          <button
            key={p.key}
            className={`exp-tab${pillar === p.key ? ' on' : ''}`}
            role="tab"
            aria-selected={pillar === p.key}
            style={p.accent ? ({ ['--tab-accent' as string]: p.accent }) : undefined}
            onClick={() => setPillar(p.key)}
          >
            {p.label}<span className="n">{cc(p.key)}</span>
          </button>
        ))}
      </div>
      <div className="cexp-bar">
        <label className="search"><IcSearch /><input type="search" placeholder="과정명·키워드 검색" aria-label="검색" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <span className="count"><b>{list.length}</b> / {COURSES.length}</span>
        {(pillar !== 'all' || q) && <button className="reset" onClick={() => { setPillar('all'); setQ(''); }}>초기화</button>}
      </div>
      <div className="exp-grid">
        {list.length
          ? list.map((c) => <Card key={c.id} c={c} onOpen={() => setDetail(c)} />)
          : <div className="exp-empty"><b>결과 없음</b>검색어를 지우거나 카테고리를 바꿔보세요.</div>}
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} labelledBy="cdetail-title" title={detail ? detail.title : ''} maxWidth={640}>
        {detail && <Detail c={detail} onConsult={() => { const t = detail.title; setDetail(null); openConsult(t); }} />}
      </Modal>
    </div>
  );
}

// 모달 진입점 (FAB·히어로·최종 CTA) — 동일 CourseExplorer 재사용
export default function Explorer({ open, onClose, openConsult }: { open: boolean; onClose: () => void; openConsult: (axis: string) => void }) {
  const title = (
    <span className="exp-head">
      <span className="cat">Featured Lineup</span>
      <span>가장 먼저 살펴봐야 할 대표 과정</span>
      <span className="mb">8,426개 중 대표 선별</span>
    </span>
  );
  return (
    <Modal open={open} onClose={onClose} labelledBy="exp-title" title={title} maxWidth={980}>
      <CourseExplorer openConsult={openConsult} />
    </Modal>
  );
}
