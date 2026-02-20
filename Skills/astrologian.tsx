
import { Skill, SkillType, SkillSubType } from '../types';

export const ASTROLOGIAN_SKILLS: Skill[] = [
  { id: 'ast_fall_malefic', name: '폴 말레피크', type: SkillType.GCD, icon: 'https://picsum.photos/seed/ast1/64', cooldown: 2.5 },
  { id: 'ast_draw', name: '카드 뽑기', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/ast2/64', cooldown: 30, maxCharges: 2 },
  { id: 'ast_lights_speed', name: '신속한 카드', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/ast3/64', cooldown: 90, maxCharges: 2 },
  { id: 'ast_divination', name: '점성술', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/ast4/64', cooldown: 120 }
];
