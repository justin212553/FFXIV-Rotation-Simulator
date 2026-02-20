
import { Skill, SkillType, SkillSubType } from '../types';

export const MONK_SKILLS: Skill[] = [
  { id: 'mnk_bootshine', name: '연격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/mnk1/64', cooldown: 2.5 },
  { id: 'mnk_perfect_balance', name: '진각', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/mnk2/64', cooldown: 40, maxCharges: 2 },
  { id: 'mnk_riddle_of_fire', name: '홍염의 태세', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/mnk3/64', cooldown: 60 },
  { id: 'mnk_forbidden_chakra', name: '음양투기참', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/mnk4/64', cooldown: 1, resourceType: 'Chakra', resourceChange: -5 }
];
