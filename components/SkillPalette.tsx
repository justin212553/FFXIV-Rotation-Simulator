
import React, { useMemo } from 'react';
import { Skill, SkillType, SkillSubType, PlacedSkill } from '../types';

interface SkillPaletteProps {
  skills: Skill[];
  onAdd: (id: string) => void;
  placedSkills: PlacedSkill[];
  currentTime: number;
}

const SkillPalette: React.FC<SkillPaletteProps> = ({ skills, onAdd, placedSkills, currentTime }) => {
  const gcds = skills.filter(s => s.type === SkillType.GCD);
  const jobActives = skills.filter(s => s.type === SkillType.OGCD && s.subType === SkillSubType.ACTIVE);
  const jobBuffs = skills.filter(s => s.type === SkillType.OGCD && s.subType === SkillSubType.BUFF);
  const roleSkills = skills.filter(s => s.type === SkillType.ROLE);

  // Grouping functionality
  const groupedSkills = useMemo(() => {
     // Helper to group adjacent skills with the same 'group' ID
     const groupSkillList = (list: Skill[]) => {
       const groups: { id: string; skills: Skill[]; isGroup: boolean }[] = [];
       let currentGroup: Skill[] = [];
       let lastGroupId: string | undefined = undefined;

       list.forEach(skill => {
         if (skill.group) {
           if (skill.group === lastGroupId) {
             currentGroup.push(skill);
           } else {
             if (currentGroup.length > 0) {
               groups.push({ id: lastGroupId!, skills: [...currentGroup], isGroup: true });
             }
             currentGroup = [skill];
             lastGroupId = skill.group;
           }
         } else {
           if (currentGroup.length > 0) {
             groups.push({ id: lastGroupId!, skills: [...currentGroup], isGroup: true });
             currentGroup = [];
             lastGroupId = undefined;
           }
           groups.push({ id: skill.id, skills: [skill], isGroup: false });
         }
       });

       if (currentGroup.length > 0) {
         groups.push({ id: lastGroupId!, skills: [...currentGroup], isGroup: true });
       }
       return groups;
     };

     return {
       gcds: groupSkillList(gcds),
       jobActives: groupSkillList(jobActives),
       jobBuffs: groupSkillList(jobBuffs),
       roleSkills: groupSkillList(roleSkills),
     };
  }, [skills]);


  const currentState = useMemo(() => {
    const sorted = [...placedSkills].sort((a, b) => a.time - b.time).filter(ps => ps.time <= currentTime);
    const procStacks: Record<string, number> = {};
    const resources: Record<string, number> = {};
    const activeBuffs: Map<string, number> = new Map();

    sorted.forEach(ps => {
      const skill = skills.find(s => s.id === ps.skillId);
      if (!skill) return;

      if (skill.resourceType) {
        resources[skill.resourceType] = (resources[skill.resourceType] || 0) + (skill.resourceChange || 0);
      }
      if (skill.consumesProc) {
        procStacks[skill.consumesProc] = Math.max(0, (procStacks[skill.consumesProc] || 0) - 1);
      }
      if (skill.optionalConsumesProc) {
        if ((procStacks[skill.optionalConsumesProc] || 0) > 0) {
          procStacks[skill.optionalConsumesProc] = procStacks[skill.optionalConsumesProc] - 1;
        }
      }
      
      if (skill.type === SkillType.GCD && (procStacks['life_surge_ready'] || 0) > 0) {
        procStacks['life_surge_ready'] = procStacks['life_surge_ready'] - 1;
      }

      if (skill.grantsProc) {
        procStacks[skill.grantsProc] = (procStacks[skill.grantsProc] || 0) + (skill.procStacks || 1);
      }
      if (skill.grantsBuff) {
        const buff = skill.grantsBuff;
        const existingExpiry = activeBuffs.get(buff.id) || ps.time;
        const remaining = Math.max(0, existingExpiry - ps.time);
        let newDuration = (buff.isDurationAddable ? remaining : 0) + buff.duration;
        if (buff.maxDuration) {
          newDuration = Math.min(newDuration, buff.maxDuration);
        }
        activeBuffs.set(buff.id, ps.time + newDuration);
      }
    });

    return { procStacks, resources, activeBuffs };
  }, [placedSkills, skills, currentTime]);

  const getCooldownInfo = (skill: Skill) => {
    const max = skill.maxCharges || 1;
    if (skill.cooldown <= 2.5) return { available: max, nextRecovery: 0, onCooldown: false };
    
    // Filter usages including shared cooldowns
    const skillUsages = [...placedSkills]
      .filter(ps => ps.skillId === skill.id || (skill.sharedCooldownWith && ps.skillId === skill.sharedCooldownWith))
      .sort((a, b) => a.time - b.time);
    
    let recoveryTimes: number[] = [];
    skillUsages.forEach((u, i) => {
      const prevRecovery = i > 0 ? recoveryTimes[i - 1] : -Infinity;
      const startOfRecovery = Math.max(u.time, prevRecovery);
      recoveryTimes.push(startOfRecovery + skill.cooldown);
    });

    const pendingRecoveries = recoveryTimes.filter(rt => rt > currentTime);
    const available = max - pendingRecoveries.length;
    const nextRecovery = pendingRecoveries.length > 0 ? Math.max(0, Math.min(...pendingRecoveries) - currentTime) : 0;
    
    return {
      available,
      nextRecovery,
      onCooldown: available <= 0
    };
  };

  const SkillButton: React.FC<{ skill: Skill }> = ({ skill }) => {
    const { available, nextRecovery, onCooldown } = getCooldownInfo(skill);
    const max = skill.maxCharges || 1;
    const isStackable = max > 1;
    
    let requirementMet = true;
    if (skill.consumesProc && (currentState.procStacks[skill.consumesProc] || 0) <= 0) requirementMet = false;
    if (skill.requiresBuff && (currentState.activeBuffs.get(skill.requiresBuff) || 0) <= currentTime) requirementMet = false;
    if (skill.resourceType && skill.resourceChange && skill.resourceChange < 0) {
      const currentRes = currentState.resources[skill.resourceType] || 0;
      if (currentRes < Math.abs(skill.resourceChange)) requirementMet = false;
    }

    const isLocked = !requirementMet;
    const isDisabled = onCooldown || isLocked;
    
    return (
      <div className="flex flex-col items-center gap-1 w-[52px] group shrink-0 relative">
        <button 
          onClick={() => !isDisabled && onAdd(skill.id)} 
          disabled={isDisabled}
          className={`active:scale-95 transition-all duration-200 relative ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <img 
            src={skill.icon} 
            className={`w-8 h-8 rounded border-2 ${isDisabled ? 'border-zinc-800 grayscale opacity-40' : 'border-zinc-700 group-hover:border-indigo-400 group-hover:shadow-[0_0_12px_rgba(129,140,248,0.2)]'} bg-zinc-900 shadow-lg`} 
            alt={skill.name} 
          />
          
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <i className="fa-solid fa-lock text-zinc-500 text-[8px] drop-shadow-lg"></i>
            </div>
          )}

          {isStackable && !isLocked && (
            <div className="absolute -top-1 -right-1 bg-zinc-800 border border-zinc-700 rounded-sm px-1 flex items-center justify-center min-w-[12px] h-[12px] z-10 shadow-lg">
              <span className={`text-[7px] font-black ${available === 0 ? 'text-red-400' : 'text-zinc-100'}`}>
                {available}
              </span>
            </div>
          )}

          {nextRecovery > 0 && !isLocked && (
            <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center pointer-events-none">
              <span className="text-[9px] font-mono font-black text-white drop-shadow-md">
                {nextRecovery.toFixed(1)}
              </span>
            </div>
          )}
        </button>

        <div className="w-full flex flex-col items-center overflow-hidden">
          <span 
            className={`text-[8px] font-bold text-center leading-tight transition-colors truncate w-full px-0.5 ${isDisabled ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-indigo-300'}`}
            title={skill.name}
          >
            {skill.name}
          </span>
          {nextRecovery > 0 && !isLocked && (
            <span className="text-[7px] text-indigo-400 font-mono font-black mt-0.5">
              {nextRecovery.toFixed(1)}s
            </span>
          )}
        </div>
      </div>
    );
  };

  const CategoryRow = ({ label, subLabel, groups, accentColor }: { label: string, subLabel: string, groups: { id: string, skills: Skill[], isGroup: boolean }[], accentColor: string }) => (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 py-2 border-b border-zinc-800/40 last:border-0 group/row">
      <div className="flex items-center gap-3 w-full md:w-40 shrink-0 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-zinc-200 uppercase tracking-wide leading-none">{label}</span>
          <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">{subLabel}</span>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-hidden custom-scrollbar py-2 px-1">
          {groups.length > 0 ? groups.map(group => (
            group.isGroup ? (
              <div key={group.id} className="flex gap-1.5 p-1 border border-zinc-700/50 rounded-lg bg-zinc-800/20 backdrop-blur-sm">
                {group.skills.map(skill => <SkillButton key={skill.id} skill={skill} />)}
              </div>
            ) : (
              <SkillButton key={group.skills[0].id} skill={group.skills[0]} />
            )
          )) : (
            <div className="h-8 flex items-center px-4">
              <span className="text-[10px] text-zinc-700 italic font-bold">표시할 기술이 없습니다</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-2 py-0.5 bg-zinc-900/40 rounded-xl border border-zinc-800/60 overflow-hidden shadow-inner">
      <div className="max-h-[45vh] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col">
          <CategoryRow label="GCD" subLabel="Global Cooldown" groups={groupedSkills.gcds} accentColor="text-indigo-400" />
          <CategoryRow label="Job Active" subLabel="Ability" groups={groupedSkills.jobActives} accentColor="text-amber-400" />
          <CategoryRow label="Job Buff" subLabel="Cooldown" groups={groupedSkills.jobBuffs} accentColor="text-emerald-400" />
          <CategoryRow label="Role Skills" subLabel="Common" groups={groupedSkills.roleSkills} accentColor="text-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default SkillPalette;
