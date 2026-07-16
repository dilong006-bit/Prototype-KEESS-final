// 공통 유틸 (중복 제거) — 기능 동일, DRY.

/** 이메일 형식 검증 정규식 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** prefers-reduced-motion 여부 (SSR 안전) */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** id 요소로 스크롤 (reduced-motion 대응) */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * 도입 문의 CTA 공통 동작 — 확인 팝업 없이 문의 입력 섹션으로 즉시 이동 + 첫 입력 필드 포커스.
 * (스무스 스크롤이 끝난 뒤 포커스해야 브라우저가 위치를 되돌리지 않는다 → preventScroll)
 */
export function goToInquiry(id = 'inq'): void {
  scrollToId(id);
  const delay = prefersReducedMotion() ? 0 : 480;
  window.setTimeout(() => {
    const first = document.querySelector<HTMLElement>(`#${id} input:not([type="hidden"]):not(.hp), #${id} select, #${id} textarea`);
    first?.focus({ preventScroll: true });
  }, delay);
}
