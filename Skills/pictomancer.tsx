
import { Skill, SkillType, SkillSubType } from '../types';

export const PICTOMANCER_SKILLS: Skill[] = [
  { id: 'pct_fire_in_red', name: '빨간색 그림', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pct1/64', cooldown: 2.5 },
  { id: 'pct_smudge', name: '번지기', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pct2/64', cooldown: 20 },
  { id: 'pct_holy_in_white', name: '하얀색 거룩함', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pct3/64', cooldown: 2.5, resourceType: 'White Paint', resourceChange: -1 },
  { id: 'pct_starry_muse', name: '별빛 뮤즈', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pct4/64', cooldown: 120 }
];
