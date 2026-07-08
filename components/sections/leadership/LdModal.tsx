'use client';

import { createContext, useContext, useState } from 'react';
import Modal from '@/components/common/Modal';
import { MODAL } from '@/data/leadership';

const Ctx = createContext<{ openInq: () => void }>({ openInq: () => {} });
export const useLdModal = () => useContext(Ctx);

function scrollToInq() {
  const el = document.getElementById('inq');
  if (el) {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
  }
}

export default function LdModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openInq: () => setOpen(true) }}>
      {children}
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="ld-modal-title" title={MODAL.title} maxWidth={460}>
        <p className="sec-sub" style={{ marginTop: 0 }}>{MODAL.body}</p>
        <button
          className="btn btn-ink"
          type="button"
          style={{ marginTop: 20 }}
          onClick={() => { setOpen(false); setTimeout(scrollToInq, 60); }}
        >
          {MODAL.cta}
        </button>
      </Modal>
    </Ctx.Provider>
  );
}
