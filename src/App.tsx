/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const HOLIDAYS = [
  { month: 0, day: 1, name: "New Year's Day", color: "#FFD700" },
  { month: 1, day: 14, name: "Valentine's Day", color: "#FF69B4" },
  { month: 2, day: 17, name: "St. Patrick's Day", color: "#32CD32" },
  { month: 6, day: 4, name: "Independence Day", color: "#FF4500" },
  { month: 9, day: 31, name: "Halloween", color: "#FFA500" },
  { month: 11, day: 25, name: "Christmas", color: "#FF0000" },
  { month: 11, day: 31, name: "New Year's Eve", color: "#C0C0C0" },
];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [decadeProgress, setDecadeProgress] = useState(0);
  const [decadeTimeLeft, setDecadeTimeLeft] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [centuryProgress, setCenturyProgress] = useState(0);
  const [centuryTimeLeft, setCenturyTimeLeft] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [millenniumProgress, setMillenniumProgress] = useState(0);
  const [millenniumTimeLeft, setMillenniumTimeLeft] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [monthProgress, setMonthProgress] = useState(0);
  const [monthTimeLeft, setMonthTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [weekProgress, setWeekProgress] = useState(0);
  const [weekTimeLeft, setWeekTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [dayProgress, setDayProgress] = useState(0);
  const [dayTimeLeft, setDayTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hourProgress, setHourProgress] = useState(0);
  const [hourTimeLeft, setHourTimeLeft] = useState({ seconds: 0, ms: 0 });
  const [minuteProgress, setMinuteProgress] = useState(0);
  const [minuteTimeLeft, setMinuteTimeLeft] = useState({ ms: 0 });
  const [secondProgress, setSecondProgress] = useState(0);
  const [secondTimeLeft, setSecondTimeLeft] = useState({ ms: 0 });
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});

  const toggleMinimize = (id: string) => {
    setMinimized(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [decadeMarkers, setDecadeMarkers] = useState<{ pos: number; endPos: number; name: string }[]>([]);
  const [centuryMarkers, setCenturyMarkers] = useState<{ pos: number; endPos: number; name: string }[]>([]);
  const [millenniumMarkers, setMillenniumMarkers] = useState<{ pos: number; endPos: number; name: string }[]>([]);
  const [monthMarkers, setMonthMarkers] = useState<{ pos: number; endPos: number; name: string }[]>([]);
  const [quarterMarkers, setQuarterMarkers] = useState<number[]>([]);
  const [monthDayMarkers, setMonthDayMarkers] = useState<{ pos: number; endPos: number; name: string; isWeek: boolean }[]>([]);
  const [monthHolidayMarkers, setMonthHolidayMarkers] = useState<{ pos: number; color: string; name: string }[]>([]);
  const [dayMarkers, setDayMarkers] = useState<{ pos: number; endPos: number; name: string }[]>([]);
  const [dayQuarterMarkers, setDayQuarterMarkers] = useState<number[]>([]);
  const [hourMarkers, setHourMarkers] = useState<{ pos: number; endPos: number; name: string; isMajor: boolean }[]>([]);
  const [minuteMarkers, setMinuteMarkers] = useState<{ pos: number; endPos: number; name: string; isMajor: boolean }[]>([]);
  const [secondMarkers, setSecondMarkers] = useState<{ pos: number; endPos: number; name: string; isMajor: boolean }[]>([]);
  const [msMarkers, setMsMarkers] = useState<{ pos: number; endPos: number; name: string; isMajor: boolean }[]>([]);
  const [holidayMarkers, setHolidayMarkers] = useState<{ pos: number; color: string; name: string }[]>([]);

  useEffect(() => {
    const getEaster = (year: number) => {
      const a = year % 19;
      const b = Math.floor(year / 100);
      const c = year % 100;
      const d = Math.floor(b / 4);
      const e = b % 4;
      const f = Math.floor((b + 8) / 25);
      const g = Math.floor((b - f + 1) / 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = Math.floor(c / 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = Math.floor((a + 11 * h + 22 * l) / 451);
      const month = Math.floor((h + l - 7 * m + 114) / 31);
      const day = ((h + l - 7 * m + 114) % 31) + 1;
      return new Date(year, month - 1, day);
    };

    const getThanksgiving = (year: number) => {
      const nov1 = new Date(year, 10, 1);
      const firstThursday = (11 - nov1.getDay()) % 7;
      const fourthThursday = 1 + firstThursday + 21;
      return new Date(year, 10, fourthThursday);
    };

    const calculateProgress = () => {
      const now = new Date();
      const year = now.getFullYear();
      setCurrentYear(year);
      
      const start = new Date(year, 0, 1).getTime();
      const end = new Date(year + 1, 0, 1).getTime();
      const current = now.getTime();
      const total = end - start;

      const elapsed = current - start;
      const percentage = (elapsed / total) * 100;

      setProgress(percentage);

      // Decade Progress Calculation
      const decadeStartYear = Math.floor(year / 10) * 10;
      const decadeEndYear = decadeStartYear + 10;
      const decadeStart = new Date(decadeStartYear, 0, 1).getTime();
      const decadeEnd = new Date(decadeEndYear, 0, 1).getTime();
      const decadeTotal = decadeEnd - decadeStart;
      const decadeElapsed = now.getTime() - decadeStart;
      setDecadeProgress((decadeElapsed / decadeTotal) * 100);

      const decMarkers = [];
      for (let y = 0; y < 10; y++) {
        const yStart = new Date(decadeStartYear + y, 0, 1).getTime();
        const yEnd = new Date(decadeStartYear + y + 1, 0, 1).getTime();
        decMarkers.push({
          pos: ((yStart - decadeStart) / decadeTotal) * 100,
          endPos: ((yEnd - decadeStart) / decadeTotal) * 100,
          name: (decadeStartYear + y).toString()
        });
      }
      setDecadeMarkers(decMarkers);

      const decadeRemaining = decadeEnd - now.getTime();
      setDecadeTimeLeft({
        years: Math.floor(decadeRemaining / (1000 * 60 * 60 * 24 * 365.25)),
        days: Math.floor((decadeRemaining % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((decadeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((decadeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((decadeRemaining % (1000 * 60)) / 1000)
      });

      // Century Progress Calculation
      const centuryStartYear = Math.floor(year / 100) * 100;
      const centuryEndYear = centuryStartYear + 100;
      const centuryStart = new Date(centuryStartYear, 0, 1).getTime();
      const centuryEnd = new Date(centuryEndYear, 0, 1).getTime();
      const centuryTotal = centuryEnd - centuryStart;
      const centuryElapsed = now.getTime() - centuryStart;
      setCenturyProgress((centuryElapsed / centuryTotal) * 100);

      const cenMarkers = [];
      for (let y = 0; y < 100; y += 10) {
        const yStart = new Date(centuryStartYear + y, 0, 1).getTime();
        const yEnd = new Date(centuryStartYear + y + 10, 0, 1).getTime();
        cenMarkers.push({
          pos: ((yStart - centuryStart) / centuryTotal) * 100,
          endPos: ((yEnd - centuryStart) / centuryTotal) * 100,
          name: (centuryStartYear + y).toString()
        });
      }
      setCenturyMarkers(cenMarkers);

      const centuryRemaining = centuryEnd - now.getTime();
      setCenturyTimeLeft({
        years: Math.floor(centuryRemaining / (1000 * 60 * 60 * 24 * 365.25)),
        days: Math.floor((centuryRemaining % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((centuryRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((centuryRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((centuryRemaining % (1000 * 60)) / 1000)
      });

      // Millennium Progress Calculation
      const millenniumStartYear = Math.floor(year / 1000) * 1000;
      const millenniumEndYear = millenniumStartYear + 1000;
      const millenniumStart = new Date(millenniumStartYear, 0, 1).getTime();
      const millenniumEnd = new Date(millenniumEndYear, 0, 1).getTime();
      const millenniumTotal = millenniumEnd - millenniumStart;
      const millenniumElapsed = now.getTime() - millenniumStart;
      setMillenniumProgress((millenniumElapsed / millenniumTotal) * 100);

      const milMarkers = [];
      for (let y = 0; y < 1000; y += 100) {
        const yStart = new Date(millenniumStartYear + y, 0, 1).getTime();
        const yEnd = new Date(millenniumStartYear + y + 100, 0, 1).getTime();
        milMarkers.push({
          pos: ((yStart - millenniumStart) / millenniumTotal) * 100,
          endPos: ((yEnd - millenniumStart) / millenniumTotal) * 100,
          name: (millenniumStartYear + y).toString()
        });
      }
      setMillenniumMarkers(milMarkers);

      const millenniumRemaining = millenniumEnd - now.getTime();
      setMillenniumTimeLeft({
        years: Math.floor(millenniumRemaining / (1000 * 60 * 60 * 24 * 365.25)),
        days: Math.floor((millenniumRemaining % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((millenniumRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((millenniumRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((millenniumRemaining % (1000 * 60)) / 1000)
      });

      // Month markers
      const mMarkers = [];
      const qMarkers = [];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let m = 0; m < 12; m++) {
        const monthStart = new Date(year, m, 1).getTime();
        const nextMonthStart = new Date(year, m + 1, 1).getTime();
        const mStartPos = ((monthStart - start) / total) * 100;
        const mEndPos = ((nextMonthStart - start) / total) * 100;
        
        mMarkers.push({
          pos: mStartPos,
          endPos: mEndPos,
          name: monthNames[m]
        });

        // Quarter markers (3 per month)
        const monthDuration = nextMonthStart - monthStart;
        for (let q = 1; q <= 3; q++) {
          const qPos = monthStart + (monthDuration * q) / 4;
          qMarkers.push(((qPos - start) / total) * 100);
        }
      }
      setMonthMarkers(mMarkers);
      setQuarterMarkers(qMarkers);

      // Holiday markers
      const yearHolidays = HOLIDAYS.map(h => {
        const hDate = new Date(year, h.month, h.day);
        return {
          pos: ((hDate.getTime() - start) / total) * 100,
          color: h.color,
          name: h.name
        };
      });

      // Add dynamic holidays (Easter/Thanksgiving)
      const dynamicHolidays = [
        { name: "Easter", date: getEaster(year), color: "#c77dff" },
        { name: "Thanksgiving", date: getThanksgiving(year), color: "#bc6c25" },
      ];

      dynamicHolidays.forEach(h => {
        yearHolidays.push({
          pos: ((h.date.getTime() - start) / total) * 100,
          color: h.color,
          name: h.name
        });
      });

      setHolidayMarkers(yearHolidays);

      // Time remaining
      const remaining = end - current;
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // Month Progress Calculation
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const monthTotal = endOfMonth.getTime() - startOfMonth.getTime();
      const monthElapsed = now.getTime() - startOfMonth.getTime();
      setMonthProgress((monthElapsed / monthTotal) * 100);
      setCurrentMonthName(now.toLocaleString('default', { month: 'long' }));

      const mDayMarkers = [];
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const dStart = new Date(now.getFullYear(), now.getMonth(), d);
        const dEnd = new Date(now.getFullYear(), now.getMonth(), d + 1);
        const dStartPos = ((dStart.getTime() - startOfMonth.getTime()) / monthTotal) * 100;
        const dEndPos = ((dEnd.getTime() - startOfMonth.getTime()) / monthTotal) * 100;
        
        mDayMarkers.push({
          pos: dStartPos,
          endPos: dEndPos,
          name: d.toString(),
          isWeek: d % 7 === 0
        });
      }
      setMonthDayMarkers(mDayMarkers);

      const monthRemaining = endOfMonth.getTime() - now.getTime();
      setMonthTimeLeft({
        days: Math.floor(monthRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((monthRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((monthRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((monthRemaining % (1000 * 60)) / 1000)
      });

      // Month Holidays
      const mHolidays = [];
      for (const h of HOLIDAYS) {
        if (h.month === now.getMonth()) {
          const hDate = new Date(now.getFullYear(), h.month, h.day);
          const hPos = ((hDate.getTime() - startOfMonth.getTime()) / monthTotal) * 100;
          mHolidays.push({ pos: hPos, color: h.color, name: h.name });
        }
      }
      setMonthHolidayMarkers(mHolidays);

      // Week Progress Calculation
      const startOfWeek = new Date(now);
      const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(now.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      
      const weekTotal = endOfWeek.getTime() - startOfWeek.getTime();
      const weekElapsed = now.getTime() - startOfWeek.getTime();
      setWeekProgress((weekElapsed / weekTotal) * 100);

      // Day markers for the week
      const dMarkers = [];
      const dqMarkers = [];
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      for (let d = 0; d < 7; d++) {
        const dayStart = new Date(startOfWeek);
        dayStart.setDate(startOfWeek.getDate() + d);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);
        
        const dStartPos = ((dayStart.getTime() - startOfWeek.getTime()) / weekTotal) * 100;
        const dEndPos = ((dayEnd.getTime() - startOfWeek.getTime()) / weekTotal) * 100;
        
        dMarkers.push({
          pos: dStartPos,
          endPos: dEndPos,
          name: dayNames[d]
        });

        // Day quarters (3 per day: 6h, 12h, 18h)
        const dayDuration = dayEnd.getTime() - dayStart.getTime();
        for (let q = 1; q <= 3; q++) {
          const qPos = dayStart.getTime() + (dayDuration * q) / 4;
          dqMarkers.push(((qPos - startOfWeek.getTime()) / weekTotal) * 100);
        }
      }
      setDayMarkers(dMarkers);
      setDayQuarterMarkers(dqMarkers);

      const weekRemaining = endOfWeek.getTime() - now.getTime();
      setWeekTimeLeft({
        days: Math.floor(weekRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((weekRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((weekRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((weekRemaining % (1000 * 60)) / 1000)
      });

      // Day Progress Calculation
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(startOfDay.getDate() + 1);
      
      const dayTotal = endOfDay.getTime() - startOfDay.getTime();
      const dayElapsed = now.getTime() - startOfDay.getTime();
      setDayProgress((dayElapsed / dayTotal) * 100);

      // Hour markers for the day
      const hMarkers = [];
      for (let h = 0; h < 24; h++) {
        const hStart = new Date(startOfDay);
        hStart.setHours(h);
        const hEnd = new Date(hStart);
        hEnd.setHours(h + 1);
        
        const hStartPos = ((hStart.getTime() - startOfDay.getTime()) / dayTotal) * 100;
        const hEndPos = ((hEnd.getTime() - startOfDay.getTime()) / dayTotal) * 100;
        
        hMarkers.push({
          pos: hStartPos,
          endPos: hEndPos,
          name: `${h.toString().padStart(2, '0')}:00`,
          isMajor: h % 3 === 0
        });
      }
      setHourMarkers(hMarkers);

      const dayRemaining = endOfDay.getTime() - now.getTime();
      setDayTimeLeft({
        days: 0,
        hours: Math.floor(dayRemaining / (1000 * 60 * 60)),
        minutes: Math.floor((dayRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((dayRemaining % (1000 * 60)) / 1000)
      });

      // Hour Progress Calculation (Current Day) - Wait, Day Progress already does this.
      // Hour Progress here means progress of the current HOUR (minutes).
      const startOfHour = new Date(now);
      startOfHour.setMinutes(0, 0, 0);
      const endOfHour = new Date(startOfHour);
      endOfHour.setHours(startOfHour.getHours() + 1);
      
      const hourTotal = endOfHour.getTime() - startOfHour.getTime();
      const hourElapsed = now.getTime() - startOfHour.getTime();
      setHourProgress((hourElapsed / hourTotal) * 100);

      const hourMinMarkers = [];
      for (let m = 0; m < 60; m++) {
        const mPos = (m / 60) * 100;
        hourMinMarkers.push({
          pos: mPos,
          endPos: ((m + 1) / 60) * 100,
          name: m % 5 === 0 ? `${m.toString().padStart(2, '0')}` : '',
          isMajor: m % 15 === 0
        });
      }
      setMinuteMarkers(hourMinMarkers);
      setHourTimeLeft({
        seconds: Math.floor((hourTotal - hourElapsed) / 1000),
        ms: (hourTotal - hourElapsed) % 1000
      });

      // Minute Progress Calculation (Current Minute)
      const startOfMinute = new Date(now);
      startOfMinute.setSeconds(0, 0);
      const endOfMinute = new Date(startOfMinute);
      endOfMinute.setMinutes(startOfMinute.getMinutes() + 1);
      
      const minuteTotal = endOfMinute.getTime() - startOfMinute.getTime();
      const minuteElapsed = now.getTime() - startOfMinute.getTime();
      setMinuteProgress((minuteElapsed / minuteTotal) * 100);

      const minSecMarkers = [];
      for (let s = 0; s < 60; s++) {
        const sPos = (s / 60) * 100;
        minSecMarkers.push({
          pos: sPos,
          endPos: ((s + 1) / 60) * 100,
          name: s % 5 === 0 ? `${s.toString().padStart(2, '0')}` : '',
          isMajor: s % 15 === 0
        });
      }
      setSecondMarkers(minSecMarkers);
      setMinuteTimeLeft({
        ms: minuteTotal - minuteElapsed
      });

      // Second Progress Calculation (Current Second)
      const startOfSecond = new Date(now);
      startOfSecond.setMilliseconds(0);
      const endOfSecond = new Date(startOfSecond);
      endOfSecond.setSeconds(startOfSecond.getSeconds() + 1);

      const secondTotal = endOfSecond.getTime() - startOfSecond.getTime();
      const secondElapsed = now.getTime() - startOfSecond.getTime();
      setSecondProgress((secondElapsed / secondTotal) * 100);

      const sMsMarkers = [];
      for (let ms = 0; ms < 1000; ms += 10) {
        const msPos = (ms / 1000) * 100;
        sMsMarkers.push({
          pos: msPos,
          endPos: ((ms + 10) / 1000) * 100,
          name: ms % 100 === 0 ? `${ms.toString().padStart(3, '0')}` : '',
          isMajor: ms % 100 === 0
        });
      }
      setMsMarkers(sMsMarkers);
      setSecondTimeLeft({
        ms: secondTotal - secondElapsed
      });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 16); // Faster interval for smooth millisecond bar
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-6 font-sans text-[#1a1a1a]">
      <div className="w-full max-w-[80%] space-y-4">
        <div className="space-y-2">
          {/* Millennium Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('millennium')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['millennium'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Millennium Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={millenniumProgress} isVisible={!!minimized['millennium']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {millenniumProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['millennium'] ? 0 : 'auto', opacity: minimized['millennium'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {millenniumMarkers.map((marker, i) => (
                  <div key={`millennium-marker-${i}`}>
                    {i > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-[4px] -ml-[2px] bg-[#444444] z-10"
                        style={{ left: `${marker.pos}%` }}
                      />
                    )}
                    <div
                      className="absolute top-1 z-30 text-[9px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${marker.pos + (marker.endPos - marker.pos) / 2}%` }}
                    >
                      {marker.name}
                    </div>
                  </div>
                ))}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${millenniumProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Years" value={millenniumTimeLeft.years} />
                <CompactStat label="Days" value={millenniumTimeLeft.days} />
                <CompactStat label="Hours" value={millenniumTimeLeft.hours} />
                <CompactStat label="Minutes" value={millenniumTimeLeft.minutes} />
              </div>
            </motion.div>
          </div>

          {/* Century Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('century')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['century'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Century Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={centuryProgress} isVisible={!!minimized['century']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {centuryProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['century'] ? 0 : 'auto', opacity: minimized['century'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {centuryMarkers.map((marker, i) => (
                  <div key={`century-marker-${i}`}>
                    {i > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-[4px] -ml-[2px] bg-[#444444] z-10"
                        style={{ left: `${marker.pos}%` }}
                      />
                    )}
                    <div
                      className="absolute top-1 z-30 text-[9px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${marker.pos + (marker.endPos - marker.pos) / 2}%` }}
                    >
                      {marker.name}
                    </div>
                  </div>
                ))}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${centuryProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Years" value={centuryTimeLeft.years} />
                <CompactStat label="Days" value={centuryTimeLeft.days} />
                <CompactStat label="Hours" value={centuryTimeLeft.hours} />
                <CompactStat label="Minutes" value={centuryTimeLeft.minutes} />
              </div>
            </motion.div>
          </div>

          {/* Decade Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('decade')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['decade'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Decade Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={decadeProgress} isVisible={!!minimized['decade']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {decadeProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['decade'] ? 0 : 'auto', opacity: minimized['decade'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {decadeMarkers.map((marker, i) => (
                  <div key={`decade-marker-${i}`}>
                    {i > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-[4px] -ml-[2px] bg-[#444444] z-10"
                        style={{ left: `${marker.pos}%` }}
                      />
                    )}
                    <div
                      className="absolute top-1 z-30 text-[9px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${marker.pos + (marker.endPos - marker.pos) / 2}%` }}
                    >
                      {marker.name}
                    </div>
                  </div>
                ))}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${decadeProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Years" value={decadeTimeLeft.years} />
                <CompactStat label="Days" value={decadeTimeLeft.days} />
                <CompactStat label="Hours" value={decadeTimeLeft.hours} />
                <CompactStat label="Minutes" value={decadeTimeLeft.minutes} />
              </div>
            </motion.div>
          </div>

          {/* Year Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('year')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['year'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Year Progress {currentYear}
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={progress} isVisible={!!minimized['year']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {progress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['year'] ? 0 : 'auto', opacity: minimized['year'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Month Sections & Labels */}
                {monthMarkers.map((month, i) => (
                  <div key={`month-section-${i}`}>
                    {/* Divider (skip Jan as it's the start) */}
                    {i > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-[4px] -ml-[2px] bg-[#444444] z-10"
                        style={{ left: `${month.pos}%` }}
                      />
                    )}
                    {/* Label */}
                    <div
                      className="absolute top-1 z-30 text-[9px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${month.pos + (month.endPos - month.pos) / 2}%` }}
                    >
                      {month.name}.
                    </div>
                  </div>
                ))}

                {/* Quarter Dividers */}
                {quarterMarkers.map((pos, i) => (
                  <div
                    key={`quarter-${i}`}
                    className="absolute bottom-0 h-1/4 w-[1px] bg-[#444444] z-10"
                    style={{ left: `${pos}%` }}
                  />
                ))}

                {/* Holiday Markers */}
                {holidayMarkers.map((holiday, i) => (
                  <div
                    key={`holiday-${i}`}
                    className="absolute bottom-0 h-1/2 w-[5px] -ml-[2.5px] z-20 group cursor-help"
                    style={{ left: `${holiday.pos}%`, backgroundColor: holiday.color }}
                    title={holiday.name}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a1a] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {holiday.name}
                    </div>
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Days" value={timeLeft.days} />
                <CompactStat label="Hours" value={timeLeft.hours} />
                <CompactStat label="Minutes" value={timeLeft.minutes} />
                <CompactStat label="Seconds" value={timeLeft.seconds} />
              </div>
            </motion.div>
          </div>

          {/* Month Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('month')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['month'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Month Progress ({currentMonthName})
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={monthProgress} isVisible={!!minimized['month']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {monthProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['month'] ? 0 : 'auto', opacity: minimized['month'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Day Sections & Labels */}
                {monthDayMarkers.map((day, i) => (
                  <div key={`month-day-${i}`}>
                    {/* Divider (skip first day as it's the start) */}
                    {i > 0 && (
                      <div
                        className={`absolute bottom-0 bg-[#444444] z-10 ${day.isWeek ? 'top-0 w-[3px] -ml-[1.5px]' : 'h-1/4 w-[1px] -ml-[0.5px]'}`}
                        style={{ left: `${day.pos}%` }}
                      />
                    )}
                  </div>
                ))}

                {/* Holiday Markers */}
                {monthHolidayMarkers.map((holiday, i) => (
                  <div
                    key={`month-holiday-${i}`}
                    className="absolute bottom-0 h-1/2 w-[5px] -ml-[2.5px] z-20 group cursor-help"
                    style={{ left: `${holiday.pos}%`, backgroundColor: holiday.color }}
                    title={holiday.name}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a1a] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {holiday.name}
                    </div>
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${monthProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Days" value={monthTimeLeft.days} />
                <CompactStat label="Hours" value={monthTimeLeft.hours} />
                <CompactStat label="Minutes" value={monthTimeLeft.minutes} />
                <CompactStat label="Seconds" value={monthTimeLeft.seconds} />
              </div>
            </motion.div>
          </div>

          {/* Week Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('week')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['week'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Week Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={weekProgress} isVisible={!!minimized['week']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {weekProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['week'] ? 0 : 'auto', opacity: minimized['week'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Day Sections & Labels */}
                {dayMarkers.map((day, i) => (
                  <div key={`day-section-${i}`}>
                    {/* Divider (skip first day as it's the start) */}
                    {i > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-[4px] -ml-[2px] bg-[#444444] z-10"
                        style={{ left: `${day.pos}%` }}
                      />
                    )}
                    {/* Label */}
                    <div
                      className="absolute top-1 z-30 text-[9px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${day.pos + (day.endPos - day.pos) / 2}%` }}
                    >
                      {day.name}.
                    </div>
                  </div>
                ))}

                {/* Day Quarter Dividers */}
                {dayQuarterMarkers.map((pos, i) => (
                  <div
                    key={`day-quarter-${i}`}
                    className="absolute bottom-0 h-1/4 w-[1px] bg-[#444444] z-10"
                    style={{ left: `${pos}%` }}
                  />
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${weekProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Days" value={weekTimeLeft.days} />
                <CompactStat label="Hours" value={weekTimeLeft.hours} />
                <CompactStat label="Minutes" value={weekTimeLeft.minutes} />
                <CompactStat label="Seconds" value={weekTimeLeft.seconds} />
              </div>
            </motion.div>
          </div>

          {/* Day Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('day')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['day'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Day Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={dayProgress} isVisible={!!minimized['day']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {dayProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['day'] ? 0 : 'auto', opacity: minimized['day'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Hour Sections & Labels */}
                {hourMarkers.map((hour, i) => (
                  <div key={`hour-section-${i}`}>
                    {/* Divider (skip first hour as it's the start) */}
                    {i > 0 && (
                      <div
                        className={`absolute bottom-0 bg-[#444444] z-10 ${hour.isMajor ? 'top-0 w-[3px] -ml-[1.5px]' : 'h-1/4 w-[1px] -ml-[0.5px]'}`}
                        style={{ left: `${hour.pos}%` }}
                      />
                    )}
                    {/* Label */}
                    <div
                      className="absolute top-1 z-30 text-[7px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                      style={{ left: `${hour.pos + (hour.endPos - hour.pos) / 2}%` }}
                    >
                      {hour.name}
                    </div>
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${dayProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Hours" value={dayTimeLeft.hours} />
                <CompactStat label="Minutes" value={dayTimeLeft.minutes} />
                <CompactStat label="Seconds" value={dayTimeLeft.seconds} />
              </div>
            </motion.div>
          </div>

          {/* Hour Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('hour')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['hour'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Hour Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={hourProgress} isVisible={!!minimized['hour']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {hourProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['hour'] ? 0 : 'auto', opacity: minimized['hour'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Minute Sections & Labels */}
                {minuteMarkers.map((min, i) => (
                  <div key={`min-section-${i}`}>
                    {/* Divider (skip first as it's the start) */}
                    {i > 0 && (
                      <div
                        className={`absolute bottom-0 bg-[#444444] z-10 ${min.isMajor ? 'top-0 w-[3px] -ml-[1.5px]' : 'h-1/4 w-[1px] -ml-[0.5px]'}`}
                        style={{ left: `${min.pos}%` }}
                      />
                    )}
                    {/* Label every 5 mins */}
                    {min.name && (
                      <div
                        className="absolute top-1 z-30 text-[7px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                        style={{ left: `${min.pos}%` }}
                      >
                        {min.name}
                      </div>
                    )}
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${hourProgress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="Seconds" value={hourTimeLeft.seconds} />
                <CompactStat label="MS" value={hourTimeLeft.ms} />
              </div>
            </motion.div>
          </div>

          {/* Minute Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('minute')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['minute'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Minute Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={minuteProgress} isVisible={!!minimized['minute']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {minuteProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['minute'] ? 0 : 'auto', opacity: minimized['minute'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* Second Sections & Labels */}
                {secondMarkers.map((sec, i) => (
                  <div key={`sec-section-${i}`}>
                    {/* Divider (skip first as it's the start) */}
                    {i > 0 && (
                      <div
                        className={`absolute bottom-0 bg-[#444444] z-10 ${sec.isMajor ? 'top-0 w-[3px] -ml-[1.5px]' : 'h-1/4 w-[1px] -ml-[0.5px]'}`}
                        style={{ left: `${sec.pos}%` }}
                      />
                    )}
                    {/* Label every 5 secs */}
                    {sec.name && (
                      <div
                        className="absolute top-1 z-30 text-[7px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                        style={{ left: `${sec.pos}%` }}
                      >
                        {sec.name}
                      </div>
                    )}
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${minuteProgress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="MS Remaining" value={minuteTimeLeft.ms} />
              </div>
            </motion.div>
          </div>

          {/* Second Progress Widget */}
          <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {/* Top Row: Title & Percentage */}
            <div 
              className="h-[25px] bg-[#2a2a2a] grid grid-cols-3 items-center px-4 cursor-pointer hover:bg-[#333333] transition-colors"
              onClick={() => toggleMinimize('second')}
            >
              <div className="flex items-center gap-2 justify-self-start">
                <motion.span
                  animate={{ rotate: minimized['second'] ? -90 : 0 }}
                  className="text-[8px] text-white/40"
                >
                  ▼
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Second Progress
                </span>
              </div>
              <div className="w-full flex justify-center">
                <MiniProgressBar progress={secondProgress} isVisible={!!minimized['second']} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-white/80 tabular-nums justify-self-end">
                {secondProgress.toFixed(6)}% ELAPSED
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: minimized['second'] ? 0 : 'auto', opacity: minimized['second'] ? 0 : 1 }}
              className="overflow-hidden"
            >
              {/* Middle Row: Progress Bar */}
              <div className="relative h-[40px] w-full bg-[#2a2a2a] shadow-inner border-y border-[#1a1a1a]">
                {/* MS Sections & Labels */}
                {msMarkers.map((ms, i) => (
                  <div key={`ms-section-${i}`}>
                    {/* Divider (skip first as it's the start) */}
                    {i > 0 && (
                      <div
                        className={`absolute bottom-0 bg-[#444444] z-10 ${ms.isMajor ? 'top-0 w-[3px] -ml-[1.5px]' : 'h-1/4 w-[1px] -ml-[0.5px]'}`}
                        style={{ left: `${ms.pos}%` }}
                      />
                    )}
                    {/* Label every 100ms */}
                    {ms.name && (
                      <div
                        className="absolute top-1 z-30 text-[7px] font-bold uppercase tracking-tighter text-white/60 -translate-x-1/2"
                        style={{ left: `${ms.pos}%` }}
                      >
                        {ms.name}
                      </div>
                    )}
                  </div>
                ))}
                
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#144982]"
                  initial={{ width: 0 }}
                  animate={{ width: `${secondProgress}%` }}
                  transition={{ duration: 0.01, ease: "linear" }}
                />
              </div>

              {/* Bottom Row: Countdown Stats */}
              <div className="h-[25px] bg-[#2a2a2a] flex items-center justify-around px-4">
                <CompactStat label="MS Remaining" value={secondTimeLeft.ms} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40">
        {label}
      </span>
      <span className="text-[11px] font-bold text-white/80 tabular-nums">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function MiniProgressBar({ progress, isVisible }: { progress: number; isVisible: boolean }) {
  return (
    <div className="w-full h-[6px] max-w-[250px] bg-white/5 rounded-full overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#144982]"
        initial={false}
        animate={{ 
          width: isVisible ? `${progress}%` : '0%',
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
