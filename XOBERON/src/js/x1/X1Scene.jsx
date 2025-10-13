import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";

function FloatingSphere() {
  const sphereRef = useRef(null);
  const lightRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.mouse.x * 20;
      lightRef.current.position.y = state.mouse.y * 20;
    }
    if (sphereRef.current) {
      const targetX = isHovered ? state.mouse.x / 2 : 0;
      const targetY = Math.sin(state.clock.elapsedTime / 1.5) / 6 + (isHovered ? state.mouse.y / 2 : 0);
      sphereRef.current.position.x += (targetX - sphereRef.current.position.x) * 0.2;
      sphereRef.current.position.y += (targetY - sphereRef.current.position.y) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[0, 0, -15]} intensity={1} color="#F8C069" />
      <mesh
        ref={sphereRef}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
      </mesh>
      <Environment preset="warehouse" />
      <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} opacity={0.45} width={15} height={15} blur={2.5} far={1.6} />
    </>
  );
}

export const X1Scene = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 75 }} style={{ background: "#EBD9B4", width: "100%", height: "100%" }}>
      <FloatingSphere />
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};


