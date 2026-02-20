
import React, { useState, useCallback, useMemo } from 'react';
import { JOBS, JOB_ROLES } from './constants';
import { ROLE_SKILLS } from './Skills/roleSkills';
import { SkillType, PlacedSkill, Skill } from './types';
import Timeline from './components/Timeline';
import SkillPalette from './components/SkillPalette';

const App: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string>('DRK');
  const [placedSkills, setPlacedSkills] = useState<PlacedSkill[]>([]);
  const [isOpenerMode, setIsOpenerMode] = useState(false);
  const [pendingSkill, setPendingSkill] = useState<Skill | null>(null);
  const [openerTime, setOpenerTime] = useState(0);

  const currentJob = useMemo(() => JOBS.find(j => j.id === selectedJobId) || JOBS[0], [selectedJobId]);
  
  const currentSkills = useMemo(() => {
    const jobSkills = currentJob.skills;
    const commonSkills = ROLE_SKILLS[currentJob.role] || [];
    return [...jobSkills, ...commonSkills];
  }, [currentJob]);

  const currentTimeCursor = useMemo(() => {
    if (placedSkills.length === 0) return 0;
    return Math.max(...placedSkills.map(ps => ps.time));
  }, [placedSkills]);

  const getRotationStateAt = useCallback((time: number, skills: PlacedSkill[]) => {
    const sorted = [...skills].sort((a, b) => a.time - b.time).filter(ps => ps.time <= time);
    const procStacks: Record<string, number> = {};
    const resources: Record<string, number> = {};
    const activeBuffs: Map<string, number> = new Map();

    sorted.forEach(ps => {
      const skill = currentSkills.find(s => s.id === ps.skillId);
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
      
      // 생명력 쇄도(life_surge_ready) 자동 소모 로직
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
  }, [currentSkills]);

  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (placedSkills.length > 0) {
      if (!window.confirm('직업을 변경하면 현재 배치된 스킬이 모두 삭제됩니다. 계속하시겠습니까?')) {
        return;
      }
    }
    setSelectedJobId(e.target.value);
    setPlacedSkills([]);
    setIsOpenerMode(false);
  };

  const calculateAvailableCharges = (skill: Skill, usages: PlacedSkill[], atTime: number) => {
    const max = skill.maxCharges || 1;
    if (skill.cooldown <= 2.5) return max;

    const skillUsages = [...usages].sort((a, b) => a.time - b.time);
    let recoveryTimes: number[] = [];
    
    skillUsages.forEach((u, i) => {
      const prevRecovery = i > 0 ? recoveryTimes[i - 1] : -Infinity;
      const startOfRecovery = Math.max(u.time, prevRecovery);
      recoveryTimes.push(startOfRecovery + skill.cooldown);
    });

    const usedButNotRecovered = recoveryTimes.filter(rt => rt > atTime).length;
    return Math.max(0, max - usedButNotRecovered);
  };

  const handleAddSkill = useCallback((skillId: string) => {
    const skill = currentSkills.find(s => s.id === skillId);
    if (!skill) return;

    if (isOpenerMode) {
      setPendingSkill(skill);
      setOpenerTime(0);
      return;
    }

    setPlacedSkills(prev => {
      const sorted = [...prev].sort((a, b) => a.time - b.time);
      let nextTime = 0;

      const lastGCD = [...sorted].reverse().find(ps => {
        const s = currentSkills.find(sk => sk.id === ps.skillId);
        return s?.type === SkillType.GCD;
      });

      if (skill.type === SkillType.GCD) {
        nextTime = lastGCD ? lastGCD.time + 2.5 : 0;
      } else {
        let anchorTime = lastGCD ? lastGCD.time : 0;
        let found = false;
        while (!found) {
          const wovenInWindow = sorted.filter(ps => {
            const s = currentSkills.find(sk => sk.id === ps.skillId);
            return (s?.type === SkillType.OGCD || s?.type === SkillType.ROLE) && 
                   ps.time >= anchorTime && 
                   ps.time < anchorTime + 2.5;
          }).length;

          if (wovenInWindow < 2) {
            nextTime = anchorTime + (wovenInWindow + 1) * 0.75;
            found = true;
          } else {
            anchorTime += 2.5;
          }
        }
      }

      const state = getRotationStateAt(nextTime, sorted);
      if (skill.consumesProc && (state.procStacks[skill.consumesProc] || 0) <= 0) {
        alert(`${skill.name}을 사용하기 위한 프록(Proc)이 없습니다.`);
        return prev;
      }
      if (skill.requiresBuff && (state.activeBuffs.get(skill.requiresBuff) || 0) <= nextTime) {
        alert(`${skill.name}을 사용하기 위한 버프 상태가 아닙니다.`);
        return prev;
      }
      if (skill.resourceType && skill.resourceChange && skill.resourceChange < 0) {
        const currentRes = state.resources[skill.resourceType] || 0;
        if (currentRes < Math.abs(skill.resourceChange)) {
          alert(`${skill.name}을 사용하기 위한 자원(${skill.resourceType})이 부족합니다.`);
          return prev;
        }
      }

      // Shared Cooldown Logic
      const skillUsagesBefore = sorted.filter(ps => 
        ps.skillId === skillId || (skill.sharedCooldownWith && ps.skillId === skill.sharedCooldownWith)
      );
      
      const available = calculateAvailableCharges(skill, skillUsagesBefore, nextTime);
      
      if (available <= 0) {
        alert(`${skill.name}의 사용 가능한 누적 횟수가 부족하거나 재사용 대기시간 중입니다.`);
        return prev;
      }

      return [...prev, {
        instanceId: Math.random().toString(36).substr(2, 9),
        skillId,
        time: nextTime
      }];
    });
  }, [isOpenerMode, currentSkills, getRotationStateAt]);

  const confirmOpenerSkill = () => {
    if (!pendingSkill) return;
    setPlacedSkills(prev => [...prev, {
      instanceId: Math.random().toString(36).substr(2, 9),
      skillId: pendingSkill.id,
      time: openerTime
    }]);
    setPendingSkill(null);
  };

  const handleRemoveSkill = useCallback((instanceId: string) => {
    setPlacedSkills(prev => prev.filter(ps => ps.instanceId !== instanceId));
  }, []);

  const handleClear = () => {
    if (window.confirm("모든 사이클을 초기화하시겠습니까?")) {
      setPlacedSkills([]);
      setIsOpenerMode(false);
      setPendingSkill(null);
      setOpenerTime(0);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <header className="z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-sm font-black tracking-tight leading-none text-indigo-400">FFXIV Rotation Simulator</h1>
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">파이널판타지 XIV 딜사이클 시뮬레이터</p>
            </div>
          </div>
          <div className="h-6 w-px bg-zinc-700/50"></div>
          <div className="relative group">
            <select 
              value={selectedJobId} 
              onChange={handleJobChange}
              className="appearance-none bg-zinc-800 border border-zinc-700 text-xs font-black text-zinc-200 rounded py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer hover:bg-zinc-700 transition-colors"
            >
              <optgroup label="방어 역할 (Tank)">
                {JOBS.filter(j => j.role === 'Tank').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </optgroup>
              <optgroup label="근거리 공격 역할 (Melee)">
                {JOBS.filter(j => j.role === 'Melee').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </optgroup>
              <optgroup label="원거리 물리 공격 역할 (Phys Ranged)">
                {JOBS.filter(j => j.role === 'Phys Ranged').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </optgroup>
              <optgroup label="원거리 마법 공격 역할 (Magic Ranged)">
                {JOBS.filter(j => j.role === 'Magic Ranged').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </optgroup>
              <optgroup label="회복 역할 (Healer)">
                {JOBS.filter(j => j.role === 'Healer').map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </optgroup>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setIsOpenerMode(!isOpenerMode);
              setPendingSkill(null);
            }} 
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${isOpenerMode ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40 scale-105' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
            오프너 모드
          </button>
          <button onClick={handleClear} className="p-2 text-xs font-medium text-zinc-500 hover:text-red-500 transition-colors" title="초기화">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col min-h-0 bg-zinc-950">
        <div className="flex-1 overflow-hidden">
          <Timeline placedSkills={placedSkills} onRemove={handleRemoveSkill} currentSkills={currentSkills} />
        </div>

        {pendingSkill && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4 mb-8">
                <img src={pendingSkill.icon} className="w-14 h-14 rounded-lg border-2 border-zinc-700 shadow-2xl" />
                <div>
                  <h3 className="text-base font-black text-white">{pendingSkill.name}</h3>
                  <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest">오프너 시전 시점 (초)</p>
                </div>
              </div>
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-mono font-bold text-zinc-600">-10s</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-mono font-black text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">{openerTime}s</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-600">0s</span>
                </div>
                <input 
                  type="range" min="-10" max="0" step="1" value={openerTime}
                  onChange={(e) => setOpenerTime(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPendingSkill(null)} className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-black transition-colors">취소</button>
                <button onClick={confirmOpenerSkill} className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-black shadow-lg shadow-amber-900/40 transition-all active:scale-95">시전 배치</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="z-50 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-md p-3 shrink-0">
        <SkillPalette skills={currentSkills} onAdd={handleAddSkill} placedSkills={placedSkills} currentTime={currentTimeCursor} />
      </footer>
    </div>
  );
};

export default App;
