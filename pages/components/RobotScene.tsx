// components/RobotScene.tsx
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Robot({ mouse }: { mouse: THREE.Vector2 }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/robo_obj_pose4.glb');
  

  useFrame(() => {
    if (group.current) {
      // Rotasi kepala mengikuti kursor
      group.current.rotation.y = mouse.x * 0.5;
      group.current.rotation.x = mouse.y * 0.2;
    }
  });

 return <primitive ref={group} object={scene} scale={0.28} position={[0, -1.6, 0]} />;
}

export default function RobotScene() {
  const mouse = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 1, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 5]} />
        <Robot mouse={mouse.current} />
      </Canvas>
    </div>
  );
}
