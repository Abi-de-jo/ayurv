"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function LuxuryBottle() {
  const bottleGroup = useRef<THREE.Group>(null);

  // Dynamically map full label adapted to bottle height & width (with checkerboard auto-cleared)
  const labelTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Dark Emerald Texture Background matching the bottle glass
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, "#082117");
    grad.addColorStop(0.5, "#0D2C20");
    grad.addColorStop(1, "#082117");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Load uploaded real product photo
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/ayurvya-product.png";
    img.onload = () => {
      ctx.clearRect(0, 0, 1024, 1024);

      // Crop full label card area from product photo
      const sx = img.width * 0.22;
      const sy = img.height * 0.28;
      const sWidth = img.width * 0.56;
      const sHeight = img.height * 0.64;

      // Draw label filling 100% of the texture canvas (full height & width)
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, 1024, 1024);

      // Clean out any white/grey checkerboard pattern pixels on side margins
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      const data = imgData.data;
      for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
          // Check side margins where fake PNG checkerboard background lives
          if (x < 180 || x > 840) {
            const idx = (y * 1024 + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b) / 3;
            const diff = Math.max(r, g, b) - Math.min(r, g, b);

            // Replace white/light grey checkerboard background with emerald glass color
            if (brightness > 150 && diff < 35) {
              data[idx] = 8;
              data[idx + 1] = 33;
              data[idx + 2] = 23;
              data[idx + 3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      texture.needsUpdate = true;
    };

    return texture;
  }, []);

  // Generate realistic Back Label Texture (How to use, Ingredients, MRP, Barcode)
  const backLabelTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background - Dark Obsidian Emerald Texture matching real bottle
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, "#082117");
    grad.addColorStop(0.5, "#0D2C20");
    grad.addColorStop(1, "#082117");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Outer Gold Foil Border
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 10;
    ctx.strokeRect(36, 36, 952, 952);

    // Inner Fine Gold Border
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 924, 924);

    // Title: HOW TO USE
    ctx.fillStyle = "#F0D687";
    ctx.font = "bold 42px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ HOW TO USE ✦", 512, 120);

    ctx.fillStyle = "#F5F3EC";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("1. Take 5–10 drops onto palms or scalp.", 90, 180);
    ctx.fillText("2. Massage gently in circular motions for 5 mins.", 90, 220);
    ctx.fillText("3. Leave 1 hr or overnight before washing.", 90, 260);

    // Divider line
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, 295);
    ctx.lineTo(934, 295);
    ctx.stroke();

    // Title: KEY INGREDIENTS
    ctx.fillStyle = "#F0D687";
    ctx.font = "bold 38px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ 40+ AYURVEDIC INGREDIENTS ✦", 512, 350);

    ctx.fillStyle = "#8A8F8C";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Bhringraj • Amla • Shikakai • Brahmi • Jatamansi • Rosemary", 512, 400);
    ctx.fillText("Hibiscus • Neem • Vetiver • Coconut & Cold-Pressed Oils", 512, 435);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(90, 470);
    ctx.lineTo(934, 470);
    ctx.stroke();

    // Benefits & Caution
    ctx.fillStyle = "#F0D687";
    ctx.font = "bold 32px serif";
    ctx.fillText("BENEFITS & FORMULATION", 512, 520);

    ctx.fillStyle = "#F5F3EC";
    ctx.font = "22px sans-serif";
    ctx.fillText("• Reduces Hair Fall  • Stimulates Scalp  • Deep Moisture & Shine", 512, 560);

    ctx.fillStyle = "#8A8F8C";
    ctx.font = "18px monospace";
    ctx.fillText("100% Ayurvedic • Zero Sulphates • Zero Parabens • Cruelty Free", 512, 600);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(90, 630);
    ctx.lineTo(934, 630);
    ctx.stroke();

    // Product Details Grid (Net Wt, MRP, Mfd Details)
    ctx.fillStyle = "#F0D687";
    ctx.font = "bold 26px monospace";
    ctx.textAlign = "left";
    ctx.fillText("NET QTY: 250 ml", 90, 680);
    ctx.fillText("MRP: ₹799.00 (Incl. of all taxes)", 90, 720);
    ctx.fillText("BATCH: AY-2026-08", 90, 760);
    ctx.fillText("MFG DATE: 08/2026", 90, 800);
    ctx.fillText("EXP DATE: 07/2028", 90, 840);

    // Draw Barcode on bottom right
    ctx.fillStyle = "#F5F3EC";
    ctx.fillRect(660, 670, 270, 110);
    ctx.fillStyle = "#0A0A0A";
    const barPattern = [4, 2, 6, 2, 4, 8, 2, 6, 4, 2, 6, 4, 8, 2, 4, 6, 2, 4, 6, 8, 4, 2];
    let bx = 675;
    for (let i = 0; i < barPattern.length; i++) {
      const w = barPattern[i];
      if (i % 2 === 0) {
        ctx.fillRect(bx, 680, w, 80);
      }
      bx += w + 2;
    }

    // Mfd By footer
    ctx.fillStyle = "#8A8F8C";
    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Mfd. By: Ayurvya Wellness Pvt. Ltd., Tamil Nadu, India", 512, 920);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Ribbed knurling lines for the gold cap collar
  const knurlRibs = useMemo(() => {
    const ribs = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.428;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ribs.push(
        <mesh key={i} position={[x, 1.72, z]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[0.02, 0.44, 0.02]} />
          <meshStandardMaterial color="#E8C965" roughness={0.2} metalness={0.95} />
        </mesh>
      );
    }
    return ribs;
  }, []);

  useFrame((state) => {
    if (bottleGroup.current) {
      // Gentle realistic floating rotation
      bottleGroup.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.35) * 0.35;
      bottleGroup.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.25) * 0.05;
    }
  });

  return (
    <group ref={bottleGroup} position={[0, -0.25, 0]} scale={1.22}>
      {/* ================= 1. PHOTOREALISTIC EMERALD GLASS BODY ================= */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 2.7, 64]} />
        <meshPhysicalMaterial
          color="#033322"
          roughness={0.06}
          metalness={0.1}
          transmission={0.92}
          ior={1.52}
          thickness={0.9}
          reflectivity={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* ================= 2. INNER HERBAL OIL LIQUID ================= */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.73, 0.73, 2.5, 48]} />
        <meshPhysicalMaterial
          color="#074229"
          roughness={0.18}
          transmission={0.65}
          thickness={1.3}
          ior={1.42}
        />
      </mesh>

      {/* ================= 3. FRONT REAL PRODUCT LABEL (FULL FIT, NO CHECKERBOARD) ================= */}
      <mesh position={[0, 0, 0.005]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[0.786, 0.786, 2.45, 64, 1, true, -Math.PI / 2.3, Math.PI / 1.15]}
        />
        <meshStandardMaterial
          map={labelTexture}
          transparent
          alphaTest={0.05}
          roughness={0.3}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ================= 3B. BACK PRODUCT LABEL (FULL FIT) ================= */}
      <mesh position={[0, 0, -0.005]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry
          args={[0.786, 0.786, 2.45, 64, 1, true, -Math.PI / 2.3, Math.PI / 1.15]}
        />
        <meshStandardMaterial
          map={backLabelTexture}
          transparent
          alphaTest={0.05}
          roughness={0.3}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ================= 4. GLASS DROPPER PIPETTE ================= */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 2.2, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.96}
          roughness={0.04}
          ior={1.48}
          transparent
        />
      </mesh>

      {/* ================= 5. BASE & BOTTLE ACCENTS ================= */}
      {/* Bottom Gold Base Ring */}
      <mesh position={[0, -1.33, 0]}>
        <cylinderGeometry args={[0.785, 0.785, 0.07, 64]} />
        <meshStandardMaterial color="#DEB843" roughness={0.22} metalness={0.95} />
      </mesh>

      {/* Glass Bottle Shoulder Curve */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.38, 0.78, 0.22, 64]} />
        <meshPhysicalMaterial
          color="#033322"
          roughness={0.06}
          transmission={0.92}
          ior={1.52}
          transparent
        />
      </mesh>

      {/* ================= 6. PHOTOREALISTIC KNURLED GOLD CAP COLLAR ================= */}
      {/* Main Gold Collar Body */}
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.46, 64]} />
        <meshStandardMaterial
          color="#E5C253"
          roughness={0.18}
          metalness={0.96}
        />
      </mesh>

      {/* Vertical Knurling Ribs */}
      <group>{knurlRibs}</group>

      {/* Gold Flange Top Ring */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.435, 0.435, 0.04, 64]} />
        <meshStandardMaterial color="#F0D687" roughness={0.15} metalness={0.96} />
      </mesh>

      {/* Gold Flange Bottom Collar Ring */}
      <mesh position={[0, 1.49, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.06, 64]} />
        <meshStandardMaterial color="#CBA135" roughness={0.25} metalness={0.95} />
      </mesh>

      {/* ================= 7. MATTE BLACK RUBBER DROPPER BULB ================= */}
      {/* Rubber Bulb Base Ring */}
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.06, 48]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Rubber Bulb Body */}
      <mesh position={[0, 2.32, 0]}>
        <capsuleGeometry args={[0.26, 0.58, 24, 48]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      {/* Top Rubber Bulb Tip Detail */}
      <mesh position={[0, 2.64, 0]}>
        <sphereGeometry args={[0.18, 24, 16]} />
        <meshStandardMaterial color="#101010" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function Hero3DBottle() {
  return (
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] relative">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.95} />
        <directionalLight position={[4, 6, 4]} intensity={3.0} color="#FFF5DC" />
        <directionalLight position={[-4, -1, -3]} intensity={1.8} color="#2FA36B" />
        <pointLight position={[0, 1.5, 3.5]} intensity={1.8} color="#FFE699" />
        <pointLight position={[0, -2, -2]} intensity={1.2} color="#074229" />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
            <LuxuryBottle />
          </Float>
        </Suspense>

        {/* Soft ground contact shadow */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.5}
          scale={7}
          blur={2.4}
          far={4}
        />

        {/* Ambient Gold & Green Shimmer Particles */}
        <Sparkles
          count={50}
          scale={6.5}
          size={3.2}
          speed={0.5}
          opacity={0.65}
          color="#E5C158"
        />
        <Sparkles
          count={35}
          scale={5.5}
          size={3.8}
          speed={0.35}
          opacity={0.45}
          color="#38B378"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
}