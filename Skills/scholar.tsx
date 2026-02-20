
import { Skill, SkillType, SkillSubType } from '../types';

export const SCHOLAR_SKILLS: Skill[] = [
  { id: 'sch_broil_iv', name: '비등라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sch1/64', cooldown: 2.5 },
  { id: 'sch_aetherflow', name: '에테르 순환', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/sch2/64', cooldown: 60, resourceType: 'Aetherflow', resourceChange: 3 },
  { id: 'sch_energy_drain', name: '에테르 빨아들이기', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/sch3/64', cooldown: 1, resourceType: 'Aetherflow', resourceChange: -1 },
  { id: 'sch_chain_stratagem', name: '연환계', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/sch4/64', cooldown: 120 }
];
