// 부정훈련 신고 — 시드 데이터 (KEESS_home_C_v26 authoritative · 1032~1044 · 클라이언트 데모)
export interface ReportRecord {
  no: string;
  name: string;
  phone: string;
  pw: string;
  email?: string;
  role?: string;
  ttype?: string;
  course?: string;
  org?: string;
  target?: string;
  title: string;
  content: string;
  status: number; // 0 접수 완료 · 1 검토 중 · 2 처리 완료 · 3 반려
  date: string;
  // 접수 시각 'HH:mm:ss'(24시간제·KST).
  // 신규 접수 건은 제출 시점의 실제 시각이 기록된다.
  // 아래 시드 2건은 확정 프로토타입 원본이 날짜까지만 보유했던 항목으로, 접수일시 표기를
  // 데모에서 확인할 수 있도록 채운 픽스처 값이다(실제 접수 시각 아님).
  // 백엔드 연동 시 서버 저장값으로 대체할 것.
  time?: string;
  answer?: string;
}

export const REPORT_SEED: ReportRecord[] = [
  {
    no: 'KR-20260701-0012',
    name: '홍길동',
    phone: '010-1234-5678',
    pw: 'test',
    email: 'hong@example.com',
    role: '훈련생',
    ttype: '국민내일배움카드',
    course: '데이터 분석 실무 과정',
    org: '○○직업교육원',
    target: '훈련내용',
    title: '훈련 미실시 의심 신고',
    content:
      '승인된 차시와 다르게 운영된 정황이 있어 신고합니다. 실제 강의가 진행되지 않은 회차가 있는 것으로 보입니다.',
    status: 1,
    date: '2026-07-01',
    time: '09:42:17', // 데모 픽스처
  },
  {
    no: 'KR-20260628-0007',
    name: '홍길동',
    phone: '010-1234-5678',
    pw: 'test2',
    email: 'hong@example.com',
    role: '훈련생',
    ttype: '사업주훈련',
    course: '리더십 향상 과정',
    org: '△△HRD센터',
    target: '훈련강사',
    title: '대리 수강 정황 신고',
    content: '타인이 대신 수강한 것으로 보이는 정황이 있어 신고합니다.',
    status: 2,
    date: '2026-06-28',
    time: '16:05:38', // 데모 픽스처
    answer: '접수 내용 확인 후 해당 기관에 대한 지도점검을 완료했습니다. 협조해 주셔서 감사합니다.',
  },
];

export const REPORT_STATUS = ['접수 완료', '검토 중', '처리 완료', '반려'];
export const REPORT_MASTER_PW = 'eduoneno1!';
