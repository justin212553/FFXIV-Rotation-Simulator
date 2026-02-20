
import { Skill, SkillType, SkillSubType } from '../types';

export const SAGE_SKILLS: Skill[] = [
  { id: 'sge_dosis_iii', name: '도시스라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sge1/64', cooldown: 2.5 },
  { id: 'sge_phlegma_iii', name: '플레그마라', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sge2/64', cooldown: 45, maxCharges: 2 },
  { id: 'sge_eukrasia', name: '에우크라시아', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sge3/64', cooldown: 1.5, grantsProc: 'eukrasia_ready', procStacks: 1 },
  { id: 'sge_drhochole', name: '에우크라시아 도시스', type: SkillType.GCD, icon: 'https://picsum.photos/seed/sge4/64', cooldown: 2.5, consumesProc: 'eukrasia_ready' }
];
