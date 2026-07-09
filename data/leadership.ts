// P2 리더십·조직, 카피/데이터 verbatim (keess_P2_leadership_B_framework_v1.0)
// 색·버튼변형 미이식. 오빗/레이더 스케일은 --p2 파생(color-mix)만.

export const HERO = {
  tag: 'KG에듀원 리더십·조직 체계',
  h1Lead: '리더십은 감이 아니라,',
  h1Emph: '체계입니다',
  sub: 'KG에듀원 고유의 6대 리더십 역량 체계로, 무엇을 기를지 명확히 정의하고 진단에서 조직문화 정착까지 설계합니다.',
  ctaPrimary: '도입 문의',
  ctaSecondary: '리더십 체계 보기',
  img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
  strip: ['성장단계 6단계 로드맵', '6대 리더십 역량', '온·오프라인 통합'],
  floats: [
    { fv: '6단계', fl: '성장 여정' },
    { fv: '진단→정착', fl: '5단계 체계' },
  ],
  vlabel: { t: 'Leadership Journey', s: '신입 · 주니어 · 팀장 · 중간관리자 · 임원 · 최고경영진' },
};

export const PAIN = {
  eyebrow: 'LEADERSHIP PAIN',
  title: '리더가 된 순간, 준비된 사람은 없습니다',
  lead: '직급이 오를 때마다 요구되는 리더십은 완전히 달라집니다. 단발성 교육이 아닌, 성장단계에 맞는 체계가 필요한 이유입니다.',
  // b 강조 부분은 **로 표기
  chips: [
    '"팀장이 됐는데 **관리가 처음**입니다"',
    '"교육은 받았지만 **현업에 안 남습니다**"',
    '"임원 후보를 **어떻게 길러야** 할지 모릅니다"',
    '"리더십을 **진단할 기준**이 없습니다"',
  ],
};

export const JOURNEY = {
  eyebrow: '교육체계 · 한눈에',
  title: '먼저, 리더십 체계를 한눈에 봅니다',
  lead: '신입부터 최고경영진까지 성장단계 로드맵. B안은 체계 소개를 압축하고, 아래 **6대 역량 트랙을 본체**로 제시합니다.',
  stages: [
    { jn: 'STAGE 1', js: '신입', jr: 'Entry' },
    { jn: 'STAGE 2', js: '주니어', jr: 'Junior' },
    { jn: 'STAGE 3', js: '팀장', jr: 'Team Leader' },
    { jn: 'STAGE 4', js: '중간관리자', jr: 'Middle' },
    { jn: 'STAGE 5', js: '임원', jr: 'Executive' },
    { jn: 'STAGE 6', js: '최고경영진', jr: 'C-Level' },
  ],
  archEyebrow: 'LEADERSHIP ARCHITECTURE · 방법론',
  archTitle: '진단에서 조직문화 정착까지, 5단계로 이어집니다',
  arch: [
    { an: 'STEP 1', at: '진단', ad: '리더십역량·조직문화·건강도·AI리터러시 진단' },
    { an: 'STEP 2', at: '역량개발', ad: '온라인학습·집합교육·워크숍·액션러닝·코칭' },
    { an: 'STEP 3', at: '현업적용', ad: 'AI시뮬레이션·역할기반실습·액션플랜·현업프로젝트' },
    { an: 'STEP 4', at: '조직확산', ad: '리더십커뮤니티·베스트프랙티스·사내리더육성' },
    { an: 'STEP 5', at: '조직문화정착', ad: '피드백문화·협업문화·학습문화·AI활용문화' },
  ],
};

export const TRACKS_SECTION = {
  eyebrow: '6 LEADERSHIP TRACKS · 역량 체계',
  title: 'KG에듀원 고유 6대 리더십 역량 체계',
  lead: '무엇을 기를지 정의하는 6개 트랙. 각 트랙은 세부 역량으로 구성되어 성장단계별 여정의 본체가 됩니다.',
  cards: [
    { ti: 'S', tk: 'TRACK 01', h4: 'Self', p: '스스로를 이끄는 리더의 출발점', tags: ['자기주도성', '회복탄력성', '성장마인드셋', '자기관리'] },
    { ti: 'P', tk: 'TRACK 02', h4: 'People', p: '사람을 성장시키는 리더', tags: ['코칭', '피드백', '동기부여', '갈등관리', '세대이해'] },
    { ti: 'Pf', tk: 'TRACK 03', h4: 'Performance', p: '성과를 만드는 리더', tags: ['목표관리', '성과관리', '의사결정', '실행력', '문제해결'] },
    { ti: 'C', tk: 'TRACK 04', h4: 'Change', p: '변화를 이끄는 리더', tags: ['변화관리', '혁신', '애자일', '디지털전환', '조직개선'] },
    { ti: 'H', tk: 'TRACK 05', h4: 'Hyper', p: '연결하는 리더', tags: ['협업', '영향력', '네트워크', '크로스펑셔널', '이해관계자관리'] },
    { ti: 'Cu', tk: 'TRACK 06', h4: 'Culture', p: '문화를 세우는 리더', tags: ['심리적안전감', '조직문화', '다양성', '포용성', '학습문화'] },
  ],
};

export const FRAMEWORK = {
  eyebrow: 'LEADERSHIP FRAMEWORK · 6대 역량',
  title: '하나의 리더십 코어, 6개 역량 궤도',
  lead: '리더십을 중심으로 6개 역량이 궤도를 이룹니다. 노드를 클릭해 세부 역량을 확인하세요.',
  hint: '노드를 클릭하세요',
  name: '6대 리더십 역량 체계',
  desc: '리더십 코어를 중심으로 6개 역량이 궤도를 이룹니다. 중심-구성 관계로 체계를 표현합니다.',
};

// 오빗 노드 (TRACKS), 노드 색상은 --p2 파생 mix(라이트→다크)로 정의
export interface Track { k: string; t: string; d: string; a: string[]; ko: string; nm: string; mix: number }
export const TRACKS: Track[] = [
  { k: 'TRACK 01', t: 'Self Leadership', d: '스스로를 이끄는 리더의 출발점, 자기 이해와 회복탄력성을 바탕으로 지속 성장하는 역량.', a: ['자기주도성', '회복탄력성', '성장마인드셋', '자기관리'], ko: '셀프 리더십', nm: 'Self', mix: 100 },
  { k: 'TRACK 02', t: 'People Leadership', d: '사람을 성장시키는 리더, 코칭과 피드백으로 구성원의 잠재력을 끌어냅니다.', a: ['코칭', '피드백', '동기부여', '갈등관리', '세대이해'], ko: '피플 리더십', nm: 'People', mix: 88 },
  { k: 'TRACK 03', t: 'Performance Leadership', d: '성과를 만드는 리더, 목표에서 실행까지 조직의 결과를 책임집니다.', a: ['목표관리', '성과관리', '의사결정', '실행력', '문제해결'], ko: '성과 리더십', nm: 'Perf.', mix: 78 },
  { k: 'TRACK 04', t: 'Change Leadership', d: '변화를 이끄는 리더, 혁신과 디지털 전환으로 조직을 진화시킵니다.', a: ['변화관리', '혁신', '애자일', '디지털전환', '조직개선'], ko: '변화 리더십', nm: 'Change', mix: 62 },
  { k: 'TRACK 05', t: 'Hyper Leadership', d: '연결하는 리더, 협업과 영향력으로 경계를 넘는 성과를 만듭니다.', a: ['협업', '영향력', '네트워크', '크로스펑셔널', '이해관계자관리'], ko: '하이퍼 리더십', nm: 'Hyper', mix: 50 },
  { k: 'TRACK 06', t: 'Culture Leadership', d: '문화를 세우는 리더, 심리적 안전감과 학습문화로 지속가능한 조직을 만듭니다.', a: ['심리적안전감', '조직문화', '다양성', '포용성', '학습문화'], ko: '컬처 리더십', nm: 'Culture', mix: 38 },
];

export const OFFLINE = {
  eyebrow: 'LEADERSHIP TRACK · 성장 시점 선택',
  title: '성장 시점을 선택하면, 맞는 트랙이 열립니다',
  badge: '오프라인',
  lead: '입사·승진·팀장·임원, 역할이 바뀌는 시점을 고르면 해당 트랙이 열립니다. **온라인 여정으로 이어가거나, 오프라인 집합교육으로 진행**할 수 있습니다.',
};

export interface Prog { ph: string; key: string; nm: string; en: string; sub: { t: string; d: string; caps: string[] }[] }
export const PROG: Prog[] = [
  { ph: 'STAGE 1', key: '입사·정착', nm: 'On-Series', en: '입사부터 정착·성장까지', sub: [
    { t: 'On-Syncing', d: '신입사원 온보딩', caps: ['조직이해', '업무적응', '관계형성', 'AI활용'] },
    { t: 'On-Performing', d: '경력 입사자 온보딩', caps: ['빠른적응', '성과창출', '협업체계', '역할정착'] },
    { t: 'On-Powering', d: '성장단계별 리텐션', caps: ['몰입도향상', '성장동력', '조직정착'] },
  ] },
  { ph: 'STAGE 2', key: '승진·역할전환', nm: 'Role-Up', en: '역할 변화 시점의 역량 전환', sub: [
    { t: 'Pro', d: '실행 역량 강화', caps: ['업무생산성', '커뮤니케이션', 'AI활용', '협업'] },
    { t: 'Manager', d: '조직 운영 역량', caps: ['문제해결', '프로젝트운영', '후배육성', '피드백'] },
    { t: 'Leader', d: '성과 창출 역량', caps: ['성과관리', '의사결정', '변화관리', '조직운영'] },
  ] },
  { ph: 'STAGE 3', key: '팀장 성과', nm: 'Re:Lead', en: '성과를 만드는 팀장', sub: [
    { t: '팀장 리더십', d: '사람관리·성과관리·조직운영 균형', caps: ['역할인식', '사람관리', '팀관리', '성과관리', '변화대응'] },
  ] },
  { ph: 'STAGE 4', key: '핵심인재·임원', nm: 'Executive', en: '미래 성장을 이끄는 리더', sub: [
    { t: 'Executive Leadership', d: '핵심인재·차세대 리더', caps: ['핵심인재육성', '차세대리더', 'Executive Insight'] },
  ] },
];

export const FACULTY = {
  eyebrow: 'TEACHING & OPERATION',
  title: '교육 운영·강사 체계',
  tbd: '강사 프로필·사례 확보 후 확장',
  lead: '강사 개인 역량이 아닌, 컨설턴트-강사 협업과 시스템으로 교육 품질을 관리합니다.',
  steps: [
    { fsn: 'STEP 1', b: '전문성 검증', p: '실무 경험·직무 이해·트렌드 반영' },
    { fsn: 'STEP 2', b: '기업교육 적합성', p: '전달력·참여 유도·현업 적용' },
    { fsn: 'STEP 3', b: '운영성과 검증', p: '만족도·재의뢰·운영 안정성' },
    { fsn: 'STEP 4', b: '지속 품질관리', p: '정기 피드백·역량 개발' },
  ],
  principles: [
    { b: '교육 목적 중심 설계', p: '강사 중심이 아닌 교육 목표·고객 니즈 기준' },
    { b: '컨설턴트-강사 협업', p: '운영이 아닌 설계 단계부터 함께 참여' },
    { b: '일관된 교육 경험', p: '개인 역량 의존이 아닌 팀 기반 운영' },
  ],
};

export const GROWTHFIT = {
  eyebrow: 'ORGANIZATION DIAGNOSIS · B2-3',
  title: '우리 조직은 지금, 어떻게 성장하고 있나요?',
  lead: '조직전환 연구소 **Growth-Fit**은 구성원의 경험을 데이터로 진단해 성장 동인을 찾습니다. 48개 문항·6개 축으로, 강점은 확산하고 우선 지원 영역은 HRD 과제로 연결합니다.',
  radarNote: '※ 6 Core Dimensions 프로파일 예시, 실제 진단 시 조직별 리포트 제공',
  radarLabels: ['Vision', 'Result', 'Trust', 'Value', 'Agility', 'Infra'],
  dims: [
    { b: 'Vision & Direction', s: '조직의 방향성·목표 정렬 경험' },
    { b: 'Result', s: '성과 중심의 실행 경험' },
    { b: 'Trust & Communication', s: '협업·커뮤니케이션 경험' },
    { b: 'Value', s: '고객 가치 중심의 업무 경험' },
    { b: 'Agility & Change', s: '변화 대응·혁신 경험' },
    { b: 'Infra', s: '성장을 지원하는 업무환경·디지털 체계' },
  ],
  compareHead: '일반 조직문화 진단과 **무엇이 다른가**',
  compare: [
    ['조직 현황 측정', '조직 경험 진단'],
    ['문화 수준 파악', '성장 동인 분석'],
    ['만족도 중심', '실행 경험 중심'],
    ['결과 보고', 'HRD 과제 도출'],
    ['진단 종료', 'HRD 솔루션 연계'],
  ],
  flowLabel: '진단 결과는 실행 과제로 이어집니다',
  flow: ['Leadership Development', 'Collaboration Enhancement', 'AI Capability Building', 'Performance Excellence', 'Learning Culture Design'],
  ctaTitle: '우리 조직의 성장 경험, 지금 진단해 보시겠어요?',
  ctaSub: '진단 문의를 남기시면 조직 상황에 맞는 Growth-Fit 진단을 안내해 드립니다.',
  cta: '우리 조직 진단 문의하기',
};

export const WHY = {
  eyebrow: 'WHY KG',
  title: '단발성 교육이 아닌, 성장하는 체계입니다',
  cards: [
    { wn: '01', h4: '진단에서 시작', p: '리더십·조직문화·AI리터러시 진단으로 현재를 파악하고 여정을 설계합니다.' },
    { wn: '02', h4: '성장단계 정합', p: '신입부터 C-Level까지, 직급이 아닌 성장단계에 맞춘 리더십을 제공합니다.' },
    { wn: '03', h4: '조직문화로 정착', p: '개인 역량을 넘어 조직확산·문화정착까지 이어지는 5단계 체계입니다.' },
  ],
};

export const INQ = {
  title: '리더십 체계,\n진단부터 시작하세요',
  sub: '우리 조직에 맞는 리더십·조직 체계를 함께 설계합니다. 도입 문의를 남겨주시면 담당자가 연락드립니다.',
  interests: ['리더십·조직(P2)', 'AX·AI 전환(P1)', 'HRD 통합(P3)', '콘텐츠(P4)'],
  successTitle: '문의가 접수되었습니다',
  successMsg: '담당자가 확인 후 연락드리겠습니다.',
};

export const MODAL = {
  title: '도입 문의',
  body: '아래 문의 폼으로 이동합니다. 우리 조직에 맞는 리더십 체계를 함께 설계해 드리겠습니다.',
  cta: '문의 폼으로 이동',
};

export const SUBNAV = [
  { id: 'pain', label: '고민' },
  { id: 'journey', label: '성장여정' },
  { id: 'tracks', label: '6대 역량' },
  { id: 'framework', label: 'Framework' },
  { id: 'offline', label: '오프라인' },
  { id: 'faculty', label: '운영·강사' },
  { id: 'growthfit', label: '조직진단' },
  { id: 'why', label: '차별점' },
  { id: 'inq', label: '도입문의' },
];
