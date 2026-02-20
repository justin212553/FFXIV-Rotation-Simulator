
import { Skill, SkillType, SkillSubType } from '../types';

export const GUNBREAKER_SKILLS: Skill[] = [
  { id: 'gnb_keen_edge', name: '예리한 일격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/gnb1/64', cooldown: 2.5, resourceType: 'Cartridge', resourceChange: 1 },
  { id: 'gnb_no_mercy', name: '무자비', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/gnb2/64', cooldown: 60 },
  { id: 'gnb_gnashing_fang', name: '비트 팽', type: SkillType.GCD, icon: 'https://picsum.photos/seed/gnb3/64', cooldown: 30, resourceType: 'Cartridge', resourceChange: -1 },
  { id: 'gnb_blasting_zone', name: '블래스팅 존', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/gnb4/64', cooldown: 30 }
];
