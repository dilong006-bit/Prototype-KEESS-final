// [임시·Preview 전용] 500 화면(error.tsx) 확인용 라우트.
// 이 파일은 test/error-500 브랜치에만 존재하며 main에는 병합하지 않는다.
export const dynamic = 'force-dynamic';

export default function ErrTest() {
  throw new Error('preview check: intentional error');
}
