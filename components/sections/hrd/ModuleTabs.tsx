'use client';

import { useState } from 'react';
import { MOD } from '@/data/hrd';

export default function ModuleTabs() {
  const [i, setI] = useState(0);
  const m = MOD[i];
  return (
    <>
      <div className="tabs r" role="tablist" aria-label="솔루션 모듈">
        {MOD.map((mm, idx) => (
          <button key={mm.k} className={`tab${i === idx ? ' on' : ''}`} role="tab" aria-selected={i === idx} onClick={() => setI(idx)}>{mm.k}</button>
        ))}
      </div>
      <div className="tab-panel r" role="tabpanel" aria-live="polite">
        <div className="mp-head"><span className="mp-k">{m.k}</span><h3>{m.t}</h3><p>{m.d}</p></div>
        <div className="mp-grid">
          {m.f.map((x) => <div className="mp-f" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}
        </div>
      </div>
    </>
  );
}
