
import { Skill, SkillType, SkillSubType } from '../types';

export const BLACK_MAGE_SKILLS: Skill[] = [
  { id: 'blm_fire_iv', name: '파이쟈', type: SkillType.GCD, icon: 'https://picsum.photos/seed/blm1/64', cooldown: 2.8 },
  { id: 'blm_ley_lines', name: '마문', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/blm2/64', cooldown: 120 },
  { id: 'blm_triplecast', name: '삼연마', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/blm3/64', cooldown: 60, maxCharges: 2 },
  { id: 'blm_xenoglossy', name: '제노글로시', type: SkillType.GCD, icon: 'https://picsum.photos/seed/blm4/64', cooldown: 2.5, resourceType: 'Polyglot', resourceChange: -1 }
];
