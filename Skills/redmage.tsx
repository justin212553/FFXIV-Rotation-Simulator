
import { Skill, SkillType, SkillSubType } from '../types';

export const RED_MAGE_SKILLS: Skill[] = [
  { id: 'rdm_jolt_ii', name: '졸트라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/rdm1/64', cooldown: 2.5, grantsProc: 'dualcast', procStacks: 1 },
  { id: 'rdm_fleche', name: '플레슈', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/rdm2/64', cooldown: 25 },
  { id: 'rdm_acceleration', name: '가속', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/rdm3/64', cooldown: 55, maxCharges: 2 },
  { id: 'rdm_manafication', name: '마나 전환', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/rdm4/64', cooldown: 110 }
];
