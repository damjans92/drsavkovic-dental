"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ToothModel() {
  const ref = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF("/models/zub-model.glb");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Fade-in i scale-in kada se model ucita
    if (!ref.current || !loaded) return;

    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ref.current.rotation,
      { y: 0 },
      {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "none",
      }
    );
  }, [loaded]);

  return <primitive ref={ref} object={scene} scale={2} position={[0, 0, 0]} />;
}
export default ToothModel;
