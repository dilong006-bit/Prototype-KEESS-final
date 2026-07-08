'use client';

import { useState } from 'react';
import { DEMO } from '@/data/hrd';

type Widget = { id: string; n: string; on: boolean };

function Block({ id }: { id: string }) {
  if (id === 'banner') return <div className="kw"><div className="kw-banner">메인 배너</div></div>;
  if (id === 'dash') return <div className="kw"><div className="kw-blk"><b>학습 대시보드</b><div className="kw-row"><i /><i /><i /></div></div></div>;
  if (id === 'courses') return <div className="kw"><div className="kw-blk"><b>과정 리스트</b><div className="kw-cards"><i /><i /><i /></div></div></div>;
  if (id === 'reco') return <div className="kw"><div className="kw-blk"><b>추천 강의</b><div className="kw-cards"><i /><i /></div></div></div>;
  if (id === 'debate') return <div className="kw"><div className="kw-debate">디베이트</div></div>;
  return null;
}

export default function KgesaDemo() {
  const [theme, setTheme] = useState<'gnb' | 'lnb'>('gnb');
  const [widgets, setWidgets] = useState<Widget[]>(DEMO.widgets.map((w) => ({ ...w })));

  const toggle = (i: number) => setWidgets((ws) => ws.map((w, k) => (k === i ? { ...w, on: !w.on } : w)));
  const move = (i: number, dir: 'up' | 'down') => setWidgets((ws) => {
    const j = dir === 'up' ? i - 1 : i + 1;
    if (j < 0 || j >= ws.length) return ws;
    const next = ws.slice();
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  });

  const menu = DEMO.foMenu;
  const ons = widgets.filter((w) => w.on && w.id !== 'float');
  const floatOn = widgets.find((w) => w.id === 'float')?.on;
  const foKey = widgets.map((w) => (w.on ? w.id : '')).join('') + theme; // 리마운트로 등장 애니

  const foBody = (
    <div className="fo-body">
      {ons.map((w) => <Block key={w.id} id={w.id} />)}
      {floatOn && <div className="fo-float">+</div>}
    </div>
  );

  return (
    <div className="kg-demo r">
      <div className="kg-fo-wrap">
        <div className="kg-fo-bar"><span className="dot" /><span className="dot" /><span className="dot" /><span className="kg-url">연수원 학습자 화면 (FO) · 미리보기</span></div>
        <div className="kg-fo" key={foKey}>
          {theme === 'gnb' ? (
            <>
              <div className="fo-gnb"><div className="fo-logo">KG 연수원</div><div className="fo-menu">{menu.map((m) => <span key={m}>{m}</span>)}</div></div>
              {foBody}
            </>
          ) : (
            <div className="fo-lnb-wrap">
              <div className="fo-lnb"><div className="fo-logo">KG 연수원</div>{menu.map((m) => <span key={m}>{m}</span>)}</div>
              {foBody}
            </div>
          )}
        </div>
      </div>

      <div className="kg-ctrl">
        <div className="kc-label">테마</div>
        <div className="kc-theme">
          <button className={`kc-tbtn${theme === 'gnb' ? ' on' : ''}`} onClick={() => setTheme('gnb')}>GNB형 (상단 메뉴)</button>
          <button className={`kc-tbtn${theme === 'lnb' ? ' on' : ''}`} onClick={() => setTheme('lnb')}>LNB형 (좌측 메뉴)</button>
        </div>
        <div className="kc-label" style={{ marginTop: 20 }}>위젯 구성</div>
        <div className="kw-list">
          {widgets.map((w, i) => (
            <div className="kw-item" key={w.id}>
              <span className="kw-name">{w.n}</span>
              <div className="kw-actions">
                <button className="kw-mv" aria-label={`${w.n} 위로`} onClick={() => move(i, 'up')}>↑</button>
                <button className="kw-mv" aria-label={`${w.n} 아래로`} onClick={() => move(i, 'down')}>↓</button>
                <button className={`kw-sw${w.on ? ' on' : ''}`} aria-label={`${w.n} 사용 여부`} aria-pressed={w.on} onClick={() => toggle(i)} />
              </div>
            </div>
          ))}
        </div>
        <p className="kc-hint">{DEMO.ctrlHint}</p>
      </div>
    </div>
  );
}
