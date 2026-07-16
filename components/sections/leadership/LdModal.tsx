'use client';

import { createContext, useContext } from 'react';
import { goToInquiry } from '@/lib/utils';

const Ctx = createContext<{ openInq: () => void }>({ openInq: () => {} });
export const useLdModal = () => useContext(Ctx);

/**
 * 도입 문의 CTA 제공자.
 * 확인 팝업(문의 폼으로 이동)을 제거하고, 클릭 즉시 문의 입력 섹션으로 이동 + 첫 필드 포커스한다.
 */
export default function LdModalProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ openInq: () => goToInquiry('inq') }}>{children}</Ctx.Provider>;
}
