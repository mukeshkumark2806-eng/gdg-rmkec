import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { DomainsSection } from '@/components/sections/DomainsSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero — light bg #F5F7FA */}
      <HeroSection />
      {/* 2. Stats — dark bg #0D1117 */}
      <StatsSection />
      {/* 3. Domains — light bg #F5F7FA */}
      <DomainsSection />
      {/* 4. Featured — dark bg #0D1117 */}
      <FeaturedSection />
      {/* 5. CTA — white #FFFFFF */}
      <CTASection />
    </div>
  );
}
