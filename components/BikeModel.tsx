'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Motorcycle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 0.8]} />
        <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.2} emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Fuel Tank */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.7]} />
        <meshStandardMaterial color="#ff00ff" metalness={0.9} roughness={0.1} emissive="#ff006e" emissiveIntensity={0.4} />
      </mesh>

      {/* Front Wheel */}
      <group position={[1.2, -0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.21, 32]} />
          <meshStandardMaterial color="#00d4ff" metalness={1} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Rear Wheel */}
      <group position={[-1.2, -0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.21, 32]} />
          <meshStandardMaterial color="#00d4ff" metalness={1} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Handlebars */}
      <mesh position={[1.3, 0.8, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.3, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Seat */}
      <mesh position={[-0.3, 0.8, 0]} castShadow>
        <boxGeometry args={[1, 0.2, 0.6]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Headlight */}
      <mesh position={[1.5, 0.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={1} />
      </mesh>

      {/* Tail Light */}
      <mesh position={[-1.2, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.4]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>

      {/* Front Fork */}
      <mesh position={[1.2, 0, 0.3]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.2, 0, -0.3]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Exhaust */}
      <mesh position={[-0.8, -0.2, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Engine Block */}
      <mesh position={[0.2, -0.3, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function BikeModel() {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border-2 border-cyan bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#00d4ff"
        />

        {/* Motorcycle Model */}
        <Motorcycle />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.8}
            roughness={0.4}
            opacity={0.8}
            transparent
          />
        </mesh>

        {/* Grid Helper */}
        <gridHelper args={[20, 20, '#00ffff', '#2d2d44']} position={[0, -0.99, 0]} />
      </Canvas>
    </div>
  );
}

