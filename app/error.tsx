'use client';

import { useEffect } from 'react';

// 고객 문의 채널 — 값 상수로 분리(이용 조직 확정 시 교체)
const CONTACT_TEL = '02-828-2704'; // TODO: 이관 조직 확정 시 교체
const CONTACT_EMAIL = 'kg11_kg6030@kggroup.co.kr'; // TODO: 이관 조직 확정 시 교체

/**
 * 라우트 렌더/데이터 처리 중 예외 시 노출되는 500 화면.
 * GNB·푸터·이미지·웹폰트에 의존하지 않는 독립 화면(스타일은 컴포넌트 내부에서 해결).
 * 사용자 화면에는 오류 원인을 노출하지 않는다.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // 콘솔 기록만(추후 모니터링 연동 대비). 화면에는 미노출.
    console.error(error);
  }, [error]);

  return (
    <div className="e5-root">
      <style>{E5_CSS}</style>
      <div className="e5-card">
        <div className="e5-logo">KEESS</div>
        <div className="e5-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 7.4v6" /><circle cx="12" cy="16.9" r="1.05" fill="currentColor" stroke="none" /></svg>
        </div>
        <h1 className="e5-title">일시적인 오류가 발생했습니다</h1>
        <p className="e5-desc">
          <span>잠시 후 다시 시도해 주세요.</span>
          <span>문제가 계속되면 아래 연락처로 문의해 주시기 바랍니다.</span>
        </p>
        <div className="e5-cta">
          <button type="button" className="e5-btn e5-btn-ink" onClick={() => reset()}>다시 시도</button>
          <a className="e5-btn e5-btn-line" href="/">홈으로 이동</a>
        </div>
        <div className="e5-contact">
          <span className="e5-contact-label">고객 문의</span>
          <span className="e5-contact-val">
            <a href={`tel:${CONTACT_TEL.replace(/-/g, '')}`}>Tel {CONTACT_TEL}</a>
            <span className="e5-dot">·</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
        </div>
      </div>
      <p className="e5-code">ERROR 500</p>
    </div>
  );
}

// 독립 동작을 위한 자체 스타일(외부 CSS·웹폰트 미참조, 시스템 폰트 스택)
const E5_CSS = `
.e5-root{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;
  padding:64px 24px;text-align:center;background:#FAFAFB;color:#14141A;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Malgun Gothic","맑은 고딕",sans-serif;-webkit-font-smoothing:antialiased}
.e5-card{width:100%;max-width:520px;background:#fff;border:1px solid #E6E8EC;border-radius:20px;padding:44px 32px 36px;
  box-shadow:0 24px 60px -32px rgba(20,20,26,.28)}
.e5-logo{font-size:20px;font-weight:900;letter-spacing:-.02em;color:#14141A}
.e5-mark{width:66px;height:66px;margin:24px auto 0;border-radius:50%;display:grid;place-items:center;color:#2E1A6B;
  background:rgba(46,26,107,.07);box-shadow:inset 0 0 0 2px #2E1A6B}
.e5-mark svg{width:30px;height:30px;display:block}
.e5-title{margin:22px 0 0;font-size:23px;font-weight:800;letter-spacing:-.02em;color:#14141A}
.e5-desc{margin:12px 0 0;font-size:15px;line-height:1.7;color:#54585f;word-break:keep-all}
.e5-desc span{display:block}
.e5-cta{margin-top:28px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.e5-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;font-weight:700;font-size:15px;
  padding:14px 28px;cursor:pointer;font-family:inherit;text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease}
.e5-btn-ink{background:#14141A;color:#fff;border:1px solid #14141A}
.e5-btn-ink:hover{transform:translateY(-2px)}
.e5-btn-line{background:#fff;color:#14141A;border:1px solid #E6E8EC}
.e5-btn-line:hover{border-color:#14141A;transform:translateY(-2px)}
.e5-contact{margin-top:26px;padding-top:22px;border-top:1px solid #E6E8EC;display:flex;flex-direction:column;gap:6px}
.e5-contact-label{font-size:12.5px;font-weight:800;color:#54585f}
.e5-contact-val{font-size:14px;color:#33333c;word-break:break-word}
.e5-contact-val a{color:inherit;text-decoration:none;border-bottom:1px solid transparent;transition:border-color .2s ease}
.e5-contact-val a:hover{border-bottom-color:#C6CBD3}
.e5-dot{margin:0 8px;color:#C6CBD3}
.e5-code{font-size:12px;font-weight:800;letter-spacing:.18em;color:#9aa0a8}
@media(max-width:520px){.e5-card{padding:36px 22px 30px}.e5-title{font-size:20px}}
`;
