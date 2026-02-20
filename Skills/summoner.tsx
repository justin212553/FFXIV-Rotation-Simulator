
import { Skill, SkillType, SkillSubType } from '../types';

export const SUMMONER_SKILLS: Skill[] = [
  { id: 'smn_ruin_iii', name: '루인라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/smn1/64', cooldown: 2.5 },
  { id: 'smn_aethercharge', name: '에테르 충전', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/smn2/64', cooldown: 60 },
  { id: 'smn_energy_drain', name: '에테르 빨아들이기', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/smn3/64', cooldown: 60, resourceType: 'Aetherflow', resourceChange: 2 },
  { id: 'smn_fester', name: '미아즈마 버스트', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/smn4/64', cooldown: 1, resourceType: 'Aetherflow', resourceChange: -1 }
];
