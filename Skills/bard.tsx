
import { Skill, SkillType, SkillSubType } from '../types';

export const BARD_SKILLS: Skill[] = [
  { id: 'brd_heavy_shot', name: '강력한 사격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/brd1/64', cooldown: 2.5 },
  { id: 'brd_raging_strikes', name: '용맹한 사격', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/brd2/64', cooldown: 120 },
  { id: 'brd_bloodletter', name: '피의 화살', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/brd3/64', cooldown: 15, maxCharges: 3 },
  { id: 'brd_empyreal_arrow', name: '천상의 화살', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/brd4/64', cooldown: 15 }
];
