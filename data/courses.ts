// P4 '대표 과정 조회' — 3필러(ax/job/biz) × 6 = 18 대표과정 (featured)
// 정본: KEESS_대표과정조회_지식베이스_v1.0 §4. 가격/교육비 필드 없음(Design.md §9).
// 필러색은 포인트 전용(탭·배지·썸네일·상세헤더), 카드 1개엔 소속 필러 1색만.

export type Pillar = 'ax' | 'job' | 'biz';

export interface Course {
  id: string;
  pillar: Pillar;
  pillar_label: string;
  featured: boolean;
  rank: number;
  title: string;
  sme: string | null;
  sme_affil: string | null;
  target: string;
  level: '입문' | '실무' | '심화';
  duration: string;
  hours: number | null;
  curriculum_count: number;
  refund: '환급' | '비환급' | '예정' | '미정';
  refund_note: string | null;
  category_path: string | null;
  book_provided: boolean;
  tools: string[];
  keywords: string[];
  overview: string;
  objectives: string[];
  curriculum: string[];
  linked_courses: string[];
  thumbnail: string | null;
  detail_pdf: string;
}

export const PILLARS: { key: string; label: string; accent: string | null; grad?: string }[] = [
  { key: 'all', label: '전체', accent: null },
  { key: 'ax', label: 'AX·AI 전환', accent: 'var(--p1)', grad: 'linear-gradient(135deg,color-mix(in srgb,#000 12%,var(--p1)),color-mix(in srgb,#000 42%,var(--p1)))' },
  { key: 'job', label: '직무특화', accent: 'var(--p3)', grad: 'linear-gradient(135deg,color-mix(in srgb,#000 10%,var(--p3)),color-mix(in srgb,#000 40%,var(--p3)))' },
  { key: 'biz', label: '비즈니스 스킬', accent: 'var(--p4)', grad: 'linear-gradient(135deg,color-mix(in srgb,#000 6%,var(--p4)),color-mix(in srgb,#000 36%,var(--p4)))' },
];

export const PILLAR_ACCENT: Record<Pillar, string> = { ax: 'var(--p1)', job: 'var(--p3)', biz: 'var(--p4)' };
export const LEVEL_ORDER: Record<string, number> = { 입문: 0, 실무: 1, 심화: 2 };

export function pillarGrad(k: string): string {
  return PILLARS.find((p) => p.key === k)?.grad || 'var(--surface)';
}

// duration 규칙: hours 있으면 "4주(N시간)", 없으면 "총 N차시"
const dur = (hours: number | null, cc: number) => (hours ? `4주(${hours}시간)` : `총 ${cc}차시`);

export const COURSES: Course[] = [
  // ── AX·AI 전환 (ax) ──────────────────────────────────────────────
  {
    id: 'ax1', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 1,
    title: '[리더의 AI 워크북] 배치하라 — 팀 최적화 6단계 프롬프팅',
    sme: '이서한', sme_affil: '성신여대 겸임교수 · 전 삼성주도 강의교수', target: '리더·임원', level: '실무',
    duration: dur(6, 6), hours: 6, curriculum_count: 6, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 리더십', book_provided: false, tools: ['ChatGPT'],
    keywords: ['팀최적화', '인력배치', '프롬프팅', '템플릿', '리더'],
    overview: '프롬프트 하나로 팀을 전략적으로 재배치합니다. "이 사람한테 맡겨도 될까?"의 부담을 없애고, 팀원 역량 진단 → 업무·사람 매칭 → 실행 가능한 이동 체계를 완성합니다.',
    objectives: ['AI 프롬프팅으로 팀 역량을 진단하고 최적 배치 기준을 설계할 수 있다.', 'AI 템플릿으로 팀 구조·이동 방안을 체계화할 수 있다.', '코칭·피드백 루프를 설계해 팀 성장 시나리오를 수립할 수 있다.'],
    curriculum: ['팀 최적화를 위한 배치 로드맵 그리기', '팀 역량을 진단해 활용 가능 영역 정의하기', '업무-사람 매칭 로직 설계하기', '팀의 구조와 팀 이동 방안 설계하기', '1:1 코칭·피드백 루프 인선하기', '역량 향상 실행 시나리오 만들기'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_[리더의 AI 워크북] 배치하라.pdf',
  },
  {
    id: 'ax2', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 2,
    title: '[구글 사이드 AI] 사내 로그 업무 확장, AI 자동화로 시스템 구축하기',
    sme: '이광호', sme_affil: '인사이드아웃 추정 10년차 OA 전문가', target: '실무자', level: '실무',
    duration: dur(7, 7), hours: 7, curriculum_count: 7, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 업무 자동화', book_provided: false, tools: ['Gemini', 'NotebookLM', 'Colab', 'Apps Script'],
    keywords: ['구글', '자동화', '스마트워크', 'NotebookLM'],
    overview: '구글 생태계를 하나로 연결하는 통합 스마트워크. Gemini 실무 활용·자동화부터 NotebookLM 출처 기반 분석까지, 검색·문서·데이터·발표·설문·챗봇을 실제 업무 장면에 바로 적용합니다.',
    objectives: ['구글 생태계와 AI 기반 스마트워크 흐름을 이해한다.', 'Gemini·문서도구로 검색·문서·데이터·발표·설문을 수행한다.', 'NotebookLM·Colab·Apps Script로 반복 업무를 자동화한다.'],
    curriculum: ['어디서나 작성 가능한 온라인 문서도구', '데이터 분석·시각화 스프레드시트', '가장 쉬운 발표도구 Slides', '구글 AI 이미지 생성', '정보를 수집·분석하는 온라인 설문', '구글 생성형 AI NotebookLM 활용(1)', '구글 생성형 AI NotebookLM 활용(2)'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_[구글 사이드 AI] AI 자동화 시스템 구축.pdf',
  },
  {
    id: 'ax3', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 3,
    title: '[AI Class] 일잘러 장피엠과 ChatGPT 업무 300% 활용하기',
    sme: '장피엠', sme_affil: '생성형 AI·노코드 실무 전 대표작가·직강', target: '실무자', level: '실무',
    duration: dur(16, 15), hours: 16, curriculum_count: 15, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 업무 생산성', book_provided: false, tools: ['ChatGPT', 'GPTs'],
    keywords: ['업무활용', '생산성', '자동화', 'GPTs'],
    overview: 'AI 검색·조사·분석부터 회사 양식에 맞춘 결과물 작성까지, ChatGPT로 업무 프로세스를 자동화·고도화합니다. 강의 청취에 그치지 않고 내 업무에 바로 적용합니다.',
    objectives: ['구조화된 프롬프트를 작성할 수 있다.', '전문적·완성도 높은 업무 문서를 작성할 수 있다.', '업무 자동화·고도화로 효율을 극대화한다.'],
    curriculum: ['AI 성능 극대화를 위한 프롬프트 구조화', '참고 자료로 답변 신뢰도 높이기', '단계적 프롬프팅', 'Deep Research로 최신 정보 반영', '데이터 분석 인사이트 도출', '회사 양식 문서·보고서 작성', '데이터 시각화·발표자료 제작', 'AI Agent와 GPTs 이해', 'GPTs로 데이터 수집·정리 자동화', 'GPTs로 보고서 작성 자동화', 'Chain of Thought로 답변 품질 높이기', '지식 기반 GPTs 활용', 'GPTs를 AI Agent로 확장', '외부 AI툴 연계 자동화', '다양한 업무 자동화 실습'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_[AI Class] 일잘러 장피엠과 ChatGPT 업무 300% 활용.pdf',
  },
  {
    id: 'ax4', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 4,
    title: '[AI Class] 노코드 RAG 끝판왕, 노트북LM으로 지식관리 마스터하기',
    sme: null, sme_affil: null, target: '실무자', level: '실무',
    duration: dur(7, 7), hours: 7, curriculum_count: 7, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 지식관리', book_provided: false, tools: ['NotebookLM'],
    keywords: ['지식관리', 'RAG', '노코드', 'NotebookLM'],
    overview: 'LLM의 최신성·정확성·신뢰성 한계를 RAG(검색-증강-생성)로 극복합니다. 문서·영상·웹 자료를 통합 분석해 출처 기반의 신뢰도 높은 지식관리·생성을 노코드로 수행합니다.',
    objectives: ['노코드 RAG·NotebookLM 핵심 기능을 이해·활용한다.', '다양한 자료를 통합 분석해 신뢰성 있는 지식관리를 수행한다.', '보고서·콘텐츠 등 실무 결과물을 AI로 생산한다.'],
    curriculum: ['노코드 RAG 이해와 NotebookLM 시작하기', '핵심 기능 완전 정복', '보고·기획 업무 생산성 높이기', '프로젝트·교육 자료 관리', '마케팅 전략·리서치 실무', '보고서·콘텐츠 글쓰기', '실무 최적화 활용 팁'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_[AI Class] 노코드 RAG 노트북LM 지식관리.pdf',
  },
  {
    id: 'ax5', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 5,
    title: '미드저니와 캡컷으로 완성하는 시네마틱 AI 영상 제작 바이블',
    sme: null, sme_affil: null, target: '실무자', level: '실무',
    duration: dur(4, 4), hours: 4, curriculum_count: 4, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 콘텐츠 제작', book_provided: false, tools: ['Midjourney', 'CapCut'],
    keywords: ['AI영상', '시네마틱', '스타일코드', '영상제작'],
    overview: '미드저니와 캡컷 결합으로 영상 제작의 진입장벽을 허물고 시네마틱 결과물을 완성합니다. 기술 한계 없이 감각만으로 몰입감 있는 브이로그·스토리텔링 영상을 만듭니다.',
    objectives: ['미드저니 영상 연출 프롬프트를 익힌다.', '이미지→모션 영상으로 자연스럽게 발전시킨다.', '스타일 코드로 일관된 브랜드 영상 스타일을 구축한다.'],
    curriculum: ['미드저니 인터페이스·동영상 기능 핵심', '영상 생성 응용·영상 편집', '평범한 이미지를 특별한 영상으로: 스타일 코드', '스타일 프롬프트와 영상별 제작 사례'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_미드저니 캡컷 시네마틱 AI 영상 제작.pdf',
  },
  {
    id: 'ax6', pillar: 'ax', pillar_label: 'AX·AI 전환', featured: true, rank: 6,
    title: '선을 넘는 AI, 선을 긋는 인간',
    sme: '정성린', sme_affil: '아워어시스트 대표 · 기획재정부 직급 경영교육 강사', target: '전사 공통', level: '입문',
    duration: dur(16, 15), hours: 16, curriculum_count: 15, refund: '미정', refund_note: null,
    category_path: 'AX·AI 전환 > 인문·전략', book_provided: false, tools: [],
    keywords: ['AI리터러시', 'AI윤리', '인간중심', '공존'],
    overview: '막연한 공포도 지나친 낙관도 아닌, 철학·경제·기술 관점의 AI-인류 공존론. 일상·비즈니스·교육·예술에 미칠 영향과 윤리적 딜레마를 5개 모듈로 심층 논합니다.',
    objectives: ['AI가 각 분야에 미칠 영향을 설명한다.', 'AI와의 공존 방법을 설명한다.', 'AI 이슈를 철학·경제·기술 관점에서 고찰한다.'],
    curriculum: ['[M1 선 넘는 AI] 지식재산권·딥페이크·초상권·저작권', '[M2 AI의 노드] 법률·금융·의료·보험·부동산·미디어·교육', '[M3 고객·학습자 경험] 인간적 상호작용·심리학·언어NLP', '[M4 지속가능성·미래] ESG·리더십·미래교육·인문학적 접근', '[M5 윤리·법] 프라이버시·책임·지식윤리·교육의 역할'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_AXAI전환_선을 넘는 AI, 선을 긋는 인간.pdf',
  },
  // ── 직무특화 (job) ───────────────────────────────────────────────
  {
    id: 'job1', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 1,
    title: '[회계 X AI] 기업 실제 사례로 배우는 AI 회계 분석',
    sme: '박진우', sme_affil: '공인회계사·세무사 / 롯데·포스코그룹·삼일아카데미 강의', target: '실무자', level: '실무',
    duration: dur(null, 8), hours: null, curriculum_count: 8, refund: '예정', refund_note: '5차 심사예정',
    category_path: '산업직무 > IT > IT비즈니스전략', book_provided: false, tools: ['AI 실습'],
    keywords: ['회계기초', '재무제표', '회계분석', 'AI실습'],
    overview: '회계 기초부터 경영 전략까지 현업 즉시 적용 지식을 체계로 익힙니다. 실제 기업 사례와 AI 실습으로 재무 데이터 분석·경영 의사결정에 활용합니다.',
    objectives: ['기업 재무상태·경영성과를 실질 분석·판단한다.', 'AI 활용 사례로 데이터를 해석한다.', '의사결정에 재무 데이터를 활용한다.'],
    curriculum: ['재무제표가 말해주는 기업 이야기', '자산·부채·자본 다시보기', '손익계산서 분석', '현금흐름표 분석', '재무비율 분석', '실제 기업 재무제표 분석', '재무분석 통한 부실기업 예측'],
    linked_courses: ['회계 이보 직장인의 회계 첫 걸음'], thumbnail: null, detail_pdf: '대표과정_직무특화_[회계 X AI] AI 회계 분석.pdf',
  },
  {
    id: 'job2', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 2,
    title: '1% 전문가가 아닌 99% 모두를 위한 데이터 리터러시',
    sme: '강양숙', sme_affil: '데이터리터러시랩 대표 · 전 데노트 컨설팅', target: '전사 공통', level: '실무',
    duration: dur(null, 12), hours: null, curriculum_count: 12, refund: '미정', refund_note: null,
    category_path: '산업직무 > IT > IT비즈니스전략', book_provided: false, tools: [],
    keywords: ['데이터리터러시', '통계', '설득', '사고력'],
    overview: '전문가가 아닌 모두를 위한 데이터 리터러시. 데이터를 대하는 태도·습관부터 소통·분석 역량까지, 판단과 설득의 무기로 데이터를 다룹니다.',
    objectives: ['데이터 리터러시 개념을 이해한다.', '데이터 인지·판단·소통 역량을 기른다.', '확보한 데이터를 정확히 이해·활용한다.'],
    curriculum: ['데이터가 바꿔가는 근본 변화', '왜 데이터 리터러시인가', '데이터의 인지력', '판단력', '소통력·동기부여', '데이터 리터러시(1) 데이터로 결론 내기', '리터러시(2) 비판력', '리터러시(3) 사고력', '리터러시(4) 맥락', '리터러시(5) 질문·의도', '리터러시(6) 쉽게 그리기', '리터러시(7) 종합'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_직무특화_99% 모두를 위한 데이터 리터러시.pdf',
  },
  {
    id: 'job3', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 3,
    title: 'AI+HUMAN 공존을 이끄는 소프트스킬',
    sme: '김지훈', sme_affil: '한국스킬문화연구소 소장·Concordia University 겸임교수 / 전 산업인력공단 국가직무능력표준위원장', target: '실무자', level: '실무',
    duration: dur(null, 10), hours: null, curriculum_count: 10, refund: '환급', refund_note: '8월 비환급/11월 환급',
    category_path: '경영일반 > 경영직무 > 경영전략', book_provided: false, tools: [],
    keywords: ['소프트스킬', '자기인식', '감성지능', '협업'],
    overview: 'AI 시대 개인·조직의 지속 성장에 필수인 소프트스킬을 체계화합니다. 성장 로드맵을 수립·실천해 대체 불가능한 핵심 인재로 나아갑니다.',
    objectives: ['자기 인식·감정 지능으로 긍정적 지속 성장한다.', '건설적 피드백 기술로 개인·팀을 성장시킨다.', '갈등 해결·협업으로 팀 에너지를 극대화한다.'],
    curriculum: ['소프트 스킬의 시대', '자기 인식의 힘', '감성 지능(EQ)', '똑똑하게 소통하는 기술', '피드백 주고받기', '갈등 해결', '협업과 팀워크', '문제 해결력·비판적 사고', '리더를 위한 소프트 스킬', '나의 소프트 스킬 성장 로드맵'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_직무특화_AI+HUMAN 소프트스킬.pdf',
  },
  {
    id: 'job4', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 4,
    title: 'IB 비즈니스의 디지털 포메이션, STO',
    sme: '박인성·김소원', sme_affil: 'SK증권 미래전략부문 디지털사업팀 과장 / 전 EY·Ernst&Young 컨설팅', target: '실무자', level: '실무',
    duration: dur(null, 6), hours: null, curriculum_count: 6, refund: '미정', refund_note: null,
    category_path: '경영일반 > 디지털 > 요약시스템', book_provided: false, tools: [],
    keywords: ['STO', '토큰증권', '블록체인', '조각투자'],
    overview: '블록체인 기반 토큰증권(STO) 비즈니스 모델·발행/유통·글로벌 동향·전망. 조각투자 사례 중심으로 실습합니다.',
    objectives: ['블록체인 활용 토큰 비즈니스 모델을 학습한다.', '토큰증권 이론·전망을 학습한다.', '조각투자 사례·투자 방법을 실습한다.'],
    curriculum: ['토큰증권(STO)이란', '발행 및 유통', '분야별 적용사례', '실습으로 배우는 토큰증권', '글로벌 동향', '비즈니스 전망'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_직무특화_IB 비즈니스의 디지털 포메이션 STO.pdf',
  },
  {
    id: 'job5', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 5,
    title: '휴머니타드 간호 실무 — 환자 중심의 간호 이해와 실무',
    sme: '김장운', sme_affil: '감정릭 응급보호사교육원 강사 / 유튜브 도인의 응급TV', target: '의료 종사자', level: '실무',
    duration: dur(null, 30), hours: null, curriculum_count: 30, refund: '환급', refund_note: null,
    category_path: '의료제약 > 의료일반', book_provided: false, tools: [],
    keywords: ['간호', '간호실무', '휴머니타드', '환자중심'],
    overview: '인간 존중 기반 환자 중심 케어 "휴머니타드". 감염·통증·욕창·활력징후 등 간호 실무 스킬부터 환자 소통·상담까지 다룹니다.',
    objectives: ['간호 원칙·절차 이해, 상황별 간호 사정.', '감염·활력징후 등 간호 실무 기술 습득·적용.', '통증·욕창·투약 관리로 안전·삶의 질 향상.', '소통·상담으로 환자 만족·서비스 질 개선.'],
    curriculum: ['휴머니타드 이해', '4가지 기능', '마음을 사로잡는 5단계', '간호 과정 이해', '활력징후', '(실무 가이드) 산소요법·수분·기관절개 등', '치매 환자 간호 가이드', '욕창 관리', '통증 관리', '응급 대처(하임리히·CPR·AED)', '친절 커뮤니케이션', '장애 유형별 의사소통', '불만 환자 응대 전략'],
    linked_courses: ['[사기로운 의료생활] 환자경험중심 병원직무교육'], thumbnail: null, detail_pdf: '대표과정_직무특화_휴머니타드 간호 실무.pdf',
  },
  {
    id: 'job6', pillar: 'job', pillar_label: '직무특화', featured: true, rank: 6,
    title: '흑백해커 — 이븐하게 배우는 디지털 보안 상식',
    sme: '이재승', sme_affil: '연세대 법학 박사·서울시립대 정보보호학과 / 한국인터넷진흥원장 등', target: '전사 공통', level: '입문',
    duration: dur(null, 8), hours: null, curriculum_count: 8, refund: '환급', refund_note: null,
    category_path: '산업직무 > IT > IT비즈니스전략', book_provided: false, tools: [],
    keywords: ['보안', '해킹', '피싱', '스미싱', '랜섬웨어'],
    overview: '재택·출장·화상회의 증가로 커진 사이버 위협. 보안사고 사례로 위협을 인지하고 실천할 보안 역량을 강화합니다.',
    objectives: ['해킹·피싱·스미싱·딥페이크 등 공격 유형·원리 이해·대응.', '직장 내 정보보호 수칙으로 보안 습관 형성.'],
    curriculum: ['해킹이란', '일상에서 발생하는 피싱', '문자에 숨겨진 위협 스미싱', '공용 네트워크 안전 사용', '스마트기기 보안', '악성코드', '직장에서 꼭 알아야 하는 랜섬웨어 예방법'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_직무특화_흑백해커 디지털 보안 상식.pdf',
  },
  // ── 비즈니스 스킬 (biz) ──────────────────────────────────────────
  {
    id: 'biz1', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 1,
    title: '[웹툰X대학일기] 일상이 달라지는 끄적임, 메모의 기술',
    sme: '김진', sme_affil: '기적팩토리 대표 · 한국생산성콘텐츠협회장 / 저서 「오늘, 너무 좋은 시간」 등', target: '전사 공통', level: '입문',
    duration: dur(null, 10), hours: null, curriculum_count: 10, refund: '예정', refund_note: '3차 심사예정',
    category_path: '비즈니스 스킬 > 문서/보고', book_provided: true, tools: [],
    keywords: ['메모', '업무성과', '문서', '기록'],
    overview: '사소한 메모 하나로 업무 성과가 달라집니다. 인기 웹툰 「대학일기」 콜라보로 재미있게, 실제 시간을 줄이는 메모 노하우를 제안합니다.',
    objectives: ['메모 종류·활용법을 익혀 잠재성을 활용한다.', '메모 노하우로 일상·업무를 체계화한다.'],
    curriculum: ['메모의 잠재성', '메모보다 중요한 건 활용', '다양한 종류', '인식을 변화시킨다', '업무 효율 높이기', '일상 체계화', '대상·기록', '글쓰기 활용', '습관화', '명세서로 정리하는 메모의 힘'],
    linked_courses: ['오피스 문해력', '일 잘하는 직장인 워크릿 노하우', '비즈니스 글쓰기'], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_[웹툰X대학일기] 메모의 기술.pdf',
  },
  {
    id: 'biz2', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 2,
    title: '성과를 만드는 루틴X러닝 — 자기관리와 성장의 기술',
    sme: null, sme_affil: null, target: '전사 공통', level: '실무',
    duration: dur(null, 8), hours: null, curriculum_count: 8, refund: '비환급', refund_note: null,
    category_path: '비즈니스 스킬 > 자기관리', book_provided: false, tools: [],
    keywords: ['자기관리', '루틴', '상황리더십', '성장'],
    overview: '자기관리 이론과 러닝(달리기) 실습을 융합. 루틴 형성부터 신체·정신 건강까지 일관된 자기관리 프레임워크와 AI 시대 인재 준비법을 다룹니다.',
    objectives: ['성과로 이어지는 일습관·루틴을 만든다.', '시간 지배·자기주도력을 기른다.', '3C(협업·소통·창조력) 성장, 상황 리더십.'],
    curriculum: ['성과로 이어지는 일습관·루틴', '시간 지배·자기주도력', '조직 내 지속 성장(3C)', '상사 관리·피드백 200%로 성장 루트', '회의 성장 리더십', '스마트 팀장 성과관리', 'AI 시대 인재 준비법', 'AI 시대 상황 리더십'],
    linked_courses: ['스탠퍼드 심리학', 'NEXT 자기 전략', 'DEI 조직문화', '메모의 기술'], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_루틴X러닝 자기관리.pdf',
  },
  {
    id: 'biz3', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 3,
    title: '김경일 교수의 지혜로운 직장생활 — 관계가 어려워도 괜찮아',
    sme: '김경일', sme_affil: '아주대 심리학과 교수·전 게임문화재단 이사장 / 저서 「김경일의 지혜로운 인간생활」', target: '전사 공통', level: '입문',
    duration: dur(null, 9), hours: null, curriculum_count: 9, refund: '미정', refund_note: null,
    category_path: '경영일반 > 비즈니스스킬 > 커뮤니케이션', book_provided: false, tools: [],
    keywords: ['커뮤니케이션', '심리학', '관계', '번아웃'],
    overview: '사람 유형별 커뮤니케이션, 관계로 어려운 상황 해결, 긍정 에너지·번아웃 극복까지 심리학 기반 지혜로운 직장생활을 짚습니다.',
    objectives: ['사람 유형별 커뮤니케이션 방법을 익힌다.', '관계 문제 해결법을 익힌다.', '긍정 에너지를 높이고 번아웃을 극복한다.'],
    curriculum: ['나를 사랑하게 하는 사람들', '뒷말의 시간 듣고', '직장이몽: 서로 다른 우리', "관심법: 나를 무시하는 사람 알아보기", "'너'에게로의 이동", '내성적이어도 괜찮다', "'꼰대'가 되고 싶지 않다면", '체력이 실무다', "'꾸역꾸역'의 심리학"],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_김경일 지혜로운 직장생활.pdf',
  },
  {
    id: 'biz4', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 4,
    title: '덕후피드 즘 이독스의 의학으로 보는 세계사',
    sme: '이독스', sme_affil: '이비인후과 의사·치과의사 겸 방송인 / 저서 「덕후피드 즘! 마이가 세계사」', target: '전사 공통', level: '입문',
    duration: dur(null, 10), hours: null, curriculum_count: 10, refund: '비환급', refund_note: null,
    category_path: '비즈니스 스킬 > 인문교양', book_provided: false, tools: [],
    keywords: ['세계사', '의학', '인문학', '교양'],
    overview: '마취·백신 등 의료기술 발전을 스토리텔링으로. 세계사 속 의학 발전을 흥미롭게 짚으며 인문학적 상식·소양의 폭을 넓힙니다.',
    objectives: ['의학 발전과 역사 흐름을 학습한다.', '역사 속 질병·의학 발전으로 접근한다.'],
    curriculum: ['마취', '항생제', '백신', '수술', '혈액형', '해부학', '전염병', '정신의학', '유전학', '미래의학'],
    linked_courses: ['세상에서 가장 짧은 한국사', '조승연의 비즈니스를 위한 세계사'], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_이독스 의학으로 보는 세계사.pdf',
  },
  {
    id: 'biz5', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 5,
    title: '직장인 필이기 — 문서의 신 백승권이 알려주는 오피스 문해력',
    sme: '백승권', sme_affil: 'CCC 커뮤니케이션 컨설팅&클리닉 대표·전 청와대 홍보수석실 행정관 / 저서 「오피스 문해력」', target: '전사 공통', level: '실무',
    duration: dur(null, 8), hours: null, curriculum_count: 8, refund: '비환급', refund_note: null,
    category_path: '비즈니스 스킬 > 문서/보고', book_provided: false, tools: [],
    keywords: ['문해력', '문서', '보고서', '글쓰기'],
    overview: '업무 전반의 문서작성·텍스트 커뮤니케이션. 문해력(글을 읽고 이해)을 무기로 공문·보고서·보도자료·이메일·SNS까지 실무 글쓰기를 훈련합니다.',
    objectives: ['업무 글쓰기 스킬로 공문·보고서·보도자료를 적용한다.', '문서 작성 지식·스킬을 훈련한다.'],
    curriculum: ['업무 경쟁력과 문해력', '문해력의 본질: 핵심·논리', '스토리텔링', '논리 구조화', '단어·문장·통계', '문해력 업그레이드: 공문·보고서', '보도자료', '이메일·SMS·SNS'],
    linked_courses: ['비즈니스 글쓰기', '일 잘하는 직장인 워크릿 노하우', '조리있게 글쓰기'], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_백승권 오피스 문해력.pdf',
  },
  {
    id: 'biz6', pillar: 'biz', pillar_label: '비즈니스 스킬', featured: true, rank: 6,
    title: '한석준 아나운서의 직장에서 통하는 대화의 기술',
    sme: '한석준', sme_affil: '전 KBS 공채 아나운서 / 저서 「한석준의 대화의 기술」', target: '전사 공통', level: '입문',
    duration: dur(null, 10), hours: null, curriculum_count: 10, refund: '비환급', refund_note: null,
    category_path: '비즈니스 스킬 > 커뮤니케이션', book_provided: false, tools: [],
    keywords: ['대화', '커뮤니케이션', '말하기', '소통'],
    overview: '어디서나 호감을 주며 말하는 사람의 대화법. 말하기·대화 방식을 점검해 신뢰를 주는 소통으로 만듭니다.',
    objectives: ['상황별 대화 기술을 익힌다.', '말·글로 나은 수준을 선택한다.', '참고 대사로 심화한다.'],
    curriculum: ['당신의 말은 전달되고 있습니까', '신뢰가 주는 대화', '소통 방해 말버릇 고치기', '관계 망치는 말 vs 회복하는 말', '인정 표현', '콕콕 비수 아닌 선한 자극', '남다른 이메일 작성법', '단체 카톡방 매너', '긍정 화법', '내가 내게 하는 말이 곧 내 인상'],
    linked_courses: [], thumbnail: null, detail_pdf: '대표과정_비즈니스스킬_한석준 대화의 기술.pdf',
  },
];
