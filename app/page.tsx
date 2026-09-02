import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactSnapshotSection } from '@/components/sections/ImpactSnapshotSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { DevFestVibesSection } from '@/components/sections/DevFestVibesSection';
import { DomainsSection } from '@/components/sections/DomainsSection';
import { VenueSection } from '@/components/sections/VenueSection';
import { SeeYouThereSection } from '@/components/sections/SeeYouThereSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      {/* 1. Official Hero Section */}
      <HeroSection />

      {/* 2. Community Impact Snapshot (650+ Teams, 250+ Qualified, 100+ Learners, 40+ Completers) */}
      <ImpactSnapshotSection />

      {/* 3. What We Do (Learn, Build, Collaborate, Lead) */}
      <WhatWeDoSection />

      {/* 4. Campus Vibes (Present vs Attend) */}
      <DevFestVibesSection />

      {/* 5. Technical Wings & Focus Tracks */}
      <DomainsSection />

      {/* 6. Campus Venue & Location */}
      <VenueSection />

      {/* 7. Community CTA */}
      <SeeYouThereSection />
    </div>
  );
}
