'use client';

import React from 'react';
import { TeamMember } from '@/types';
import { TeamCarousel } from './TeamCarousel';

interface TeamSectionProps {
  members: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ members }) => {
  if (!members || members.length === 0) return null;

  return <TeamCarousel members={members} />;
};


