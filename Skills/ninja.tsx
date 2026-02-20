
import { Skill, SkillType, SkillSubType } from '../types';

export const NINJA_SKILLS: Skill[] = [
  { id: 'nin_spinning_edge', name: '쌍칼 베기', type: SkillType.GCD, icon: 'https://picsum.photos/seed/nin1/64', cooldown: 2.5 },
  { id: 'nin_suiton', name: '수둔의 술', type: SkillType.GCD, icon: 'https://picsum.photos/seed/nin2/64', cooldown: 1.5, grantsProc: 'hidden', procStacks: 1 },
  { id: 'nin_trick_attack', name: '속임수 공격', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/nin3/64', cooldown: 60, consumesProc: 'hidden' },
  { id: 'nin_mug', name: '강탈', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/nin4/64', cooldown: 120, resourceType: 'Ninki', resourceChange: 40 }
];
