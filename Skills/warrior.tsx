
import { Skill, SkillType, SkillSubType } from '../types';

export const WARRIOR_SKILLS: Skill[] = [
  { id: 'war_heavy_swing', name: '육중한 일격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/war1/64', cooldown: 2.5, resourceType: 'Beast Gauge', resourceChange: 10 },
  { id: 'war_inner_release', name: '원초의 해방', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/war2/64', cooldown: 60, grantsProc: 'inner_release_ready', procStacks: 3 },
  { id: 'war_fell_cleave', name: '원초의 참격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/war3/64', cooldown: 2.5, resourceType: 'Beast Gauge', resourceChange: -50 },
  { id: 'war_upheaval', name: '업히벌', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/war4/64', cooldown: 30 }
];
