
import { Skill, SkillType, SkillSubType } from '../types';

export const VIPER_SKILLS: Skill[] = [
  { id: 'vpr_steel_fang', name: '강철 송곳니', type: SkillType.GCD, icon: 'https://picsum.photos/seed/vpr1/64', cooldown: 2.5 },
  { id: 'vpr_serpents_ire', name: '뱀의 분노', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/vpr2/64', cooldown: 60 },
  { id: 'vpr_reawakened', name: '조상의 힘', type: SkillType.GCD, icon: 'https://picsum.photos/seed/vpr3/64', cooldown: 2.5, resourceType: 'Viper Gauge', resourceChange: -50 },
  { id: 'vpr_uncoil', name: '해방', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/vpr4/64', cooldown: 1 }
];
