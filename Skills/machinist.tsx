
import { Skill, SkillType, SkillSubType } from '../types';

export const MACHINIST_SKILLS: Skill[] = [
  { id: 'mch_heated_split_shot', name: '과열된 분열 사격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/mch1/64', cooldown: 2.5, resourceType: 'Heat', resourceChange: 5 },
  { id: 'mch_hypercharge', name: '과충전', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/mch2/64', cooldown: 10, resourceType: 'Heat', resourceChange: -50 },
  { id: 'mch_drill', name: '드릴', type: SkillType.GCD, icon: 'https://picsum.photos/seed/mch3/64', cooldown: 20 },
  { id: 'mch_wild_fire', name: '과충전', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/mch4/64', cooldown: 120 }
];
