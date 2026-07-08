'use client';

import { useMemo, useState } from 'react';
import Modal from '@/components/common/Modal';
import { COURSES, CATS, CAT_GRAD, LEVEL_ORDER, type Course } from '@/data/courses';
import { EXPLORER } from '@/data/content';

function uniq(sel: (c: Course) => string | string[] | null | undefined) {
  const s = new Set<string>();
  COURSES.forEach((c) => {
    const v = sel(c);
    if (Array.isArray(v)) v.forEach((x) => x && s.add(x));
    else if (v) s.add(v);
  });
  return [...s];
}

export default function Explorer({ open, onClose, openConsult }: { open: boolean; onClose: () => void; openConsult: (axis: string) => void }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [target, setTarget] = useState('');
  const [level, setLevel] = useState('');
  const [band, setBand] = useState('');
  const [tool, setTool] = useState('');
  const [sort, setSort] = useState('default');
  const [detail, setDetail] = useState<Course | null>(null);

  const targets = useMemo(() => uniq((c) => c.target), []);
  const levels = useMemo(() => uniq((c) => c.level), []);
  const bands = useMemo(() => uniq((c) => c.duration_band), []);
  const tools = useMemo(() => uniq((c) => c.tools), []);

  const catCount = (k: string) => (k === 'all' ? COURSES.length : COURSES.filter((c) => c.category_key === k).length);

  const list = useMemo(() => {
    const match = (c: Course) => {
      if (cat !== 'all' && c.category_key !== cat) return false;
      if (target && c.target !== target) return false;
      if (level && c.level !== level) return false;
      if (band && c.duration_band !== band) return false;
      if (tool && !(c.tools || []).includes(tool)) return false;
      if (q) {
        const h = (c.title + ' ' + (c.keywords || []).join(' ') + ' ' + (c.overview || '') + ' ' + (c.tools || []).join(' ')).toLowerCase();
        if (!h.includes(q.toLowerCase())) return false;
      }
      return true;
    };
    const r = COURSES.filter(match);
    if (sort === 'hours-asc') r.sort((x, y) => (x.hours || 0) - (y.hours || 0));
    else if (sort === 'hours-desc') r.sort((x, y) => (y.hours || 0) - (x.hours || 0));
    else if (sort === 'level') r.sort((x, y) => (LEVEL_ORDER[x.level] || 0) - (LEVEL_ORDER[y.level] || 0));
    return r;
  }, [cat, q, target, level, band, tool, sort]);

  const reset = () => { setCat('all'); setQ(''); setTarget(''); setLevel(''); setBand(''); setTool(''); setSort('default'); };

  const title = (
    <span className="exp-head">
      <span className="cat">{EXPLORER.cat}</span>
      <span>{EXPLORER.title}</span>
      <span className="mb">{EXPLORER.mb}</span>
    </span>
  );

  return (
    <>
      <Modal open={open && !detail} onClose={onClose} labelledBy="exp-title" title={title} maxWidth={920}>
        <div className="exp-tabs" role="tablist">
          {CATS.map((c) => (
            <button key={c.key} className={`exp-tab${cat === c.key ? ' on' : ''}`} role="tab" aria-selected={cat === c.key} onClick={() => setCat(c.key)}>
              {c.label}<span className="n">{catCount(c.key)}</span>
            </button>
          ))}
        </div>
        <div className="toolbar">
          <label className="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <input type="search" placeholder={EXPLORER.searchPlaceholder} aria-label="검색" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="sels">
            <select aria-label="대상" value={target} onChange={(e) => setTarget(e.target.value)}><option value="">대상 전체</option>{targets.map((t) => <option key={t}>{t}</option>)}</select>
            <select aria-label="레벨" value={level} onChange={(e) => setLevel(e.target.value)}><option value="">레벨 전체</option>{levels.map((t) => <option key={t}>{t}</option>)}</select>
            <select aria-label="시간" value={band} onChange={(e) => setBand(e.target.value)}><option value="">시간 전체</option>{bands.map((t) => <option key={t}>{t}</option>)}</select>
            <select aria-label="툴" value={tool} onChange={(e) => setTool(e.target.value)}><option value="">툴 전체</option>{tools.map((t) => <option key={t}>{t}</option>)}</select>
            <select aria-label="정렬" value={sort} onChange={(e) => setSort(e.target.value)}>{EXPLORER.sorts.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}</select>
          </div>
          <span className="count"><b>{list.length}</b> / {COURSES.length}</span>
          <button className="reset" onClick={reset}>{EXPLORER.reset}</button>
        </div>
        <div className="exp-grid">
          {list.length ? list.map((c) => (
            <button className="ccard" key={c.id} onClick={() => setDetail(c)}>
              <div className="thumb" style={{ background: CAT_GRAD[c.category_key] }}>
                <span className="cat">{c.category}</span><span className="hrs">{c.duration}</span>
              </div>
              <div className="body">
                <h3>{c.title}</h3>
                <div className="meta"><span>차시 {c.curriculum_count || 0}</span>{c.instructor && <span>{c.instructor}</span>}</div>
                <div className="badges"><span className="bdg tg">{c.target}</span><span className="bdg lv">{c.level}</span>{c.book_provided && <span className="bdg bk">도서</span>}</div>
                <div className="kw">{(c.keywords || []).slice(0, 3).map((k) => <span key={k}>{k}</span>)}</div>
              </div>
            </button>
          )) : <div className="exp-empty"><b>{EXPLORER.empty}</b>필터를 조정해 보세요.</div>}
        </div>
      </Modal>

      {/* 과정 상세 */}
      <Modal open={!!detail} onClose={() => setDetail(null)} labelledBy="cdetail-title" title={detail ? detail.title : ''} maxWidth={640}>
        {detail && (
          <div>
            <div className="cdetail-head" style={{ background: CAT_GRAD[detail.category_key] }}>
              <div className="cat">{detail.category}</div>
              <h3 id="cdetail-title">{detail.title}</h3>
              <div className="mb">
                <span>{detail.target}</span><span>{detail.level}</span><span>{detail.duration}</span><span>차시 {detail.curriculum_count || 0}</span>{detail.book_provided && <span>도서 제공</span>}
              </div>
            </div>
            <div className="mblock"><div className="lb">학습 개요</div><p>{detail.overview}</p></div>
            {detail.objectives?.length > 0 && <div className="mblock"><div className="lb">학습 목표</div><ul>{detail.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul></div>}
            {detail.curriculum?.length > 0 && <div className="mblock"><div className="lb">커리큘럼</div><ol>{detail.curriculum.map((o, i) => <li key={i}>{o}</li>)}</ol></div>}
            {detail.tools?.length > 0 && <div className="mblock"><div className="lb">활용 툴</div><div className="mtools">{detail.tools.map((t) => <span key={t}>{t}</span>)}</div></div>}
            {detail.instructor && <div className="mblock"><div className="lb">강사</div><p><b>{detail.instructor}</b></p></div>}
            <div className="mcta">
              <span className="src">원본: {detail.detail_pdf || '-'}</span>
              <button className="btn btn-ink" onClick={() => { const t = detail.title; setDetail(null); openConsult(t); }}>이 과정 도입 문의</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
