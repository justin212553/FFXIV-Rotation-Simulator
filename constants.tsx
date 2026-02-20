
import { Skill } from './types';
import { PALADIN_SKILLS } from './Skills/paladin';
import { DRAGOON_SKILLS } from './Skills/dragoon';
import { WARRIOR_SKILLS } from './Skills/warrior';
import { DARK_KNIGHT_SKILLS } from './Skills/darkknight';
import { GUNBREAKER_SKILLS } from './Skills/gunbreaker';
import { MONK_SKILLS } from './Skills/monk';
import { NINJA_SKILLS } from './Skills/ninja';
import { SAMURAI_SKILLS } from './Skills/samurai';
import { REAPER_SKILLS } from './Skills/reaper';
import { VIPER_SKILLS } from './Skills/viper';
import { BARD_SKILLS } from './Skills/bard';
import { MACHINIST_SKILLS } from './Skills/machinist';
import { DANCER_SKILLS } from './Skills/dancer';
import { BLACK_MAGE_SKILLS } from './Skills/blackmage';
import { SUMMONER_SKILLS } from './Skills/summoner';
import { RED_MAGE_SKILLS } from './Skills/redmage';
import { PICTOMANCER_SKILLS } from './Skills/pictomancer';
import { WHITE_MAGE_SKILLS } from './Skills/whitemage';
import { SCHOLAR_SKILLS } from './Skills/scholar';
import { ASTROLOGIAN_SKILLS } from './Skills/astrologian';
import { SAGE_SKILLS } from './Skills/sage';

export interface JobDefinition { id: string; name: string; role: 'Tank' | 'Melee' | 'Phys Ranged' | 'Magic Ranged' | 'Healer'; skills: Skill[]; }

export const JOBS: JobDefinition[] = [
  // Tanks
  { id: 'PLD', name: '나이트', role: 'Tank', skills: PALADIN_SKILLS },
  { id: 'WAR', name: '전사', role: 'Tank', skills: WARRIOR_SKILLS },
  { id: 'DRK', name: '암흑기사', role: 'Tank', skills: DARK_KNIGHT_SKILLS },
  { id: 'GNB', name: '건브레이커', role: 'Tank', skills: GUNBREAKER_SKILLS },
  // Melee
  { id: 'MNK', name: '몽크', role: 'Melee', skills: MONK_SKILLS },
  { id: 'DRG', name: '용기사', role: 'Melee', skills: DRAGOON_SKILLS },
  { id: 'NIN', name: '닌자', role: 'Melee', skills: NINJA_SKILLS },
  { id: 'SAM', name: '사무라이', role: 'Melee', skills: SAMURAI_SKILLS },
  { id: 'RPR', name: '리퍼', role: 'Melee', skills: REAPER_SKILLS },
  { id: 'VPR', name: '바이퍼', role: 'Melee', skills: VIPER_SKILLS },
  // Phys Ranged
  { id: 'BRD', name: '음유시인', role: 'Phys Ranged', skills: BARD_SKILLS },
  { id: 'MCH', name: '기공사', role: 'Phys Ranged', skills: MACHINIST_SKILLS },
  { id: 'DNC', name: '무도가', role: 'Phys Ranged', skills: DANCER_SKILLS },
  // Magic Ranged
  { id: 'BLM', name: '흑마도사', role: 'Magic Ranged', skills: BLACK_MAGE_SKILLS },
  { id: 'SMN', name: '소환사', role: 'Magic Ranged', skills: SUMMONER_SKILLS },
  { id: 'RDM', name: '적마도사', role: 'Magic Ranged', skills: RED_MAGE_SKILLS },
  { id: 'PCT', name: '픽토맨서', role: 'Magic Ranged', skills: PICTOMANCER_SKILLS },
  // Healers
  { id: 'WHM', name: '백마도사', role: 'Healer', skills: WHITE_MAGE_SKILLS },
  { id: 'SCH', name: '학자', role: 'Healer', skills: SCHOLAR_SKILLS },
  { id: 'AST', name: '점성술사', role: 'Healer', skills: ASTROLOGIAN_SKILLS },
  { id: 'SGE', name: '현자', role: 'Healer', skills: SAGE_SKILLS },
];

export const JOB_ROLES = {
  Tank: { name: '방어 역할', color: 'bg-blue-900/50 text-blue-200 border-blue-700' },
  Melee: { name: '근거리 공격 역할', color: 'bg-red-900/50 text-red-200 border-red-700' },
  'Phys Ranged': { name: '원거리 물리 공격 역할', color: 'bg-amber-900/50 text-amber-200 border-amber-700' },
  'Magic Ranged': { name: '원거리 마법 공격 역할', color: 'bg-indigo-900/50 text-indigo-200 border-indigo-700' },
  Healer: { name: '회복 역할', color: 'bg-emerald-900/50 text-emerald-200 border-emerald-700' },
};
