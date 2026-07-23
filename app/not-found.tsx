import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/error.css';
import Nav from '@/components/common/Nav';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | KEESS',
  robots: { index: false, follow: false },
};

// 사이트 기존 아이콘 언어 그대로 재사용(인라인 스트로크 SVG 24px / stroke 1.8) — 외부 아이콘 라이브러리 미도입
const IcAx = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="2.5" /><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" /></svg>
);
const IcPeople = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0112 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15 20a5 5 0 019-3" /></svg>
);
const IcLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 16.5l9 5 9-5" /></svg>
);
const IcCam = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></svg>
);

// 서비스 카드 4종 — 링크는 실제 5개 라우트로만 (에러 페이지에서 재-404 방지)
const NF_CARDS = [
  { name: 'AX·AI 전환', href: '/ax-ai', acc: '#2E1A6B', Icon: IcAx, desc: 'AI로 일하는 방식을 바꿉니다.' },
  { name: '리더십·조직', href: '/leadership', acc: '#E91E63', Icon: IcPeople, desc: '성장단계에 맞는 리더십을 설계합니다.' },
  { name: 'HRD 통합 솔루션', href: '/hrd', acc: '#8B27A8', Icon: IcLayers, desc: 'HRD 운영을 한 흐름으로 연결합니다.' },
  { name: '콘텐츠 솔루션', href: '/content', acc: '#F58220', Icon: IcCam, desc: '필요한 교육을 한 곳에서 고릅니다.' },
];

export default function NotFound() {
  return (
    <>
      <Nav current="home" consultHref="/#inq" forceSolid />
      <main id="main" className="nf" tabIndex={-1}>
        <div className="nf-num">404</div>
        <p className="nf-eyebrow">Page Not Found</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        {/* 문장 단위 줄바꿈 — 좁은 화면에서는 문장 내부에서만 자연 줄바꿈 */}
        <p className="nf-desc">
          <span>주소가 변경되었거나 잘못 입력된 주소일 수 있습니다.</span>
          <span>아래에서 찾으시는 서비스로 바로 이동하실 수 있습니다.</span>
        </p>

        <div className="nf-cta">
          <Link className="btn btn-ink" href="/">홈으로 이동</Link>
          <Link className="btn-line" href="/#inq">교육 상담 바로가기</Link>
        </div>

        <p className="nf-svc-label">KEESS 서비스 바로가기</p>
        <div className="nf-cards">
          {NF_CARDS.map(({ name, href, acc, Icon, desc }) => (
            <Link className="nf-card" href={href} key={href} style={{ ['--acc' as string]: acc }}>
              <span className="ic"><Icon /></span>
              <h3>{name}</h3>
              <p>{desc}</p>
              <span className="go">바로가기 →</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
