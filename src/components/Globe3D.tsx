import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const spikeCount = 2000;

  const spikeData = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(4, 20);
    const pos = geo.attributes.position;
    const nor = geo.attributes.normal;
    const spikes: { pos: [number, number, number]; normal: [number, number, number]; len: number }[] = [];

    for (let i = 0; i < spikeCount; i++) {
      const idx = Math.floor(Math.random() * (pos.count / 3)) * 3;
      spikes.push({
        pos: [pos.getX(idx), pos.getY(idx), pos.getZ(idx)],
        normal: [nor.getX(idx), nor.getY(idx), nor.getZ(idx)],
        len: 0.02 + Math.random() * 0.15,
      });
    }
    return spikes;
  }, []);

  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x += (mouseRef.current.y * 0.0003 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[4, 20]} />
        <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.3} />
      </mesh>
      {spikeData.map((spike, i) => (
        <mesh
          key={i}
          position={[
            spike.pos[0] + spike.normal[0] * 4,
            spike.pos[1] + spike.normal[1] * 4,
            spike.pos[2] + spike.normal[2] * 4,
          ]}
          lookAt={[
            spike.pos[0] + spike.normal[0] * 5,
            spike.pos[1] + spike.normal[1] * 5,
            spike.pos[2] + spike.normal[2] * 5,
          ]}
        >
          <cylinderGeometry args={[0.005 + Math.random() * 0.005, 0.01, spike.len, 4]} />
          <meshStandardMaterial
            color="#D6AE7B"
            roughness={0.4}
            metalness={0.6}
            emissive="#D6AE7B"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D6AE7B" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFFFFF" />
    </group>
  );
}

export default function Globe3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.3}
          maxPolarAngle={Math.PI / 2 + 0.3}
        />
      </Canvas>
    </div>
  );
}
