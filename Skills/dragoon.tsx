import { Skill, SkillType, SkillSubType } from '../types';

export const BUFFS = {
  HEAVENS_BUFF: { id: 'heavens_buff', name: '용창', duration: 30, damageMod: 1.1, color: '#00A86B' },
  CHAOTIC_BUFF: { id: 'chaotic_buff', name: '꽃잎 만발', duration: 24, damageMod: 1.1, color: '#ab47BC' },
  GEIRSKOGUL_BUFF: { id: 'geirskogul_buff', name: '붉은 용혈', duration: 20, damageMod: 1.15, color: '#00FFFF' },
  LANCE_CHARGE: { id: 'lance_charge', name: '돌격하는 창', duration: 20, damageMod: 1.1, color: '#ff5555' },
  BATTLE_LITANY: { id: 'battle_litany', name: '전투 기도', duration: 20, damageMod: 1.1, color: '#FFFFFF' }
};

const ICON_BASE = 'https://image.ff14.co.kr/guide/resources/images/jobicon/dragoon/pve/';

export const DRAGOON_SKILLS: Skill[] = [
  // 글쿨기
  { id: 'true_thrust', name: '직선 찌르기', type: SkillType.GCD, icon: `${ICON_BASE}000310.png`, cooldown: 2.5 },
  { id: 'raiden_thrust', name: '용안뇌전', type: SkillType.GCD, icon: `${ICON_BASE}002592.png`, cooldown: 2.5, resourceType: 'Dragon Gauge', resourceChange: 1, consumesProc: 'raiden_ready' },
  { id: 'vorpal_thrust', name: '전진 찌르기', type: SkillType.GCD, icon: `${ICON_BASE}002076.png`, cooldown: 2.5 },
  { id: 'full_thrust', name: '하늘 찌르기', type: SkillType.GCD, icon: `${ICON_BASE}002595.png`, cooldown: 2.5 },
  { id: 'fang_and_claw', name: '용의 발톱', type: SkillType.GCD, icon: `${ICON_BASE}002582.png`, cooldown: 2.5 },
  { id: 'drg_drakesbane', name: '운증용변', type: SkillType.GCD, icon: `${ICON_BASE}002599.png`, cooldown: 2.5, grantsProc: 'raiden_ready', procStacks: 1 },
  { id: 'disembowel', name: '나선 가르기', type: SkillType.GCD, icon: `${ICON_BASE}002077.png`, cooldown: 2.5, grantsBuff: BUFFS.HEAVENS_BUFF },
  { id: 'chaos_thrust', name: '꽃잎 만발', type: SkillType.GCD, icon: `${ICON_BASE}002596.png`, cooldown: 2.5, grantsBuff: BUFFS.CHAOTIC_BUFF },
  { id: 'wheeling_thrust', name: '용의 꼬리', type: SkillType.GCD, icon: `${ICON_BASE}002584.png`, cooldown: 2.5 },
  { id: 'drg_doom_spike', name: '악몽의 쐐기', type: SkillType.GCD, icon: `${ICON_BASE}000306.png`, cooldown: 2.5 },
  { id: 'drg_sonic_thrust', name: '음속 찌르기', type: SkillType.GCD, icon: `${ICON_BASE}002586.png`, cooldown: 2.5, grantsBuff: BUFFS.HEAVENS_BUFF },
  { id: 'drg_coerthan_torment', name: '커르다스의 고통', type: SkillType.GCD, icon: `${ICON_BASE}002590.png`, cooldown: 2.5, grantsProc: 'raiden_ready', procStacks: 1 },
  { id: 'draconian_fury', name: '용안창궁', type: SkillType.GCD, icon: `${ICON_BASE}002594.png`, cooldown: 2.5, resourceType: 'Dragon Gauge', resourceChange: 1, consumesProc: 'raiden_ready' },
  { id: 'piercing_talon', name: '꿰뚫는 발톱', type: SkillType.GCD, icon: `${ICON_BASE}000315.png`, cooldown: 2.5 },

  // 논글쿨 액티브
  { id: 'high_jump', name: '하이 점프', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002591.png`, cooldown: 30, grantsProc: 'mirage_ready', procStacks: 1 },
  { id: 'mirage_dive', name: '환영 강타', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002588.png`, cooldown: 1, consumesProc: 'mirage_ready' },
  { id: 'geirskogul', name: '게이르스코굴', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002583.png`, cooldown: 60, grantsBuff: BUFFS.GEIRSKOGUL_BUFF, grantsProc: 'nastrond_ready', procStacks: 1 },
  { id: 'drg_nastrond', name: '나스트론드', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002589.png`, cooldown: 2, consumesProc: 'nastrond_ready' },
  { id: 'stardiver', name: '천체 강하', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002593.png`, cooldown: 30, requiresBuff: 'geirskogul_buff', grantsProc: 'starcross_ready', procStacks: 1 },
  { id: 'drg_starcross', name: '천체 관통', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002078.png`, cooldown: 1, consumesProc: 'starcross_ready' },
  { id: 'dragonfire_dive', name: '화룡 강타', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002578.png`, cooldown: 120, grantsProc: 'rise_of_dragon', procStacks: 1 },
  { id: 'drg_rise_of_dragon', name: '용의 비상', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002075.png`, cooldown: 1, consumesProc: 'rise_of_dragon' },
  { id: 'wyrmwind_thrust', name: '천룡점정', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002597.png`, cooldown: 10, resourceType: 'Dragon Gauge', resourceChange: -2 },
  { id: 'drg_wyrmglide', name: '비룡 활공', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002598.png`, cooldown: 60, maxCharges: 2 },
  { id: 'drg_elusivejump', name: '교묘한 점프', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: `${ICON_BASE}002577.png`, cooldown: 30 },

  // 논글쿨 버프
  { id: 'life_surge', name: '생명력 쇄도', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}000304.png`, cooldown: 40, grantsProc: 'life_surge_ready', procStacks: 1 },
  { id: 'lance_charge', name: '돌격하는 창', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}000309.png`, cooldown: 60, grantsBuff: BUFFS.LANCE_CHARGE },
  { id: 'battle_litany', name: '전투 기도', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: `${ICON_BASE}002585.png`, cooldown: 120, grantsBuff: BUFFS.BATTLE_LITANY }
];

export interface JobDefinition { id: string; name: string; role: string; skills: Skill[]; }

