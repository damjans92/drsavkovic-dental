"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Float, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function ToothModel({ onReady }: { onReady: () => void }) {
  const meshRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/3d/zub-model.glb");

  useEffect(() => {
    if (!scene) return;

    // 1. Pivot Fix
    // const box = new THREE.Box3().setFromObject(scene);
    // const center = box.getCenter(new THREE.Vector3());
    // scene.position.sub(center);

    // Starting state - small scale
    meshRef.current.scale.set(0, 0, 0);

    // 2. Intro animacija sa callback-om
    gsap.to(meshRef.current.scale, {
      x: 0.7,
      y: 0.7,
      z: 0.7,
      duration: 1.2,
      delay: 0.5, // Dajemo overlay-u vremena da se "smiri"
      ease: "power4.out",
      onComplete: onReady, // Javljamo sceni da je zub na ekranu
    });

    // 3. Scroll Rotacija
    ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        if (meshRef.current) {
          meshRef.current.rotation.y = self.progress * Math.PI * 2;
        }
      },
    });
  }, [scene, onReady]);

  return (
    <group ref={meshRef} position={[1.8, 0, 0]}>
      {/* Rim Lights */}
      <spotLight
        position={[14, 2, -2]}
        intensity={100}
        color="#00ffff"
        distance={20}
        angle={0.5}
        penumbra={1}
      />
      <spotLight
        position={[-10, 2, -5]}
        intensity={100}
        color="#00ffff"
        distance={30}
        angle={0.5}
        penumbra={1}
      />

      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

export default function CanvasScene() {
  const { progress } = useProgress();
  const [showOverlay, setShowOverlay] = useState(true);
  const [modelReady, setModelReady] = useState(false);

  // Gasimo overlay tek kada je progress 100 I modelReady true
  useEffect(() => {
    if (progress === 100 && modelReady) {
      // Lagani fade-out overlay-a umesto naglog nestajanja
      gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.8,
        onComplete: () => setShowOverlay(false),
      });
    }
  }, [progress, modelReady]);

  return (
    <>
      {showOverlay && (
        <div className="loading-screen fixed inset-0 z-[100] bg-slate-500 flex flex-col items-center justify-center text-white transition-opacity duration-300">
          {/* LOGO SEKCIJA - Suptilan ulaz */}
          <div className="mb-12 animate-pulse">
            <Image
              src="/dr-savkovic-dental-logo.svg"
              alt="Dr Savkovic Logo"
              width={240} // Malo smanjen radi elegancije
              height={80}
              className="invert opacity-80"
            />
          </div>

          {/* PROGRES SEKCIJA */}
          <div className="flex flex-col items-center w-64">
            {/* Minimalistički tekst iznad bara */}
            <div className="w-full flex justify-between items-end mb-2">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-light">
                Sistemska Provera
              </span>
              <span className="text-sm font-medium tabular-nums text-cyan-400">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Tanji progres bar (samo 1-2px za high-tech look) */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-cyan-500 shadow-[0_0_15px_#00ffff] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status poruka koja se menja */}
            <div className="mt-4 h-4">
              {" "}
              {/* Fiksna visina sprečava skakanje layouta */}
              {progress === 100 ? (
                <span className="text-[9px] tracking-[0.2em] uppercase text-cyan-200 animate-pulse">
                  Generisanje 3D geometrije...
                </span>
              ) : (
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-30">
                  Učitavanje resursa
                </span>
              )}
            </div>
          </div>

          {/* {progress === 100 && (
            <div className="mt-4 text-xs opacity-50 animate-pulse uppercase">
              Renderovanje geometrije...
            </div>
          )} */}
        </div>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />

          <ToothModel onReady={() => setModelReady(true)} />

          <Environment preset="city" />
        </Canvas>
      </div>
    </>
  );
}
