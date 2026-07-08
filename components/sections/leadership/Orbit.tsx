'use client';

import { useEffect, useRef, useState } from 'react';
import { TRACKS, FRAMEWORK } from '@/data/leadership';

const CX = 180, CY = 180, RORB = 128, RC = 52, RN = 33;
// --p2 파생 다크→라이트 6단 (mix #000/#fff만)
const SHADES = [
  'color-mix(in srgb, var(--p2) 52%, #000)',
  'color-mix(in srgb, var(--p2) 72%, #000)',
  'var(--p2)',
  'color-mix(in srgb, var(--p2) 68%, #fff)',
  'color-mix(in srgb, var(--p2) 48%, #fff)',
  'color-mix(in srgb, var(--p2) 32%, #fff)',
];
const pol = (r: number, aDeg: number): [number, number] => {
  const t = ((aDeg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(t), CY + r * Math.sin(t)];
};

export default function Orbit() {
  const secRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [sel, setSel] = useState<number | null>(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) { setShown(true); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cur = sel !== null ? TRACKS[sel] : null;
  const coreTop = cur ? cur.nm : 'Leadership';
  const coreSub = cur ? cur.ko : '6 tracks';

  return (
    <div className="orbit-wrap r" id="framework-orbit" ref={secRef}>
      <svg width="360" height="360" viewBox="0 0 360 360" role="img" aria-label="리더십 6대 역량 오빗">
        <circle cx={CX} cy={CY} r={RORB} fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 6" />
        {TRACKS.map((_, i) => {
          const [x, y] = pol(RORB, i * 60);
          return <line key={`l${i}`} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" />;
        })}
        {TRACKS.map((t, i) => {
          const [x, y] = pol(RORB, i * 60);
          const tc = i <= 2 ? '#fff' : 'color-mix(in srgb, var(--p2) 30%, #000)';
          return (
            <g
              key={`n${i}`}
              role="button"
              tabIndex={0}
              aria-label={`${t.ko} · ${t.t}`}
              aria-pressed={sel === i}
              style={{ cursor: 'pointer', opacity: shown ? 1 : 0, transformOrigin: `${x}px ${y}px`, transition: `transform .3s var(--ease), opacity .5s ease`, transitionDelay: shown ? `${i * 90}ms` : '0ms' }}
              onClick={() => setSel(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i); } }}
              onMouseEnter={(e) => { (e.currentTarget as SVGGElement).style.transform = 'scale(1.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as SVGGElement).style.transform = 'none'; }}
            >
              <circle cx={x} cy={y} r={RN} fill={SHADES[i]} />
              <text x={x} y={y + 4} textAnchor="middle" fill={tc} fontSize="12" fontWeight="700">{t.nm}</text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={RC} fill="#fff" stroke="var(--p2)" strokeWidth="2" />
        <text x={CX} y={CY - 2} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--p2)">{coreTop}</text>
        <text x={CX} y={CY + 15} textAnchor="middle" fontSize="11" fill="var(--muted)">{coreSub}</text>
      </svg>

      <div className="orbit-detail" aria-live="polite">
        <div className="wd-hint">{cur ? cur.k : FRAMEWORK.hint}</div>
        <div className="wd-name">{cur ? `${cur.ko} · ${cur.t}` : FRAMEWORK.name}</div>
        <div className="wd-desc">{cur ? cur.d : FRAMEWORK.desc}</div>
        <div className="wd-caps">
          {cur?.a.map((c) => (
            <span key={c} style={{ background: `color-mix(in srgb, ${SHADES[sel!]} 16%, #fff)`, color: SHADES[sel!] }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
