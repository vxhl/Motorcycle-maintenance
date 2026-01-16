'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Box, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the 3D component to avoid SSR issues
const BikeModel = dynamic(() => import('@/components/BikeModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-lg border-2 border-sheikah-blue bg-gradient-to-b from-dark-stone to-slate-blue flex items-center justify-center">
      <div className="text-center">
        <Box className="animate-spin text-sheikah-blue mx-auto mb-4" size={48} />
        <p className="text-sheikah-blue sheikah-glow">Loading Master Cycle...</p>
      </div>
    </div>
  ),
});

export default function BikePage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-lg p-6 border-2 border-sheikah-blue shadow-xl"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 flex items-center gap-3">
              <Image 
                src="/mastery.png" 
                alt="Master Cycle" 
                width={40} 
                height={40}
                className="drop-shadow-[0_0_8px_rgba(212,165,116,0.6)]"
              />
              Master Cycle Zero
            </h2>
            <p className="text-aged-paper/80">
              Interactive 3D model of your legendary machine
            </p>
          </div>
          <Box className="text-ancient-gold" size={40} />
        </div>
      </motion.div>

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-stone rounded-lg p-4 border-2 border-shrine-teal"
      >
        <div className="flex items-start gap-3">
          <Info className="text-shrine-teal flex-shrink-0 mt-1" size={20} />
          <div className="text-sm text-aged-paper/80">
            <p className="mb-2">
              <strong className="text-sheikah-blue">Ancient Tech Controls:</strong>
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Left click + drag to rotate the cycle</li>
              <li>Right click + drag to reposition view</li>
              <li>Scroll to zoom in/out</li>
            </ul>
            <p className="mt-3 text-ancient-gold">
              <strong>Note:</strong> This is a placeholder model. You can replace it with your actual bike's 3D model later!
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3D Model */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Suspense
          fallback={
            <div className="w-full h-[600px] rounded-lg border-2 border-sheikah-blue bg-gradient-to-b from-dark-stone to-slate-blue flex items-center justify-center">
              <div className="text-center">
                <Box className="animate-spin text-sheikah-blue mx-auto mb-4" size={48} />
                <p className="text-sheikah-blue sheikah-glow">Loading Master Cycle...</p>
              </div>
            </div>
          }
        >
          <BikeModel />
        </Suspense>
      </motion.div>

      {/* Model Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-spirit-yellow/20 to-ancient-gold/20 rounded-lg p-6 border-2 border-spirit-yellow"
      >
        <h3 className="text-xl font-bold text-spirit-yellow mb-4">Ancient Technology Specs</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-aged-paper/70 block mb-1">Model Type</span>
            <span className="text-sheikah-blue font-bold">Master Cycle Zero</span>
          </div>
          <div>
            <span className="text-aged-paper/70 block mb-1">Rendering Engine</span>
            <span className="text-sheikah-blue font-bold">Sheikah Slate Technology</span>
          </div>
          <div>
            <span className="text-aged-paper/70 block mb-1">Interactive</span>
            <span className="text-stamina-green font-bold">✓ Yes</span>
          </div>
          <div>
            <span className="text-aged-paper/70 block mb-1">Ancient Lighting</span>
            <span className="text-stamina-green font-bold">✓ Enabled</span>
          </div>
        </div>
        <div className="mt-4 p-4 bg-slate-blue/30 rounded-lg border-2 border-ancient-gold/30">
          <p className="text-aged-paper/80 text-sm">
            <strong className="text-ancient-gold">Champion's Tip:</strong> You can export your bike's 3D model from 
            software like Blender or download models from sites like Sketchfab, then import them here 
            to see your actual motorcycle in 3D! The Master Cycle awaits your customization.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
