// 공통 유틸 (중복 제거) — 기능 동일, DRY.

/** 이메일 형식 검증 정규식 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 전화 자동 하이픈 (정본: 부정훈련 신고 > 신고 접수 '전화번호' 필드 v26 fmtPhone).
 * 숫자만 남기고 최대 11자리로 자른 뒤 하이픈을 넣는다. 11자리 3-4-4 / 10자리 3-3-4.
 * ※ 사이트 전역 단일 기준 — 신고 폼과 상담 폼이 이 함수를 공유한다. 사본을 만들지 말 것.
 */
export function fmtPhone(v: string): string {
  const d = (v || '').replace(/\D/g, '').slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return d.slice(0, 3) + '-' + d.slice(3);
  if (d.length < 11) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
  return d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7);
}

/** 전화 입력에 숫자·하이픈 외 문자가 섞였는지 (힌트 노출용 · 정본과 동일 기준) */
export const hasNonPhoneChar = (raw: string): boolean => /[^0-9-]/.test(raw);

/** 상담 신청 폼 필드별 최대 길이 (기술명세서 §A) */
export const INQ_MAX = {
  company: 100,
  name: 50,
  position: 50,
  emailLocal: 64,
  emailDomain: 100,
  companySize: 20,
  trainees: 20,
  message: 1000,
  phone: 13, // 하이픈 포함 표기 기준 (숫자 11자리)
} as const;

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
