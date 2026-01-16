'use client';

import { useApp } from '@/contexts/AppContext';
import Image from 'next/image';

export default function Header() {
  const { data } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-blue to-deep-blue border-b-2 border-sheikah-blue p-4 mb-6 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Image 
            src="/mastery.png" 
            alt="Master Cycle" 
            width={50} 
            height={50}
            className="drop-shadow-[0_0_8px_rgba(212,165,116,0.6)]"
          />
          <h1 className="text-3xl font-bold text-sheikah-blue sheikah-glow tracking-wide">
            MASTER <span className="text-ancient-gold">CYCLE</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-aged-paper">Adventure Progress:</span>
            <span className="text-sheikah-blue font-bold">{data.totalKilometers.toFixed(1)} km</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-aged-paper">Champion's Path:</span>
            <span className="text-ancient-gold font-bold">
              {data.achievements.filter(a => a.unlocked).length}/{data.achievements.length}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

