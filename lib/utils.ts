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
