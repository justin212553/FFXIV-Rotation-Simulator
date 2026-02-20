
import React, { useMemo, useRef } from 'react';
import { PlacedSkill, SkillType, BuffEffect, Skill } from '../types';

interface TimelineProps {
  placedSkills: PlacedSkill[];
  onRemove: (instanceId: string) => void;
  currentSkills: Skill[];
}

const PIXELS_PER_SECOND = 40; 
const START_TIME = 0; 
const MIN_DISPLAY_TIME = 15; 
const TIMELINE_PADDING_LEFT = 60; 

const Timeline: React.FC<TimelineProps> = ({ placedSkills, onRemove, currentSkills }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dynamicEndTime = useMemo(() => {
    const rotationSkills = placedSkills.filter(ps => ps.time >= 0);
    const maxSkillTime = rotationSkills.reduce((max, ps) => Math.max(max, ps.time), 0);
    return Math.max(MIN_DISPLAY_TIME, maxSkillTime + 10);
  }, [placedSkills]);

  const sortedAll = useMemo(() => [...placedSkills].sort((a, b) => a.time - b.time), [placedSkills]);
  
  const openerSkills = useMemo(() => sortedAll.filter(ps => ps.time < 0), [sortedAll]);
  const rotationSkills = useMemo(() => sortedAll.filter(ps => ps.time >= 0), [sortedAll]);

  // Combined State Calculator
  const computedState = useMemo(() => {
    const skillData: Record<string, { resource: number; procStacks: number }> = {};
    const resourceState: Record<string, number> = {};
    const procState: Record<string, number> = {};
    const activeBuffs: Map<string, number> = new Map();

    sortedAll.forEach(ps => {
      const skill = currentSkills.find(s => s.id === ps.skillId);
      if (!skill) return;

      if (skill.resourceType) {
        const currentRes = resourceState[skill.resourceType] || 0;
        resourceState[skill.resourceType] = Math.max(0, currentRes + (skill.resourceChange || 0));
      }

      if (skill.consumesProc) {
        const stacks = procState[skill.consumesProc] || 0;
        if (stacks > 0) {
          skillData[ps.instanceId] = { ...(skillData[ps.instanceId] || {}), procStacks: stacks } as any;
          procState[skill.consumesProc] = stacks - 1;
        }
      }

      if (skill.optionalConsumesProc) {
        const stacks = procState[skill.optionalConsumesProc] || 0;
        if (stacks > 0) {
          skillData[ps.instanceId] = { ...(skillData[ps.instanceId] || {}), procStacks: stacks } as any;
          procState[skill.optionalConsumesProc] = stacks - 1;
        }
      }

      if (skill.type === SkillType.GCD && (procState['life_surge_ready'] || 0) > 0) {
        if (!skillData[ps.instanceId]) {
           skillData[ps.instanceId] = { procStacks: procState['life_surge_ready'] } as any;
        }
        procState['life_surge_ready'] = procState['life_surge_ready'] - 1;
      }

      if (skill.grantsProc) {
        procState[skill.grantsProc] = (procState[skill.grantsProc] || 0) + (skill.procStacks || 1);
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

      const resVal = skill.resourceType ? resourceState[skill.resourceType] : undefined;
      skillData[ps.instanceId] = {
        ...skillData[ps.instanceId],
        resource: resVal as number,
      } as any;
    });

    return skillData;
  }, [sortedAll, currentSkills]);

  // Buff Intervals (Merged Segments)
  const buffStatus = useMemo(() => {
    const ranges: Map<string, { start: number, end: number, config: BuffEffect }[]> = new Map();
    const applications: { time: number, buff: BuffEffect, sourceId: string }[] = [];
    const activeBuffs = new Map<string, number>();

    sortedAll.forEach(ps => {
      const skill = currentSkills.find(s => s.id === ps.skillId);
      if (!skill?.grantsBuff) return;
      const buff = skill.grantsBuff;
      
      applications.push({ time: ps.time, buff, sourceId: ps.instanceId });

      const currentExpiry = activeBuffs.get(buff.id) || -1;
      
      if (currentExpiry < ps.time || currentExpiry == -1) {
        // Start new segment
        const list = ranges.get(buff.id) || [];
        let newDuration = buff.duration;
        if (buff.maxDuration) newDuration = Math.min(newDuration, buff.maxDuration);
        
        const end = ps.time + newDuration;
        activeBuffs.set(buff.id, end);
        list.push({ start: ps.time, end, config: buff });
        ranges.set(buff.id, list);
      } else {
        // Extend existing segment
        const list = ranges.get(buff.id)!;
        const currentSegment = list[list.length - 1];
        
        const remaining = currentExpiry - ps.time;
        let newDuration = (buff.isDurationAddable ? remaining : 0) + buff.duration;
        if (buff.maxDuration) newDuration = Math.min(newDuration, buff.maxDuration);
        
        const newEnd = ps.time + newDuration;
        currentSegment.end = newEnd;
        activeBuffs.set(buff.id, newEnd);
      }
    });

    return { ranges, applications };
  }, [sortedAll, currentSkills]);

  const activeLegendBuffs = useMemo(() => {
    const buffs = new Map<string, BuffEffect>();
    currentSkills.forEach(s => {
      if (s.grantsBuff && placedSkills.some(ps => ps.skillId === s.id)) {
        buffs.set(s.grantsBuff.id, s.grantsBuff);
      }
    });
    return Array.from(buffs.values());
  }, [placedSkills, currentSkills]);

  const dotPoints = useMemo(() => {
    const groups: Record<number, { config: BuffEffect; type: 'start' | 'end'; id: string }[]> = {};
    
    // Start Dots (from applications)
    buffStatus.applications.forEach((app) => {
      if (app.time >= 0) {
        if (!groups[app.time]) groups[app.time] = [];
        groups[app.time].push({ config: app.buff, type: 'start', id: `${app.sourceId}-start` });
      }
    });

    // End Dots (from merged segments)
    buffStatus.ranges.forEach((segments, buffId) => {
      segments.forEach((seg, idx) => {
        if (seg.end >= 0) {
           if (!groups[seg.end]) groups[seg.end] = [];
           groups[seg.end].push({ config: seg.config, type: 'end', id: `${buffId}-end-${idx}` });
        }
      });
    });

    return Object.entries(groups).map(([time, dots]) => ({ time: parseFloat(time), dots }));
  }, [buffStatus]);

  const timeMarkers = useMemo(() => {
    const markers = [];
    for (let t = START_TIME; t <= dynamicEndTime; t += 2.5) markers.push(t);
    return markers;
  }, [dynamicEndTime]);

  const renderSkillInstance = (ps: PlacedSkill, isOpener: boolean) => {
    const skill = currentSkills.find(s => s.id === ps.skillId);
    if (!skill) return null;
    
    const state = computedState[ps.instanceId] || { resource: undefined, procStacks: 0 };
    const isGcd = skill.type === SkillType.GCD;
    
    let displayTime = ps.time;
    if (!isGcd) {
      const prevGcd = sortedAll
        .filter(p => p.time <= ps.time)
        .reverse()
        .find(p => {
          const s = currentSkills.find(sk => sk.id === p.skillId);
          return s?.type === SkillType.GCD;
        });
      if (prevGcd) displayTime = prevGcd.time;
    }

    const baseClasses = `flex flex-col items-center group cursor-pointer active:scale-95 transition-all ${isGcd ? 'z-20' : 'z-30'}`;
    const positionStyle = isOpener 
      ? {} 
      : { 
          position: 'absolute' as const, 
          left: TIMELINE_PADDING_LEFT + (ps.time - START_TIME) * PIXELS_PER_SECOND, 
          top: isGcd ? 0 : 70, 
          transform: 'translateX(-50%)' 
        };

    return (
      <div key={ps.instanceId} className={baseClasses} style={positionStyle} onClick={() => onRemove(ps.instanceId)}>
        {!isOpener && <div className={`absolute bottom-full w-px ${isGcd ? 'bg-indigo-500/10' : 'bg-zinc-800/50'} h-[500px] pointer-events-none -z-10`} />}
        
        <div className="relative">
          {state.resource !== undefined && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 px-1 py-0.5 rounded shadow-lg z-40">
              <span className="text-[8px] font-mono font-bold text-cyan-400">{state.resource}</span>
            </div>
          )}

          {state.procStacks > 0 && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b] border border-white z-40 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">{state.procStacks}</span>
            </div>
          )}

          <img 
            src={skill.icon} alt={skill.name} 
            className={`${isGcd ? 'w-9 h-9 border-2 border-zinc-700' : 'w-7 h-7 border-2 border-zinc-800'} rounded bg-zinc-900 object-cover shadow-xl group-hover:border-indigo-400 transition-colors ${state.procStacks > 0 ? 'ring-2 ring-amber-500 ring-offset-1 ring-offset-zinc-950' : ''}`}
          />
          
          <div className={`mt-1 text-[8px] font-mono font-bold text-center ${ps.time < 0 ? 'text-amber-400' : 'text-zinc-500'}`}>
            {displayTime.toFixed(1)}s
          </div>

          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-700 text-[10px] px-2 py-0.5 rounded text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-2xl flex items-center gap-1.5 overflow-hidden">
            <span className="font-bold truncate max-w-[120px]">{skill.name}</span>
            <span className="text-indigo-400 font-mono shrink-0">{displayTime.toFixed(1)}s</span>
          </div>

          <div className="absolute inset-0 bg-red-600/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <i className="fa-solid fa-trash-can text-white text-[10px]"></i>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-row bg-zinc-950 overflow-hidden">
      <div className="w-24 shrink-0 bg-zinc-900/40 flex flex-col z-50 border-r border-zinc-800 overflow-hidden">
        <div className="h-12 border-b border-zinc-800 flex items-center justify-center px-2 bg-zinc-900/60">
          <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter text-center leading-none">Opener</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-4 items-center">
          {openerSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20 text-center px-1">
              <i className="fa-solid fa-hourglass-start text-[14px] mb-2"></i>
              <span className="text-[8px] font-bold uppercase">No<br/>Opener</span>
            </div>
          ) : (
            openerSkills.map(ps => renderSkillInstance(ps, true))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/10 overflow-hidden">
        <div className="p-2 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-4 shrink-0 overflow-x-auto custom-scrollbar h-12">
          <div className="flex gap-4 items-center px-2 shrink-0">
            <span className="text-[9px] font-bold text-zinc-600 uppercase">EFFECT:</span>
            {activeLegendBuffs.length === 0 && <span className="text-[9px] text-zinc-700 italic">부여된 효과 없음</span>}
            {activeLegendBuffs.map(buff => (
              <div key={buff.id} className="flex items-center gap-1.5 whitespace-nowrap opacity-80">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: buff.color }} />
                <span className="text-[9px] font-medium text-zinc-400">{buff.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar relative bg-zinc-950/20" ref={containerRef}>
          <div className="relative h-full" style={{ width: (dynamicEndTime - START_TIME) * PIXELS_PER_SECOND + TIMELINE_PADDING_LEFT + 100 }}>
            <div className="absolute top-0 left-0 right-0 h-8 border-b border-zinc-800">
              {timeMarkers.map((t) => (
                <div key={t} className="absolute border-l border-zinc-800 h-4" style={{ left: TIMELINE_PADDING_LEFT + (t - START_TIME) * PIXELS_PER_SECOND }}>
                  <span className="text-[9px] font-mono text-zinc-500 -translate-y-full mb-1 absolute bottom-full left-0">{t}s</span>
                </div>
              ))}
            </div>

            <div className="absolute left-0 right-0 top-12 h-8">
              {dotPoints.map((point) => (
                <div key={point.time} className="absolute flex flex-row items-center" style={{ left: TIMELINE_PADDING_LEFT + (point.time - START_TIME) * PIXELS_PER_SECOND }}>
                  <div className="flex gap-1 -translate-x-1/2">
                    {point.dots.map((dot) => (
                      <div key={dot.id} className={`w-2.5 h-2.5 rounded-full border border-zinc-950 shadow-lg shrink-0 ${dot.type === 'start' ? 'ring-1 ring-white/20' : 'opacity-40 scale-75'}`} style={{ backgroundColor: dot.config.color }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-0 right-0" style={{ top: 100 }}>
              {rotationSkills.map(ps => renderSkillInstance(ps, false))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
