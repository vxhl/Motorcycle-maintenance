'use client';

export default function BikeModelPlaceholder() {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border-2 border-sheikah-blue bg-gradient-to-b from-dark-stone to-slate-blue relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(77, 208, 225, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77, 208, 225, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Center content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Large bike icon using SVG */}
        <div className="mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 200 100" 
            className="w-64 h-32 md:w-96 md:h-48"
            style={{ animation: 'bikeFloat 3s ease-in-out infinite' }}
          >
            {/* Back wheel */}
            <circle cx="40" cy="75" r="20" fill="none" stroke="#4dd0e1" strokeWidth="3"/>
            <circle cx="40" cy="75" r="12" fill="none" stroke="#d4a574" strokeWidth="2"/>
            
            {/* Front wheel */}
            <circle cx="160" cy="75" r="20" fill="none" stroke="#4dd0e1" strokeWidth="3"/>
            <circle cx="160" cy="75" r="12" fill="none" stroke="#d4a574" strokeWidth="2"/>
            
            {/* Frame */}
            <path d="M40 75 L80 40 L120 40 L100 75" fill="none" stroke="#4dd0e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M80 40 L100 75 L160 75" fill="none" stroke="#4dd0e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Seat */}
            <ellipse cx="90" cy="35" rx="20" ry="8" fill="#8b5cf6"/>
            
            {/* Handlebars */}
            <path d="M120 40 L140 30 M120 40 L140 45" fill="none" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Engine block */}
            <rect x="75" y="60" width="30" height="20" rx="3" fill="#1a1a2e" stroke="#4dd0e1" strokeWidth="2"/>
            
            {/* Headlight glow */}
            <circle cx="145" cy="50" r="6" fill="#ffeb3b">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-sheikah-blue sheikah-glow">
            Master Cycle Zero
          </h3>
          <p className="text-aged-paper/80 max-w-md">
            3D model viewer coming soon! You'll be able to upload and view your bike's custom 3D model here.
          </p>
          <div className="pt-4 text-sm text-ancient-gold">
            <p>✨ Interactive 3D controls</p>
            <p>🏍️ Custom model support</p>
            <p>🎨 Sheikah Slate technology</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
        
        @keyframes bikeFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}

