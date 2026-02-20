
import { Skill, SkillType, SkillSubType } from '../types';

export const REAPER_SKILLS: Skill[] = [
  { id: 'rpr_slice', name: '가르기', type: SkillType.GCD, icon: 'https://picsum.photos/seed/rpr1/64', cooldown: 2.5, resourceType: 'Soul', resourceChange: 10 },
  { id: 'rpr_blood_stalk', name: '피의 갈퀴', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/rpr2/64', cooldown: 1, resourceType: 'Soul', resourceChange: -50 },
  { id: 'rpr_enshroud', name: '레무르 강림', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/rpr3/64', cooldown: 15, resourceType: 'Shroud', resourceChange: -50 },
  { id: 'rpr_arcane_circle', name: '신비한 원', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/rpr4/64', cooldown: 120 }
];
