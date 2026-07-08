# KEESS B안 — KG에듀원 기업교육 통합 사이트

Next.js(App Router) + React + TypeScript + Tailwind v3.4 기반 **B안 5페이지 정적 사이트**.
디자인 기준: [`ref/design/Design.md`](ref/design/Design.md) · 확정 프로토타입([`ref/prototype`](ref/prototype)).

## 라우트

| 경로 | 페이지 | 틴트 | 원본 |
|---|---|---|---|
| `/` | 홈 (히어로 캐러셀·4필러·성과·FAQ·문의) | 중립 | `keess_home_C_v18` |
| `/ax-ai` | P1 AX·AI 전환 | 보라 `.tint-p1` | `keess_P1_AXAI_D_scenario_v7` |
| `/leadership` | P2 리더십·조직 | 마젠타 `.tint-p2` | `keess_P2_leadership_B_framework` |
| `/hrd` | P3 HRD 통합 솔루션 (+정부지원 `#gov`) | 바이올렛 `.tint-p3` | `keess_P3_hrd_B_platform_v2.0` |
| `/content` | P4 콘텐츠 솔루션 (+다운로드 `#download`·탐색기) | 웜 `.tint-p4` | `keess_P4_content_solution_B_v2.0` |

- **부정훈련 예방/신고 모달**: 공통 Footer에 상시 마운트 → 전 페이지 동작(기준 = `KEESS_home_C_v26`).
- **크로스링크**: `/hrd#gov` ↔ `/content#download`.
- **다운로드**: `public/downloads/KG에듀원_과정리스트.xlsx` (라이트 게이트 → 실제 다운로드).

## 개발 · 빌드

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 빌드 (SSG)
npm run start    # 빌드 결과 서빙
```

> Windows에서 `next build` 후 `next dev`로 전환 시 `.next` 캐시 충돌이 나면 `.next`를 삭제하고 다시 실행하세요.

## 배포 (Vercel 권장)

1. 저장소를 Vercel에 연결 → 프레임워크 자동 감지(Next.js).
2. 빌드 커맨드 `next build`, 출력 자동. 환경변수 없음.
3. 전 페이지 정적(SSG)이므로 정적 호스팅(Netlify/S3+CloudFront 등)도 가능.

## 백엔드 없음 (연동 슬롯)

- 문의/상담/가이드/다운로드 게이트·부정훈련 신고는 **클라이언트 검증 + 성공/데모 상태 UI**입니다.
- 실전송은 각 폼의 `onSuccess`/submit 지점에 향후 엔드포인트(사내 API·메일 서비스)를 연결하면 됩니다.

## 구조

```
app/            # 라우트 + globals.css + layout(폰트·공통 Footer·ToTop)
components/
  common/       # Nav·Footer·ReportModal·Modal·SubNav·Button·LeadForm·Reveal 등
  sections/     # 페이지별 섹션(home/axai/leadership/hrd/content)
data/           # 카피·데이터(verbatim)
lib/            # useReveal·useModal·types
styles/         # components.css(공통) + 페이지별(home/axai/leadership/hrd/content).css
public/         # fonts(Pretendard self-host)·images·downloads(xlsx)
```

폰트: **Pretendard Variable self-host**(`next/font/local`) 전 페이지 통일 + Gowun Batang(홈 매니페스토 한정).
