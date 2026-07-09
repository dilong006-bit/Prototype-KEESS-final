# KEESS P4 콘텐츠 솔루션 — UI/UX 고도화 기술명세서 (Claude Code 참조용)

| 항목 | 내용 |
|------|------|
| **Spec Version** | 1.0 (Design Enhancement) |
| **대상 화면** | P4 콘텐츠 솔루션 B안 (로컬 빌드 · localhost:3001/content) |
| **앵커 기준** | `keess_P4_content_solution_B_v2_0.html` 공통 컴포넌트 정의(`.hexmap`/`.hx`/`.ic`/`.eyebrow`) |
| **작성 관점** | 시니어 UI/UX 디자이너 |
| **설계 근거** | Apple HIG · WSJ 인포그래픽(Dona Wong) · 2026 UI 트렌드 |
| **작성일** | 2026-07-09 |

> **앵커 주의**: 본 명세는 v2.0 컴포넌트 정의를 앵커로 한다. 로컬 빌드(스크린샷)에서 **히어로 배경이 솔리드 오렌지 블록**으로 보이는 등 색 관련 규칙이 v2.0과 다를 수 있음 → 색 항목(S4)은 현재 빌드의 해당 규칙에 적용. 정확한 앵커 정합을 위해 **현재 빌드 HTML 첨부 권장**.

---

## 1. 진단 (Design Audit)

### 1-1. 히어로 우측 컴포넌트 (사용자 지적 + 확장 진단)
현재: `.hexmap` 카드 = `.core`(8,426 + 라벨) + `.g6`(3×2 `.hx` 타일). 각 타일 = 아이콘(22px) + `.n`(01~06) + `.t`(라벨).

| # | 문제 | 진단(근거) |
|---|---|---|
| a | 아이콘이 굵고 큼 | 22px·stroke 1.8은 12.5px 라벨 대비 과대. **HIG: 아이콘 굵기·크기는 텍스트와 정렬**되어야 함. 타일에서 아이콘이 라벨을 압도 |
| b | 01~06 번호 불필요 | 카테고리 식별에 기여하지 않는 장식. **WSJ: 정보를 더할 때만 장식**. 좌측 axisnav가 이미 순서 제공 → 중복 |
| c | 타일이 통 오렌지(`--orsoft`) 필 | 6칸 전부 동일 소프트-오렌지 → 단조·저품질. **2026 트렌드: 뉴트럴 캔버스+절제된 액센트**가 프리미엄 |
| d | 카드가 히어로 카피와 경쟁 | 좌측 카피 + 우측 큰 숫자·6타일 동시 강조 → 시선 분산. **HIG: 콘텐츠가 주인공, 나머지는 거들기** |
| e | 그림자 단층 | 단일 그림자 → 납작. **트렌드: 2~3겹 diffused shadow**로 깊이 |

### 1-2. 'JOB COMPETENCY' 두 줄 노출 (원인 규명)
- 근본 원인: `.eyebrow{display:flex;align-items:center}` 에서 텍스트 노드(대문자·`letter-spacing:.15em`)가 익명 flex item으로 처리 → axhead 좌측 컬럼이 좁을 때 **줄바꿈**. `align-items:center`가 2줄 텍스트에 배지·아이콘을 중앙 정렬해 더 어색
- 부가 진단: 영문 eyebrow(JOB COMPETENCY 등)가 한글 h2(직무역량)와 **의미 중복** + **ALL CAPS**(WSJ: 데이터/라벨 ALL CAPS 지양)

### 1-3. 전역 진단
| 영역 | 진단 |
|---|---|
| 컬러 | 히어로 블록·04 카드·Final CTA가 모두 풀-오렌지 → **한 화면에 강한 오렌지 블록 다수**. 위계 상실·피로. 절제 필요 |
| 아이콘 시스템 | 전역 stroke 1.8 고정 → 무겁다. 장식 아이콘은 1.5가 현대적 |
| 타이포 | 8,426 등 수치에 `tabular-nums` 미적용, 큰 숫자 자간 여지 |
| 리듬 | 섹션 간 처리 균일 → 그룹 간>그룹 내 간격 리듬 약함 |
| 깊이 | 그림자 단층 위주 → elevation 체계 부재 |

> 진단 요약: "구조·정보는 탄탄하나, **아이콘 과중 · 장식 잉여 · 오렌지 과포화 · 깊이 단조**가 체감 품질을 떨어뜨림. 핵심은 감산(減算)과 절제."

---

## 2. 고도화 전략

> "풀-오렌지 화면 → **뉴트럴 캔버스 + 절제된 오렌지 액센트**"
> "굵은 아이콘·번호 장식 → **가벼운 아이콘 + 정보만 남긴 벤토 타일**"
> "납작한 단층 → **다겹 그림자로 은은한 깊이**"

- 원칙 1. 감산 우선 — 번호·중복 영문·잉여 필을 제거해 정보만 남긴다(WSJ Simplify)
- 원칙 2. 콘텐츠 우선(Deference) — 히어로 우측 컴포넌트는 좌측 메시지를 **거드는** 보조 시각물로 낮춘다(HIG)
- 원칙 3. 절제된 액센트 — 풀-오렌지 블록은 화면당 **1회(Final CTA)**로 제한, 히어로는 뉴트럴로
- 원칙 4. 크래프트 — 아이콘 칩·concentric radius·다겹 그림자·tabular-nums로 디테일 완성도
- 원칙 5. 트렌드는 덧칠 — bento·soft-light·glass는 가독성·접근성을 해치지 않는 선에서만

---

## 3. 디자인 토큰 (근거 기반)
```css
/* Motion */
--ease-out:cubic-bezier(.2,0,0,1); --dur-micro:140ms; --dur-std:240ms;
/* Elevation (다겹) */
--shadow-1:0 1px 2px rgba(20,20,30,.06),0 2px 6px rgba(20,20,30,.06);
--shadow-2:0 2px 4px rgba(20,20,30,.06),0 8px 20px rgba(20,20,30,.08);
--shadow-3:0 4px 8px rgba(20,20,30,.08),0 16px 40px rgba(20,20,30,.12);
/* Radius (concentric: 안쪽 = 바깥 − 패딩) */
--r-card:22px; --r-tile:13px; --r-chip:10px;
/* Hairline */
--line-soft:rgba(20,20,30,.07);
/* Icon */
--ic-stroke:1.5;
```
- 신규 컬러 토큰 도입 없음 — 기존 KG CI(`--or`/`--or2`/`--law`/`--rp`)·중립색 재사용

---

## 4. 컴포넌트별 기술명세 (Before → After)

### S1 · 히어로 우측 컴포넌트(6축 벤토 맵) 재설계 [Must]
**목표**: 아이콘 경량화 + 번호 제거 + 뉴트럴 타일 + 아이콘 칩 + 다겹 그림자

- 마크업(각 `.hx` 6개): `.n` 제거, 아이콘을 칩으로 감싼다
```html
<!-- Before -->
<a class="hx" href="#ax1"><svg class="ic" ...></svg><span class="n">01</span><span class="t">직무역량</span></a>
<!-- After -->
<a class="hx" href="#ax1"><span class="hx-ic"><svg class="ic" ...></svg></span><span class="t">직무역량</span></a>
```
- CSS
```css
/* Before: .hx{...background:var(--orsoft);border:1px solid #F6DDBE;border-radius:14px;padding:12px 8px} .hx svg{width:22px;height:22px;color:var(--or2)} .hx .n{...} */
.hx{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;
    background:#fff;border:1px solid var(--line-soft);border-radius:var(--r-tile);
    padding:14px 10px;transition:transform var(--dur-std) var(--ease-out),box-shadow var(--dur-std) var(--ease-out)}
.hx:hover{transform:translateY(-3px);box-shadow:var(--shadow-2)}
.hx-ic{width:34px;height:34px;border-radius:var(--r-chip);background:var(--orsoft);
       display:grid;place-items:center}
.hx-ic svg{width:18px;height:18px;color:var(--or2);stroke-width:var(--ic-stroke)}
.hx .t{font-size:12.5px;font-weight:700;line-height:1.25;color:var(--ink)}
/* 카테고리 액센트는 '칩'에만 (타일 전체 X) */
.hx.law .hx-ic{background:var(--lawsoft)} .hx.law .hx-ic svg{color:var(--law)}
.hx.net .hx-ic{background:var(--rpsoft)} .hx.net .hx-ic svg{color:var(--rp)}
```
- `.hexmap` 카드: `border-radius:var(--r-card);box-shadow:var(--shadow-2)` (concentric)
- 근거: HIG(아이콘-텍스트 정렬·거들기) · 트렌드(bento·soft-UI 칩·다겹 그림자)
- 인수조건: 아이콘 18px/stroke 1.5, 번호 미노출, 타일 흰 배경+칩 액센트, hover 다겹 그림자

### S2 · 아이콘 시스템 경량화 (전역) [Should]
- 장식 아이콘 stroke 1.8 → 1.5 (CSS가 presentation attribute 오버라이드)
```css
.eyebrow svg,.hx-ic svg,.axisnav svg{stroke-width:var(--ic-stroke)}
.eyebrow svg{width:15px;height:15px}
```
- 예외: 의미상 강조가 필요한 아이콘은 개별 유지
- 인수조건: eyebrow·타일·내비 아이콘이 얇아짐, 라벨과 시각 무게 균형

### S3 · eyebrow 재설계 (두줄 버그 · 번호 · ALL CAPS) [Must]
- 두줄 버그 픽스
```css
/* Before: .eyebrow{...display:flex;align-items:center;gap:9px} */
.eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;
         color:var(--or2);display:inline-flex;align-items:center;gap:8px;
         white-space:nowrap;flex-wrap:nowrap}   /* ← 줄바꿈 차단 */
```
- 번호(`.no`) 제거: 6개 섹션 eyebrow의 `<span class="no">0N</span>` 및 `.eyebrow .no` CSS 삭제 (하단 [결정 A] 확인)
- ALL CAPS 완화(선택): 영문 kicker가 한글 h2와 중복 → 자간·크기 유지하되 존재 이유 재검토, 유지 시 대비만 낮춤
- 인수조건: 'Job Competency' 1줄 고정, 번호 미노출(결정 A 반영), 좁은 컬럼에서도 안정

### S4 · 컬러 리스트레인트 [Consider · 결정 B]
- 방향: 풀-오렌지 블록은 **Final CTA 1곳**으로 제한, **히어로는 뉴트럴 캔버스**로 전환
- 현재 빌드가 히어로를 솔리드 오렌지로 렌더 중이면 해당 규칙을 아래로 교체
```css
/* 히어로 배경: 솔리드 오렌지 → 웜 뉴트럴 + 기존 radial glow 유지 */
.hero{background:linear-gradient(180deg,#FFFDFB,#FFF6EC)}
/* 텍스트: 화이트 → 잉크(대비 확보), .hl(오렌지 그라디언트) 유지 */
```
- 주의: 히어로 텍스트/버튼 색이 화이트 기준이면 잉크 기준으로 동반 조정 필요(고대비 유지)
- 근거: 2026 soft-light 에디토리얼·절제(muted neutral + intentional accent)
- 인수조건(채택 시): 화면 내 풀-오렌지 블록 1개, 히어로 대비 AA 이상

### S5 · 깊이/그림자 다겹화 [Should]
- 단일 그림자 → `--shadow-1/2/3` elevation 체계 적용 (카드=2, hover=3, hairline 구분선)
- 인수조건: 카드·모달·타일 그림자가 다겹, 표면 레벨별 일관

### S6 · 타이포 폴리시 [Should]
```css
.hexmap .core b{font-variant-numeric:tabular-nums;letter-spacing:-.04em}
```
- 큰 숫자·통계 tabular-nums, display 자간 −0.025em 유지, 본문 line-height 1.5~1.6 유지
- 인수조건: 8,426 등 수치 고정폭 정렬, 숫자 흔들림 제거

### S7 · 모션/상태 [Consider]
- 타일 등장 stagger(30~60ms), hover lift는 `--ease-out` 240ms, morph(즉시 교체 금지)
- 인수조건: 과한 모션 없이 hover·등장이 부드러움

---

## 5. 반응형·접근성
- 아이콘 칩·타일 축소 후에도 타일 클릭 타깃 충분(≥44px 상당 영역) 유지 (HIG)
- `.g6` 모바일 2열(기존 규칙) 유지, 칩·라벨 축소 시 가독 유지
- eyebrow nowrap 적용 시 초협소 폭에서 overflow 없는지 확인(필요 시 축약)
- S4 채택 시 히어로 텍스트 대비 WCAG AA(4.5:1) 재검증
- 카드/타일 `:focus-visible` 링 유지, 색만으로 상태 전달 금지

---

## 6. 검증 체크리스트
```bash
F=<current_build>.html
# 번호 제거(결정 A 채택 시)
grep -c 'class="n"' $F            # 히어로 타일 0
grep -c 'class="no"' $F           # 섹션 eyebrow 0 (또는 정책값)
# eyebrow 줄바꿈 차단
grep -c "white-space:nowrap" $F   # eyebrow 규칙에 존재
# 아이콘 경량화
grep -c "hx-ic" $F                # 6 (히어로 타일 칩)
# 깊이 토큰
grep -Ec "shadow-1|shadow-2|shadow-3" $F  # >=1
# tabular-nums
grep -c "tabular-nums" $F         # >=1
# 구조 균형(python: div/brace/paren/bracket)
```
- 브라우저 확인: 히어로 타일 아이콘 얇고 작음·번호 없음·칩 액센트, 'Job Competency' 1줄, hover 다겹 그림자, (S4 채택 시) 히어로 뉴트럴·대비 정상
- 회귀 확인: 6축 섹션·탐색기·문의/다운로드·FAB 정상, 데이터/기능 무변경

---

## 7. 범위 · 결정 · 핸드오프
### 우선순위
| 우선 | 항목 |
|---|---|
| Must | S1 히어로 타일 재설계 · S3 eyebrow 픽스 |
| Should | S2 아이콘 경량화 · S5 그림자 · S6 타이포 |
| Consider | S4 컬러 리스트레인트 · S7 모션 |

### 확정 필요 결정
- **[결정 A] 번호(01~06) 제거 범위**: 권고 = 히어로 타일 + 섹션 eyebrow **전역 제거**(장식 잉여). 섹션 번호를 '6개 체계' 내러티브로 유지하려면 eyebrow만 존치 가능
- **[결정 B] 컬러 리스트레인트(S4)**: 히어로를 뉴트럴 캔버스로 전환할지. 채택 시 히어로 텍스트·버튼 색 동반 조정. 브랜드 톤 유지 원하면 보류 가능

### 핸드오프
- 본 명세는 **디자인 레이어 전용** — §데이터/기능(대표과정 18종·탐색기·쇼케이스, `keess_P4_content_solution_B_v3_0_기술명세서.md`)과 독립. 두 명세는 동일 파일에 순차 적용 가능
- 다음: 결정 A·B 확정 → Claude Code 구현 프롬프트(디자인 패치) 작성 → 적용 → §6 검증
- 정확 앵커 정합을 위해 **현재 빌드 HTML 제공 시** 색·좌표까지 확정 명세로 보강
