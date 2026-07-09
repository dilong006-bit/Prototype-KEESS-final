'use client';

import { createContext, useContext, useState } from 'react';
import { scrollToId } from '@/lib/utils';
import Modal from '@/components/common/Modal';
import { MODAL } from '@/data/hrd';

const Ctx = createContext<{ openInq: () => void }>({ openInq: () => {} });
export const useHdModal = () => useContext(Ctx);


export default function HdModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openInq: () => setOpen(true) }}>
      {children}
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="hd-modal-title" title={MODAL.title} maxWidth={460}>
        <p className="sec-sub" style={{ marginTop: 0 }}>{MODAL.body}</p>
        <button className="btn btn-ink" type="button" style={{ marginTop: 20 }} onClick={() => { setOpen(false); setTimeout(() => scrollToId('inq'), 60); }}>
          {MODAL.cta}
        </button>
      </Modal>
    </Ctx.Provider>
  );
}
