'use client';

import { useEffect } from 'react';

// 고객 문의 채널 — 값 상수로 분리(이용 조직 확정 시 교체)
const CONTACT_TEL = '02-828-2704'; // TODO: 이관 조직 확정 시 교체
const CONTACT_EMAIL = 'kg11_kg6030@kggroup.co.kr'; // TODO: 이관 조직 확정 시 교체

/**
 * 루트 레이아웃 자체가 실패한 최상위 상황.
 * html·body를 직접 포함하며, 전역 CSS·웹폰트·이미지를 일절 참조하지 않는다(시스템 폰트 + 인라인 스타일).
 * ※ error.tsx와 동일 UI를 독립 동작용으로 하드코딩 복사(예외 허용).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        <div className="ge-root">
          <style>{GE_CSS}</style>
          <div className="ge-card">
            <div className="ge-logo">KEESS</div>
            <div className="ge-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 7.4v6" /><circle cx="12" cy="16.9" r="1.05" fill="currentColor" stroke="none" /></svg>
            </div>
            <h1 className="ge-title">일시적인 오류가 발생했습니다</h1>
            <p className="ge-desc">
              <span>잠시 후 다시 시도해 주세요.</span>
              <span>문제가 계속되면 아래 연락처로 문의해 주시기 바랍니다.</span>
            </p>
            <div className="ge-cta">
              <button type="button" className="ge-btn ge-btn-ink" onClick={() => reset()}>다시 시도</button>
              <a className="ge-btn ge-btn-line" href="/">홈으로 이동</a>
            </div>
            <div className="ge-contact">
              <span className="ge-contact-label">고객 문의</span>
              <span className="ge-contact-val">
                <a href={`tel:${CONTACT_TEL.replace(/-/g, '')}`}>Tel {CONTACT_TEL}</a>
                <span className="ge-dot">·</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
            </div>
          </div>
          <p className="ge-code">ERROR 500</p>
        </div>
      </body>
    </html>
  );
}

const GE_CSS = `
.ge-root{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;
  padding:64px 24px;text-align:center;background:#FAFAFB;color:#14141A;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Malgun Gothic","맑은 고딕",sans-serif;-webkit-font-smoothing:antialiased}
.ge-card{width:100%;max-width:520px;background:#fff;border:1px solid #E6E8EC;border-radius:20px;padding:44px 32px 36px;
  box-shadow:0 24px 60px -32px rgba(20,20,26,.28)}
.ge-logo{font-size:20px;font-weight:900;letter-spacing:-.02em;color:#14141A}
.ge-mark{width:66px;height:66px;margin:24px auto 0;border-radius:50%;display:grid;place-items:center;color:#2E1A6B;
  background:rgba(46,26,107,.07);box-shadow:inset 0 0 0 2px #2E1A6B}
.ge-mark svg{width:30px;height:30px;display:block}
.ge-title{margin:22px 0 0;font-size:23px;font-weight:800;letter-spacing:-.02em;color:#14141A}
.ge-desc{margin:12px 0 0;font-size:15px;line-height:1.7;color:#54585f;word-break:keep-all}
.ge-desc span{display:block}
.ge-cta{margin-top:28px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.ge-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;font-weight:700;font-size:15px;
  padding:14px 28px;cursor:pointer;font-family:inherit;text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease}
.ge-btn-ink{background:#14141A;color:#fff;border:1px solid #14141A}
.ge-btn-ink:hover{transform:translateY(-2px)}
.ge-btn-line{background:#fff;color:#14141A;border:1px solid #E6E8EC}
.ge-btn-line:hover{border-color:#14141A;transform:translateY(-2px)}
.ge-contact{margin-top:26px;padding-top:22px;border-top:1px solid #E6E8EC;display:flex;flex-direction:column;gap:6px}
.ge-contact-label{font-size:12.5px;font-weight:800;color:#54585f}
.ge-contact-val{font-size:14px;color:#33333c;word-break:break-word}
.ge-contact-val a{color:inherit;text-decoration:none;border-bottom:1px solid transparent;transition:border-color .2s ease}
.ge-contact-val a:hover{border-bottom-color:#C6CBD3}
.ge-dot{margin:0 8px;color:#C6CBD3}
.ge-code{font-size:12px;font-weight:800;letter-spacing:.18em;color:#9aa0a8}
@media(max-width:520px){.ge-card{padding:36px 22px 30px}.ge-title{font-size:20px}}
`;
