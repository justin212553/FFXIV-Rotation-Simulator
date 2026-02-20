
export enum SkillType {
  GCD = 'GCD',
  OGCD = 'oGCD',
  ROLE = 'ROLE'
}

export enum SkillSubType {
  ACTIVE = 'Active',
  BUFF = 'Buff'
}

export interface BuffEffect {
  id: string;
  name: string;
  duration: number; // in seconds
  damageMod: number; // e.g., 1.1 for 10% increase
  color: string;
  isDurationAddable?: boolean; // If true, durations stack additively
  maxDuration?: number; // Maximum duration cap for addable buffs
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  subType?: SkillSubType;
  icon: string;
  cooldown: number; 
  maxCharges?: number; // How many times the skill can be used consecutively
  grantsBuff?: BuffEffect;
  requiresBuff?: string; // Buff ID required to use this skill
  grantsEye?: number;    
  consumesEye?: number;  
  
  // Resource Logic
  resourceType?: string;   
  resourceChange?: number; 
  
  // Proc Logic
  grantsProc?: string;   
  consumesProc?: string; 
  optionalConsumesProc?: string; // Consumes proc if available, but doesn't require it
  procStacks?: number;   

  description?: string;
  
  // Visual Grouping
  group?: string;
  
  // Cooldown Logic
  sharedCooldownWith?: string; // ID of another skill that shares this cooldown
}

export interface PlacedSkill {
  instanceId: string;
  skillId: string;
  time: number; // Start time in seconds
}

export interface RotationState {
  placedSkills: PlacedSkill[];
}
