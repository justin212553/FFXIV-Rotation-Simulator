
import { Skill, SkillType, SkillSubType } from '../types';

export const WHITE_MAGE_SKILLS: Skill[] = [
  { id: 'whm_glare_iii', name: '글레어라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/whm1/64', cooldown: 2.5 },
  { id: 'whm_presence_of_mind', name: '신속한 기도', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/whm2/64', cooldown: 120 },
  { id: 'whm_assize', name: '심판', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/whm3/64', cooldown: 40 },
  { id: 'whm_thin_air', name: '박애', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/whm4/64', cooldown: 60, maxCharges: 2 }
];
