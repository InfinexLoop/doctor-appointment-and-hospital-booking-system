import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BRANDING } from '../config/branding';
import {
  Tv,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowLeft,
  Clock,
  Sparkles,
  Building2,
  Bell
} from 'lucide-react';

export const TVDisplayPage: React.FC = () => {
  const { queueTokens, departments } = useApp();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [lastChimeToken, setLastChimeToken] = useState<string | null>(null);

  // Live Clock updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentlyServing = queueTokens.filter((q) => q.status === 'serving');
  const waitingTokens = queueTokens.filter((q) => q.status === 'waiting');

  const playChime = (tokenNumber: string) => {
    setLastChimeToken(tokenNumber);
    try {
      // Audio synthesis chime using Web Audio API
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio chime simulated', e);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden">
      {/* TV Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Exit TV Display"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">{BRANDING.hospitalName}</h1>
              <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                Waiting Lounge Electronic Token Display System
              </p>
            </div>
          </div>
        </div>

        {/* Live Clock & Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (currentlyServing.length > 0) {
                playChime(currentlyServing[0].tokenNumber);
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            title="Simulate Voice & Bell Call Chime"
          >
            <Bell className="w-4 h-4" />
            <span>Call Chime</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          <div className="text-right pl-4 border-l border-slate-800">
            <div className="text-2xl font-black font-mono text-emerald-400 tracking-wider">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      {/* Main TV Screen Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Side: NOW SERVING (Big Prominent Display) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-xl font-black uppercase tracking-widest text-emerald-400">
                Now Serving / En Consultation
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {currentlyServing.length} Active Consultations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {currentlyServing.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-slate-900 to-slate-850 rounded-3xl p-6 border-2 border-emerald-500/80 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-xs px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                  Inside Room
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Token Number
                  </div>
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-widest my-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
                    {item.tokenNumber}
                  </div>
                  <div className="text-lg font-bold text-slate-200">{item.patientName}</div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-end justify-between">
                  <div>
                    <div className="text-xs font-medium text-slate-400">Consulting Physician</div>
                    <div className="text-sm font-bold text-white">{item.doctorName}</div>
                    <div className="text-xs text-brand-400">{item.departmentName}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-400 uppercase">Proceed To</div>
                    <div className="text-2xl font-black text-emerald-400">{item.roomNumber}</div>
                  </div>
                </div>
              </div>
            ))}

            {currentlyServing.length === 0 && (
              <div className="col-span-2 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center p-12 text-slate-500 text-center">
                <div>
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-lg font-bold text-slate-400">All Rooms Preparing For Next Patients</h3>
                  <p className="text-xs text-slate-500 mt-1">Please keep an eye on this board for your token chime.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: NEXT IN LINE (Waiting Area Queue) */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Next In Line / File d'Attente
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              {waitingTokens.length} Waiting
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {waitingTokens.map((token, index) => (
              <div
                key={token.id}
                className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-lg font-black text-white tracking-wider">
                      {token.tokenNumber}
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-[140px]">
                      {token.patientName}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-brand-300">{token.roomNumber}</div>
                  <div className="text-[11px] text-slate-400 font-medium">~{token.estimatedWaitMins}m wait</div>
                </div>
              </div>
            ))}

            {waitingTokens.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No patients currently waiting in line.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* TV Bottom Ticker */}
      <footer className="bg-slate-900 border-t border-slate-800 py-2.5 px-6 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="px-2 py-0.5 rounded bg-brand-900 text-brand-300 font-bold text-[10px] uppercase">
            Notice
          </span>
          <span className="truncate">
            Please proceed promptly to your allocated consultation chamber when your token code flashes green. For assistance, approach the reception desk.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0 pl-4 font-semibold text-slate-400">
          <span>{BRANDING.companyName} Health Tech</span>
        </div>
      </footer>
    </div>
  );
};
