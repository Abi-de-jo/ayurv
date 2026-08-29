"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

function LuxuryBottle() {
  const bottleGroup = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (bottleGroup.current) {
      // Smooth subtle floating rotation
      bottleGroup.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.25;
      bottleGroup.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.08;
    }
  });

  return (
    <group ref={bottleGroup} position={[0, -0.2, 0]} scale={1.25}>
      {/* Bottle Glass Body - Deep Ayurvedic Emerald Green */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.85, 2.6, 32]} />
        <meshPhysicalMaterial
          color="#0B3D2E"
          roughness={0.15}
          metalness={0.1}
          transmission={0.65}
          ior={1.45}
          thickness={0.5}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Gold Foil Metallic Label Collar */}
      <mesh position={[0, 0.1, 0.02]}>
        <cylinderGeometry args={[0.91, 0.91, 1.4, 32, 1, true]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Label Black Insert */}
      <mesh position={[0, 0.1, 0.03]}>
        <cylinderGeometry args={[0.915, 0.915, 1.2, 32, 1, true]} />
        <meshStandardMaterial
          color="#0A0A0A"
          roughness={0.4}
        />
      </mesh>

      {/* Gold Bottle Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Gold Metallic Cap */}
      <mesh ref={capRef} position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.6, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Rubber Dropper Bulb */}
      <mesh position={[0, 2.35, 0]}>
        <sphereGeometry args={[0.3, 32, 16]} />
        <meshStandardMaterial color="#101512" roughness={0.8} />
      </mesh>

      {/* Gold Base Ring Accent */}
      <mesh position={[0, -1.3, 0]}>
        <torusGeometry args={[0.88, 0.04, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

export function Hero3DBottle() {
  return (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#F0D687" />
        <directionalLight position={[-5, -2, -3]} intensity={1.5} color="#2FA36B" />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#D4AF37" />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <LuxuryBottle />
        </Float>

        {/* Floating Botanical Gold Sparkles */}
        <Sparkles
          count={60}
          scale={7}
          size={3.5}
          speed={0.6}
          opacity={0.7}
          color="#D4AF37"
        />
        <Sparkles
          count={40}
          scale={6}
          size={4}
          speed={0.4}
          opacity={0.5}
          color="#2FA36B"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
