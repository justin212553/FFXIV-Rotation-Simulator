
import { Skill, SkillType, SkillSubType } from '../types';

export const SAMURAI_SKILLS: Skill[] = [
  { id: 'sam_hakaze', name: '잎새 가르기', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sam1/64', cooldown: 2.5, resourceType: 'Kenki', resourceChange: 5 },
  { id: 'sam_meikyo_shisui', name: '명경지수', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/sam2/64', cooldown: 55, maxCharges: 2 },
  { id: 'sam_shinten', name: '진천', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/sam3/64', cooldown: 1, resourceType: 'Kenki', resourceChange: -25 },
  { id: 'sam_ikishoten', name: '의기충천', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/sam4/64', cooldown: 120, resourceType: 'Kenki', resourceChange: 50 }
];
