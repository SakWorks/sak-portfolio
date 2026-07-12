import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function NebulaHaze() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(120,90,220,0.35)");
    gradient.addColorStop(0.5, "rgba(90,60,180,0.12)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      <sprite position={[-40, 15, -80]} scale={[90, 90, 1]}>
        <spriteMaterial map={texture} transparent opacity={0.5} depthWrite={false} />
      </sprite>
      <sprite position={[50, -20, -100]} scale={[110, 110, 1]}>
        <spriteMaterial map={texture} transparent opacity={0.35} depthWrite={false} />
      </sprite>
    </group>
  );
}

function StarLayers({ mouse }) {
  const groupRef = useRef();
  const layer1 = useRef();
  const layer2 = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.01;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.05,
        0.02
      );
      groupRef.current.rotation.y +=
        (mouse.current.x * 0.05 - groupRef.current.rotation.y * 0.001) * 0.01;
    }
    if (layer1.current) layer1.current.rotation.y += delta * 0.006;
    if (layer2.current) layer2.current.rotation.y -= delta * 0.004;
  });

  return (
    <group ref={groupRef}>
      <group ref={layer1}>
        <Stars radius={80} depth={50} count={3500} factor={3} saturation={0} fade speed={0.6} />
      </group>
      <group ref={layer2}>
        <Stars radius={130} depth={80} count={2000} factor={4.5} saturation={0} fade speed={0.3} />
      </group>
      <NebulaHaze />
    </group>
  );
}

function ShootingStar() {
  const ref = useRef();
  const trailRef = useRef();
  const active = useRef(false);
  const progress = useRef(0);
  const nextTrigger = useRef(4);
  const elapsed = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    elapsed.current += delta;

   if (!active.current && elapsed.current > nextTrigger.current) {
  active.current = true;
  progress.current = 0;
  const y = (Math.random() - 0.5) * 20 + 5;
  startPos.current.set(-60, y, -20 - Math.random() * 20);
  endPos.current.set(60, y - 15 - Math.random() * 10, -20 - Math.random() * 20);
  elapsed.current = 0;
  nextTrigger.current = 7 + Math.random() * 8;
}
    if (active.current && ref.current) {
      progress.current += delta * 0.6;
      if (progress.current >= 1) {
        active.current = false;
        ref.current.visible = false;
      } else {
        ref.current.visible = true;
        ref.current.position.lerpVectors(startPos.current, endPos.current, progress.current);
        const opacity = progress.current < 0.15 ? progress.current / 0.15 : 1 - (progress.current - 0.15) / 0.85;
        ref.current.material.opacity = Math.max(0, opacity);
       if (trailRef.current) {
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
}

function Scene() {
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
    <fog attach="fog" args={["#050816", 40, 140]} />
    <ambientLight intensity={0.3} />
    <StarLayers mouse={mouse} />
    <ShootingStar />
  </>
);
}

const StarsBackground = () => {
  const [ready, setReady] = useState(false);
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
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default StarsBackground;