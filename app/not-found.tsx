import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/error.css';
import Nav from '@/components/common/Nav';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | KEESS',
  robots: { index: false, follow: false },
};

// 서비스 카드 4종 — 링크는 실제 5개 라우트로만 (에러 페이지에서 재-404 방지)
const NF_CARDS = [
  { no: '01', name: 'AX·AI 전환', href: '/ax-ai', acc: '#2E1A6B', desc: 'AI를 배우는 데서 멈추지 않고, 일하는 방식을 바꿉니다.' },
  { no: '02', name: '리더십·조직', href: '/leadership', acc: '#E91E63', desc: '좋은 리더는 우연히 만들어지지 않습니다.' },
  { no: '03', name: 'HRD 통합 솔루션', href: '/hrd', acc: '#8B27A8', desc: 'HRD 운영의 복잡함은 줄이고, 교육의 완성도는 높입니다.' },
  { no: '04', name: '콘텐츠 솔루션', href: '/content', acc: '#F58220', desc: '기업에 필요한 모든 교육을, 한 곳에서 고릅니다.' },
];

export default function NotFound() {
  return (
    <>
      <Nav current="home" consultHref="/#inq" forceSolid />
      <main id="main" className="nf" tabIndex={-1}>
        <div className="nf-num">404</div>
        <p className="nf-eyebrow">Page Not Found</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p className="nf-desc">주소가 변경되었거나 잘못 입력된 주소일 수 있습니다. 아래에서 찾으시는 서비스로 바로 이동하실 수 있습니다.</p>

        <div className="nf-cta">
          <Link className="btn btn-ink" href="/">홈으로 이동</Link>
          <Link className="btn-line" href="/#inq">교육 상담 바로가기</Link>
        </div>

        <p className="nf-svc-label">KEESS 서비스 바로가기</p>
        <div className="nf-cards">
          {NF_CARDS.map((c) => (
            <Link className="nf-card" href={c.href} key={c.no} style={{ ['--acc' as string]: c.acc }}>
              <span className="no">{c.no}</span>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <span className="go">바로가기 →</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
