
import { Skill, SkillType, SkillSubType, BuffEffect } from '../types';

export const PLD_BUFFS: Record<string, BuffEffect> = {
  FIGHT_OR_FLIGHT: { id: 'pld_fof', name: '임전무퇴', duration: 20, damageMod: 1.25, color: '#f59e0b' },
  GORING_BLADE: { id: 'pld_goring', name: '홍염', duration: 15, damageMod: 1.0, color: '#ef4444' },
  SENTINEL: { id: 'pld_sentinel', name: '경계', duration: 15, damageMod: 1.0, color: '#3b82f6' },
  BULWARK: { id: 'pld_bulwark', name: '방벽', duration: 6, damageMod: 1.0, color: '#60a5fa' },
  COVER: { id: 'pld_cover', name: '감싸기', duration: 12, damageMod: 1.0, color: '#fbbf24' },
  HALLOWED_GROUND: { id: 'pld_hallowed', name: '천하무적', duration: 10, damageMod: 1.0, color: '#ffffff' },
  FIGHTING_SPIRIT: { id: 'pld_spirit', name: '방패 각성', duration: 10, damageMod: 1.0, color: '#93c5fd' },
  DIVINE_VEIL: { id: 'pld_veil', name: '신성한 보호막', duration: 30, damageMod: 1.0, color: '#ddd6fe' },
  INTERVENTION: { id: 'pld_intervention', name: '중재', duration: 8, damageMod: 1.0, color: '#fcd34d' },
  PASSAGE_OF_ARMS: { id: 'pld_passage', name: '결연한 수호자', duration: 18, damageMod: 1.0, color: '#a78bfa' },
  HOLY_SHELTRON: { id: 'pld_sheltron', name: '신성한 방벽', duration: 8, damageMod: 1.0, color: '#818cf8' },
  GUARDIAN: { id: 'pld_guardian', name: '극한 방어', duration: 15, damageMod: 1.0, color: '#4ade80' },
  CIRCLE_OF_DOOM: { id: 'pld_cod', name: '파멸의 진', duration: 15, damageMod: 1.0, color: '#b91c1c' },
};

export const PALADIN_SKILLS: Skill[] = [
  // 글쿨기
  { id: 'pld_fast_blade', name: '재빠른 검격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld1/64', cooldown: 2.5 },
  { id: 'pld_fof_gcd', name: '임전무퇴', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld2/64', cooldown: 2.5, grantsBuff: PLD_BUFFS.FIGHT_OR_FLIGHT },
  { id: 'pld_riot_blade', name: '폭도의 검격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld3/64', cooldown: 2.5 },
  { id: 'pld_total_eclipse', name: '개기식', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld4/64', cooldown: 2.5 },
  { id: 'pld_shield_bash', name: '방패 가격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld5/64', cooldown: 2.5 },
  { id: 'pld_shield_lob', name: '방패 던지기', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld6/64', cooldown: 2.5 },
  { id: 'pld_rage_of_halone', name: '할로네의 분노', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld7/64', cooldown: 2.5 },
  { id: 'pld_goring_blade', name: '홍염', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld8/64', cooldown: 2.5, grantsBuff: PLD_BUFFS.GORING_BLADE, grantsProc: 'divine_might', procStacks: 1 },
  { id: 'pld_piercing_thrust', name: '꿰뚫는 검격', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld9/64', cooldown: 2.5 },
  { id: 'pld_clemency', name: '관용', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld10/64', cooldown: 2.5, consumesProc: 'divine_might' },
  { id: 'pld_royal_authority', name: '제왕의 권위', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld11/64', cooldown: 2.5, grantsProc: 'divine_might', procStacks: 1 },
  { id: 'pld_holy_spirit', name: '성령의 권능', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld12/64', cooldown: 2.5, consumesProc: 'divine_might' },
  { id: 'pld_holy_circle', name: '신성한 원', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld13/64', cooldown: 2.5, consumesProc: 'divine_might' },
  { id: 'pld_atonement', name: '회한의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld14/64', cooldown: 2.5 },
  { id: 'pld_supplication', name: '염원의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld15/64', cooldown: 2.5 },
  { id: 'pld_sepulchre', name: '장송의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld16/64', cooldown: 2.5 },
  { id: 'pld_confiteor', name: '고백 기도', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld17/64', cooldown: 2.5 },
  { id: 'pld_blade_of_faith', name: '신의의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld18/64', cooldown: 2.5 },
  { id: 'pld_blade_of_truth', name: '진실의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld19/64', cooldown: 2.5 },
  { id: 'pld_blade_of_valor', name: '용맹의 검', type: SkillType.GCD, icon: 'https://picsum.photos/seed/pld20/64', cooldown: 2.5 },

  // 논글쿨 액티브
  { id: 'pld_circle_of_doom', name: '파멸의 진', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pld22/64', cooldown: 25, grantsBuff: PLD_BUFFS.CIRCLE_OF_DOOM },
  { id: 'pld_expiacion', name: '내면의 기개 (속죄)', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pld23/64', cooldown: 30 },
  { id: 'pld_intervene', name: '개입', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pld24/64', cooldown: 30, maxCharges: 2 },
  { id: 'pld_requiescat', name: '안식 기도 (제왕의 명령)', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pld25/64', cooldown: 60, grantsProc: 'divine_might', procStacks: 4 },
  { id: 'pld_blade_of_honor', name: '명예의 검', type: SkillType.OGCD, subType: SkillSubType.ACTIVE, icon: 'https://picsum.photos/seed/pld26/64', cooldown: 1 },

  // 논글쿨 버프
  { id: 'pld_spirits_within', name: '굳건한 의지', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld21/64', cooldown: 30 },
  { id: 'pld_sentinel', name: '경계', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld27/64', cooldown: 120, grantsBuff: PLD_BUFFS.SENTINEL },
  { id: 'pld_bulwark', name: '방벽', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld28/64', cooldown: 90, grantsBuff: PLD_BUFFS.BULWARK },
  { id: 'pld_cover', name: '감싸기', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld29/64', cooldown: 120, grantsBuff: PLD_BUFFS.COVER },
  { id: 'pld_hallowed_ground', name: '천하무적', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld30/64', cooldown: 420, grantsBuff: PLD_BUFFS.HALLOWED_GROUND },
  { id: 'pld_fighting_spirit', name: '방패 각성', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld31/64', cooldown: 60, grantsBuff: PLD_BUFFS.FIGHTING_SPIRIT },
  { id: 'pld_divine_veil', name: '신성한 보호막', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld32/64', cooldown: 90, grantsBuff: PLD_BUFFS.DIVINE_VEIL },
  { id: 'pld_intervention', name: '중재', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld33/64', cooldown: 10, grantsBuff: PLD_BUFFS.INTERVENTION },
  { id: 'pld_passage_of_arms', name: '결연한 수호자', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld34/64', cooldown: 120, grantsBuff: PLD_BUFFS.PASSAGE_OF_ARMS },
  { id: 'pld_holy_sheltron', name: '신성한 방벽', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld35/64', cooldown: 22, grantsBuff: PLD_BUFFS.HOLY_SHELTRON, maxCharges: 2 },
  { id: 'pld_guardian', name: '극한 방어', type: SkillType.OGCD, subType: SkillSubType.BUFF, icon: 'https://picsum.photos/seed/pld36/64', cooldown: 120, grantsBuff: PLD_BUFFS.GUARDIAN },
];
