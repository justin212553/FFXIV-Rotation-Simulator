
import { Skill, SkillType, SkillSubType } from '../types';

export const DANCER_SKILLS: Skill[] = [
  { id: 'dnc_cascade', name: '폭포 오름', type: SkillType.GCD, icon: 'https://picsum.photos/seed/dnc1/64', cooldown: 2.5 },
  { id: 'dnc_standard_step', name: '표준 무도', type: SkillType.GCD, icon: 'https://picsum.photos/seed/dnc2/64', cooldown: 30 },
  { id: 'dnc_technical_step', name: '기술 무도', type: SkillType.GCD, icon: 'https://picsum.photos/seed/dnc3/64', cooldown: 120 },
  { id: 'dnc_fan_dance', name: '부채춤', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/dnc4/64', cooldown: 1, resourceType: 'Feather', resourceChange: -1 }
];
