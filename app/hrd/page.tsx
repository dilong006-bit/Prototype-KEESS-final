import type { Metadata } from 'next';
import '@/styles/hrd.css';
import Nav from '@/components/common/Nav';
import RevealInit from '@/components/common/RevealInit';
import HdModalProvider from '@/components/sections/hrd/HdModal';
import Sections from '@/components/sections/hrd/Sections';

export const metadata: Metadata = {
  title: 'HRD 통합 솔루션 | KEESS — HRD 운영의 모든 것을 하나의 플랫폼에서',
  description:
    '시스템·운영·콘텐츠 제작을 단일 아키텍처로 연결하는 HRD 통합 플랫폼. KGESA 노코드 빌더·차세대 데모·정부지원 환급(사업주훈련) 대행까지 통합 제공합니다.',
};

export default function HrdPage() {
  return (
    <div className="tint-p3">
      <Nav current="hrd" consultHref="#inq" />
      <RevealInit />
      <HdModalProvider>
        <Sections />
      </HdModalProvider>
    </div>
  );
}
