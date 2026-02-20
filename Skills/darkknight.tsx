
import { Skill, SkillType, SkillSubType, BuffEffect } from '../types';

export const DRK_BUFFS: Record<string, BuffEffect> = {
  DARKSIDE: { id: 'drk_darkside', name: '암흑', duration: 30, damageMod: 1.1, color: '#9333ea', isDurationAddable: true, maxDuration: 60 },
  SALTED_EARTH: { id: 'drk_salted_earth', name: '감염 지대', duration: 15, damageMod: 1.0, color: '#7e22ce' },
  DELIRIUM: { id: 'drk_delirium', name: '피의 열광', duration: 15, damageMod: 1.0, color: '#b91c1c' },
  BLACKEST_NIGHT: { id: 'drk_tbn', name: '흑야', duration: 7, damageMod: 1.0, color: '#1e1b4b' },
  SHADOW_VIGIL: { id: 'drk_shadow_vigil', name: '그림자 요새', duration: 15, damageMod: 1.0, color: '#4c1d95' },
  DARK_MIND: { id: 'drk_dark_mind', name: '어두운 감정', duration: 10, damageMod: 1.0, color: '#312e81' },
  DARK_MISSIONARY: { id: 'drk_missionary', name: '어둠의 포교자', duration: 15, damageMod: 1.0, color: '#6366f1' },
  OBLATION: { id: 'drk_oblation', name: '헌신', duration: 10, damageMod: 1.0, color: '#818cf8' },
  LIVING_DEAD: { id: 'drk_living_dead', name: '산송장', duration: 10, damageMod: 1.0, color: '#000000' },
};

const ICON_BASE = 'https://image.ff14.co.kr/guide/resources/images/jobicon/darkknight/pve/';

export const DARK_KNIGHT_SKILLS: Skill[] = [
  // -------------------------
  // 글쿨기 (GCD)
  // -------------------------
  { id: 'drk_hard_slash', name: '강렬한 참격', type: SkillType.GCD, icon: `${ICON_BASE}003051.png`, cooldown: 2.5 },
  { id: 'drk_syphon_strike', name: '흡수의 일격', type: SkillType.GCD, icon: `${ICON_BASE}003054.png`, cooldown: 2.5 },
  { id: 'drk_souleater', name: '흡혼검', type: SkillType.GCD, icon: `${ICON_BASE}003055.png`, cooldown: 2.5, resourceType: 'Blackblood', resourceChange: 20 },  
  { id: 'drk_bloodspiller', name: '피보라', type: SkillType.GCD, icon: `${ICON_BASE}003080.png`, cooldown: 2.5, resourceType: 'Blackblood', resourceChange: -50 },
  { id: 'drk_quietus', name: '종지부', type: SkillType.GCD, icon: `${ICON_BASE}003079.png`, cooldown: 2.5, resourceType: 'Blackblood', resourceChange: -50 },
  { id: 'drk_unleash', name: '촉발', type: SkillType.GCD, icon: `${ICON_BASE}003063.png`, cooldown: 2.5 },
  { id: 'drk_stalwart_soul', name: '불굴의 영혼', type: SkillType.GCD, icon: `${ICON_BASE}003084.png`, cooldown: 2.5, resourceType: 'Blackblood', resourceChange: 20 },
  { id: 'drk_unmend', name: '살의', type: SkillType.GCD, icon: `${ICON_BASE}003062.png`, cooldown: 2.5 },
  { id: 'drk_disesteem', name: '경멸', type: SkillType.GCD, icon: `${ICON_BASE}003099.png`, cooldown: 2.5, consumesProc: 'scorn_ready' },
  
  // 피의 열광 콤보 (Delirium Combo)
  { id: 'drk_scarlet_delirium', name: '붉은 열광', type: SkillType.GCD, icon: `${ICON_BASE}003095.png`, cooldown: 2.5, consumesProc: 'delirium_active' },
  { id: 'drk_comeuppance', name: '업보', type: SkillType.GCD, icon: `${ICON_BASE}003096.png`, cooldown: 2.5, consumesProc: 'delirium_active' },
  { id: 'drk_torcleaver', name: '도륙검', type: SkillType.GCD, icon: `${ICON_BASE}003097.png`, cooldown: 2.5, consumesProc: 'delirium_active' },
  { id: 'drk_impalement', name: '관통형', type: SkillType.GCD, icon: `${ICON_BASE}003098.png`, cooldown: 2.5, consumesProc: 'delirium_active' },

  // -------------------------
  // 논글쿨 액티브 (oGCD Active)
  // -------------------------
  { 
    id: 'drk_flood_of_shadow', name: '칠흑의 파동', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, 
    icon: `${ICON_BASE}003085.png`, cooldown: 1, grantsBuff: DRK_BUFFS.DARKSIDE, sharedCooldownWith: 'drk_edge_of_shadow',
    optionalConsumesProc: 'dark_arts'
  },
  { 
    id: 'drk_edge_of_shadow', name: '칠흑검', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, 
    icon: `${ICON_BASE}003086.png`, cooldown: 1, grantsBuff: DRK_BUFFS.DARKSIDE, sharedCooldownWith: 'drk_flood_of_shadow',
    optionalConsumesProc: 'dark_arts'
  },
  
  { 
    id: 'drk_salted_earth', name: '감염 지대', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, 
    icon: `${ICON_BASE}003066.png`, cooldown: 90, grantsBuff: DRK_BUFFS.SALTED_EARTH, grantsProc: 'salt_and_darkness_ready', procStacks: 1 
  },
  { 
    id: 'drk_salt_and_darkness', name: '어둠 감염', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, 
    icon: `${ICON_BASE}003090.png`, cooldown: 1, consumesProc: 'salt_and_darkness_ready' 
  },
  
  { id: 'drk_abyssal_drain', name: '심연의 갈증', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}003064.png`, cooldown: 60, sharedCooldownWith: 'drk_carve_and_spit' },
  { id: 'drk_carve_and_spit', name: '난도질', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}003058.png`, cooldown: 60, sharedCooldownWith: 'drk_abyssal_drain' },
  
  { id: 'drk_shadow_stride', name: '그림자 걸음', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}003093.png`, cooldown: 30, maxCharges: 2 },
  
  { 
    id: 'drk_living_shadow', name: '환영 구현', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, 
    icon: `${ICON_BASE}003088.png`, cooldown: 120, grantsProc: 'scorn_ready', procStacks: 1 
  },
  { id: 'drk_shadowbringer', name: '칠흑 도래', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}003091.png`, cooldown: 60, maxCharges: 2, requiresBuff: 'drk_darkside' },

  // -------------------------
  // 논글쿨 버프 (oGCD Buff)
  // -------------------------
  { 
    id: 'drk_tbn', name: '흑야', type: SkillType.OGCD, subType: SkillSubType.BUFF, 
    icon: `${ICON_BASE}003081.png`, cooldown: 15, grantsBuff: DRK_BUFFS.BLACKEST_NIGHT, grantsProc: 'dark_arts', procStacks: 1
  },
  { 
    id: 'drk_delirium', name: '피의 열광', type: SkillType.OGCD, subType: SkillSubType.BUFF, 
    icon: `${ICON_BASE}003078.png`, cooldown: 60, grantsBuff: DRK_BUFFS.DELIRIUM, grantsProc: 'delirium_active', procStacks: 3 
  },
  
  { id: 'drk_shadow_vigil', name: '그림자 요새', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003094.png`, cooldown: 120, grantsBuff: DRK_BUFFS.SHADOW_VIGIL },
  { id: 'drk_dark_mind', name: '어두운 감정', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003076.png`, cooldown: 60, grantsBuff: DRK_BUFFS.DARK_MIND },
  { id: 'drk_missionary', name: '어둠의 포교자', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003087.png`, cooldown: 90, grantsBuff: DRK_BUFFS.DARK_MISSIONARY },
  { id: 'drk_oblation', name: '헌신', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003089.png`, cooldown: 60, maxCharges: 2, grantsBuff: DRK_BUFFS.OBLATION },
  { id: 'drk_living_dead', name: '산송장', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003077.png`, cooldown: 300, grantsBuff: DRK_BUFFS.LIVING_DEAD },
  { id: 'drk_grit', name: '불굴의 투지', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}003070.png`, cooldown: 2 },
];
