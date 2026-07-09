'use client';

import { EMAIL_RE } from '@/lib/utils';
import { createContext, useContext, useState } from 'react';
import Modal from '@/components/common/Modal';
import Explorer from './Explorer';
import { CONSULT_MODAL, DOWNLOAD_MODAL, DOWNLOAD } from '@/data/content';

interface Ctx { openExplorer: () => void; openConsult: (axis?: string) => void; openDownload: () => void }
const ModalCtx = createContext<Ctx>({ openExplorer: () => {}, openConsult: () => {}, openDownload: () => {} });
export const useContentModal = () => useContext(ModalCtx);


function triggerDL() {
  const a = document.createElement('a');
  a.href = DOWNLOAD.fileHref;
  a.download = 'KG에듀원_과정리스트.xlsx';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function ConsultBody({ axis, onClose }: { axis?: string; onClose: () => void }) {
  const [v, setV] = useState({ name: '', org: '', mail: '', msg: '' });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const upd = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  function submit() {
    const next: Record<string, boolean> = {};
    let ok = true;
    (['name', 'org'] as const).forEach((k) => { const bad = !(v[k] || '').trim(); next[k] = bad; if (bad) ok = false; });
    const eok = EMAIL_RE.test((v.mail || '').trim());
    next.mail = !eok; if (!eok) ok = false;
    setErrs(next);
    if (!ok) return;
    setDone(true);
  }
  if (done) return <div className="okmsg"><div className="ic">✓</div><h3>{CONSULT_MODAL.successTitle}</h3><p className="lead">{CONSULT_MODAL.successMsg}</p><button className="btn-line-dark" style={{ marginTop: 16 }} onClick={onClose}>닫기</button></div>;
  const fld = (k: string) => `field${errs[k] ? ' invalid' : ''}`;
  return (
    <div>
      {axis && <div className="ctx">문의 대상: {axis}</div>}
      <div className={fld('name')}><label>담당자명 <span className="req">*</span></label><input aria-label="담당자명" placeholder="홍길동" value={v.name} onChange={upd('name')} /><span className="err">담당자명을 입력해 주세요.</span></div>
      <div className={fld('org')}><label>회사/기관 <span className="req">*</span></label><input aria-label="회사/기관" placeholder="회사명" value={v.org} onChange={upd('org')} /><span className="err">회사/기관을 입력해 주세요.</span></div>
      <div className={fld('mail')}><label>이메일 <span className="req">*</span></label><input aria-label="이메일" type="email" placeholder="name@company.com" value={v.mail} onChange={upd('mail')} /><span className="err">올바른 이메일을 입력해 주세요.</span></div>
      <div className="field"><label>필요한 콘텐츠·과제</label><textarea aria-label="필요한 콘텐츠·과제" rows={3} placeholder="예: 전 직원 법정의무 + 실무자 생성형 AI + 기업 맞춤 제작" value={v.msg} onChange={upd('msg')} /></div>
      <button className="btn btn-ink" style={{ width: '100%', marginTop: 18 }} onClick={submit}>문의 보내기</button>
    </div>
  );
}

function DownloadBody() {
  const [v, setV] = useState({ name: '', org: '', mail: '' });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const upd = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  function submit() {
    const next: Record<string, boolean> = {};
    let ok = true;
    (['name', 'org'] as const).forEach((k) => { const bad = !(v[k] || '').trim(); next[k] = bad; if (bad) ok = false; });
    const eok = EMAIL_RE.test((v.mail || '').trim());
    next.mail = !eok; if (!eok) ok = false;
    setErrs(next);
    if (!ok) return;
    setDone(true);
    triggerDL(); // 실제 xlsx 다운로드
  }
  if (done) return (
    <div className="okmsg">
      <div className="ic">✓</div>
      <h3>{DOWNLOAD_MODAL.okTitle}</h3>
      <p className="lead" style={{ margin: '0 auto 14px' }}>{DOWNLOAD_MODAL.okMsg}</p>
      <a className="btn btn-ink" href={DOWNLOAD.fileHref} download style={{ display: 'inline-flex' }}>{DOWNLOAD_MODAL.okBtn}</a>
    </div>
  );
  const fld = (k: string) => `field${errs[k] ? ' invalid' : ''}`;
  return (
    <div>
      <div className="ctx">{DOWNLOAD_MODAL.ctxNote}</div>
      <div className={fld('name')}><label>담당자명 <span className="req">*</span></label><input aria-label="담당자명" placeholder="홍길동" value={v.name} onChange={upd('name')} /><span className="err">담당자명을 입력해 주세요.</span></div>
      <div className={fld('org')}><label>회사/기관 <span className="req">*</span></label><input aria-label="회사/기관" placeholder="회사명" value={v.org} onChange={upd('org')} /><span className="err">회사/기관을 입력해 주세요.</span></div>
      <div className={fld('mail')}><label>이메일 <span className="req">*</span></label><input aria-label="이메일" type="email" placeholder="name@company.com" value={v.mail} onChange={upd('mail')} /><span className="err">올바른 이메일을 입력해 주세요.</span></div>
      <button className="btn btn-ink" style={{ width: '100%', marginTop: 18 }} onClick={submit}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 20h16" /></svg> {DOWNLOAD_MODAL.submit}
      </button>
    </div>
  );
}

export default function ContentModalProvider({ children }: { children: React.ReactNode }) {
  const [exp, setExp] = useState(false);
  const [consult, setConsult] = useState<{ open: boolean; axis?: string }>({ open: false });
  const [dl, setDl] = useState(false);
  // 상담 모달을 열 때 탐색기는 닫아 중첩 포커스 트랩 방지 (course detail → 도입 문의)
  const openConsult = (axis?: string) => { setExp(false); setConsult({ open: true, axis }); };

  return (
    <ModalCtx.Provider value={{ openExplorer: () => setExp(true), openConsult, openDownload: () => setDl(true) }}>
      {children}
      <Explorer open={exp} onClose={() => setExp(false)} openConsult={openConsult} />
      <Modal open={consult.open} onClose={() => setConsult({ open: false })} labelledBy="c-title" title={<span className="exp-head"><span className="cat">{CONSULT_MODAL.cat}</span><span>{CONSULT_MODAL.title}</span><span className="mb">{CONSULT_MODAL.mb}</span></span>} maxWidth={480}>
        <ConsultBody axis={consult.axis} onClose={() => setConsult({ open: false })} />
      </Modal>
      <Modal open={dl} onClose={() => setDl(false)} labelledBy="d-title" title={<span className="exp-head"><span className="cat">{DOWNLOAD_MODAL.cat}</span><span>{DOWNLOAD_MODAL.title}</span><span className="mb">{DOWNLOAD_MODAL.mb1} · {DOWNLOAD_MODAL.mb2}</span></span>} maxWidth={480}>
        <DownloadBody />
      </Modal>
    </ModalCtx.Provider>
  );
}
