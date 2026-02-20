
import { Skill, SkillType, SkillSubType, BuffEffect } from '../types';

export const ROLE_BUFFS: Record<string, BuffEffect> = {
  RAMPART: { id: 'role_rampart_buff', name: '철벽 방어', duration: 20, damageMod: 1.0, color: '#f87171' },
  REPRISAL: { id: 'role_reprisal_buff', name: '앙갚음', duration: 15, damageMod: 1.0, color: '#b91c1c' },
  ARMS_LENGTH: { id: 'role_arms_length_buff', name: '거리 유지', duration: 6, damageMod: 1.0, color: '#64748b' },
};

const ROLE_ICON_BASE = 'https://image.ff14.co.kr/guide/resources/images/jobicon/dragoon/pve/';
const TANK = 'https://image.ff14.co.kr/guide/resources/images/jobicon/darkknight/pve/';
const MELEE = 'https://image.ff14.co.kr/guide/resources/images/jobicon/dragoon/pve/';

export const ROLE_SKILLS: Record<string, Skill[]> = {
  Tank: [
    { id: 'role_rampart', name: '철벽 방어', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${TANK}000801.png`, cooldown: 90, grantsBuff: ROLE_BUFFS.RAMPART },
    { id: 'role_low_blow', name: '비열한 기습', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${TANK}000802.png`, cooldown: 25 },
    { id: 'role_provoke', name: '도발', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${TANK}000803.png`, cooldown: 30 },
    { id: 'role_interject', name: '말참견', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${TANK}000808.png`, cooldown: 30 },
    { id: 'role_reprisal', name: '앙갚음', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${TANK}000806.png`, cooldown: 60, grantsBuff: ROLE_BUFFS.REPRISAL },
    { id: 'role_arms_length_t', name: '거리 유지', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${TANK}000822.png`, cooldown: 120, grantsBuff: ROLE_BUFFS.ARMS_LENGTH },
    { id: 'role_shirk', name: '기피', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${TANK}000810.png`, cooldown: 120 },
  ],
  Healer: [
    { id: 'role_repose', name: '휴면', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000815.png`, cooldown: 0.1 },
    { id: 'role_esuna', name: '에스나', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000814.png`, cooldown: 0.1 },
    { id: 'role_swiftcast_h', name: '신속한 마법', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000811.png`, cooldown: 60 },
    { id: 'role_lucid_h', name: '자각몽', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000816.png`, cooldown: 60 },
    { id: 'role_surecast_h', name: '견고한 마법', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000817.png`, cooldown: 120 },
    { id: 'role_rescue', name: '구출', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000818.png`, cooldown: 120 },
  ],
  Melee: [
    { id: 'role_second_wind_m', name: '내단', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${MELEE}000821.png`, cooldown: 120 },
    { id: 'role_leg_sweep', name: '다리 쳐내기', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${MELEE}000824.png`, cooldown: 40 },
    { id: 'role_bloodbath', name: '피의 갈증', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${MELEE}000823.png`, cooldown: 90 },
    { id: 'role_feint', name: '견제', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${MELEE}000828.png`, cooldown: 90 },
    { id: 'role_arms_length_m', name: '거리 유지', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${MELEE}000822.png`, cooldown: 120, grantsBuff: ROLE_BUFFS.ARMS_LENGTH },
    { id: 'role_true_north', name: '진북', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${MELEE}000830.png`, cooldown: 45, maxCharges: 2 },
  ],
  'Phys Ranged': [
    { id: 'role_leg_graze', name: '다리 쏘기', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000821.png`, cooldown: 30 },
    { id: 'role_second_wind_p', name: '내단', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000806.png`, cooldown: 120 },
    { id: 'role_foot_graze', name: '발 쏘기', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000822.png`, cooldown: 30 },
    { id: 'role_peloton', name: '단체 질주', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000823.png`, cooldown: 5 },
    { id: 'role_head_graze', name: '머리 쏘기', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000824.png`, cooldown: 30 },
    { id: 'role_arms_length_p', name: '거리 유지', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000822.png`, cooldown: 120, grantsBuff: ROLE_BUFFS.ARMS_LENGTH },
  ],
  'Magic Ranged': [
    { id: 'role_addle', name: '정신 교란', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000819.png`, cooldown: 90 },
    { id: 'role_sleep', name: '슬리플', type: SkillType.ROLE, subType: SkillSubType.ACTIVE, icon: `${ROLE_ICON_BASE}000820.png`, cooldown: 0.1 },
    { id: 'role_swiftcast_ma', name: '신속한 마법', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000811.png`, cooldown: 60 },
    { id: 'role_lucid_ma', name: '자각몽', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000816.png`, cooldown: 60 },
    { id: 'role_surecast_ma', name: '견고한 마법', type: SkillType.ROLE, subType: SkillSubType.BUFF, icon: `${ROLE_ICON_BASE}000817.png`, cooldown: 120 },
  ]
};
