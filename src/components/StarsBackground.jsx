import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ---------- Adaptive quality ----------

const useDeviceTier = () => {
  const [tier, setTier] = useState("high");
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    setTier(coarse || narrow ? "low" : "high");
  }, []);
  return tier;
};

// ---------- Nebula: multiple drifting clouds in requested palette ----------

const useGradientTexture = (colorHex) =>
  useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `${colorHex}55`);
    gradient.addColorStop(0.5, `${colorHex}1a`);
    gradient.addColorStop(1, `${colorHex}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, [colorHex]);

const NebulaCloud = ({ color, position, scale, speed, mouseRef }) => {
  const ref = useRef();
  const texture = useGradientTexture(color);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t) * 4 + mouseRef.current.x * 3;
    ref.current.position.y = position[1] + Math.cos(t * 0.8) * 3 + mouseRef.current.y * 2;
    ref.current.material.rotation = t * 0.04;
  });

  return (
    <sprite ref={ref} position={position} scale={scale}>
      <spriteMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
};

const Nebula = ({ mouseRef }) => (
  <>
    <NebulaCloud color="#6D4AFF" position={[-35, 12, -70]} scale={[90, 90, 1]} speed={0.025} mouseRef={mouseRef} />
    <NebulaCloud color="#A855F7" position={[45, -18, -85]} scale={[100, 100, 1]} speed={0.02} mouseRef={mouseRef} />
    <NebulaCloud color="#3B82F6" position={[0, 25, -95]} scale={[80, 80, 1]} speed={0.018} mouseRef={mouseRef} />
    <NebulaCloud color="#E879F9" position={[-25, -25, -75]} scale={[70, 70, 1]} speed={0.03} mouseRef={mouseRef} />
  </>
);

// ---------- Tiny distant galaxies ----------

const DistantGalaxy = ({ position, color, size, speed }) => {
  const ref = useRef();
  const texture = useGradientTexture(color);
  useFrame((state) => {
    if (ref.current) ref.current.material.rotation = state.clock.elapsedTime * speed;
  });
  return (
    <sprite ref={ref} position={position} scale={[size, size, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
};

// ---------- Star layers with real depth-based parallax ----------

const StarLayers = ({ mouseRef, tier }) => {
  const near = useRef();
  const mid = useRef();
  const far = useRef();
  const counts = tier === "low" ? [1200, 900, 600] : [3000, 2200, 1500];

  useFrame((_, delta) => {
    if (near.current) {
      near.current.rotation.y += delta * 0.012;
      near.current.rotation.x = THREE.MathUtils.lerp(near.current.rotation.x, mouseRef.current.y * 0.05, 0.03);
      near.current.rotation.y += mouseRef.current.x * 0.0006;
    }
    if (mid.current) mid.current.rotation.y += delta * 0.006;
    if (far.current) far.current.rotation.y -= delta * 0.003;
  });

  return (
    <>
      <group ref={near}>
        <Stars radius={50} depth={30} count={counts[0]} factor={3.5} saturation={0} fade speed={0.7} />
      </group>
      <group ref={mid}>
        <Stars radius={90} depth={60} count={counts[1]} factor={3} saturation={0} fade speed={0.4} />
      </group>
      <group ref={far}>
        <Stars radius={150} depth={100} count={counts[2]} factor={4.5} saturation={0} fade speed={0.15} />
      </group>
    </>
  );
};

// ---------- Occasional shooting star (kept from your version, lightly cleaned) ----------

const ShootingStar = () => {
  const ref = useRef();
  const trailRef = useRef();
  const active = useRef(false);
  const progress = useRef(0);
  const elapsed = useRef(0);
  const nextTrigger = useRef(4 + Math.random() * 4);
  const startPos = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    elapsed.current += delta;

    if (!active.current && elapsed.current > nextTrigger.current) {
      active.current = true;
      progress.current = 0;
      const y = (Math.random() - 0.5) * 20 + 5;
      startPos.current.set(-60, y, -20 - Math.random() * 20);
      endPos.current.set(60, y - 15 - Math.random() * 10, startPos.current.z);
      elapsed.current = 0;
      nextTrigger.current = 7 + Math.random() * 8;
    }

    if (active.current && ref.current) {
      progress.current += delta * 0.6;
      if (progress.current >= 1) {
        active.current = false;
        ref.current.visible = false;
        if (trailRef.current) trailRef.current.visible = false;
      } else {
        ref.current.visible = true;
        ref.current.position.lerpVectors(startPos.current, endPos.current, progress.current);
        const opacity = progress.current < 0.15 ? progress.current / 0.15 : 1 - (progress.current - 0.15) / 0.85;
        ref.current.material.opacity = Math.max(0, opacity);
        if (trailRef.current) {
          trailRef.current.visible = true;
          trailRef.current.position.copy(ref.current.position);
          trailRef.current.lookAt(endPos.current);
          trailRef.current.rotateX(Math.PI / 2);
          trailRef.current.material.opacity = Math.max(0, opacity) * 0.7;
        }
      }
    }
  });

  return (
    <>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={trailRef} visible={false} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 8, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
    </>
  );
};

// ---------- Scene ----------

const Scene = ({ tier }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      mouse.current.x = (clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (clientY / window.innerHeight - 0.5) * 2;
    };
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useFrame(() => {
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouse.current.y * 0.08, 0.03);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouse.current.x * 0.12, 0.03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetRotation.current.y * 3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -targetRotation.current.x * 3, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#050816", 40, 150]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 20]} intensity={0.4} color="#a855f7" />
      <StarLayers mouseRef={mouse} tier={tier} />
      <Nebula mouseRef={mouse} />
      {tier === "high" && (
        <>
          <DistantGalaxy position={[-50, 30, -120]} color="#3B82F6" size={25} speed={0.008} />
          <DistantGalaxy position={[55, -35, -130]} color="#E879F9" size={20} speed={0.01} />
        </>
      )}
      <ShootingStar />
    </>
  );
};

// ---------- Exported background ----------

const StarsBackground = () => {
  const [ready, setReady] = useState(false);
  const tier = useDeviceTier();

  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "#050816",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, tier === "low" ? 1.25 : 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene tier={tier} />
      </Canvas>
    </div>
  );
};

export default StarsBackground;
