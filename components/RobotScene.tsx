'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';

// Fungsi untuk rotasi yang smooth
function lerpRadians(a: number, b: number, t: number): number {
  const max = Math.PI * 2;
  const delta = ((b - a + Math.PI) % max) - Math.PI;
  return a + delta * t;
}

// Komponen Robot
function Robot({ mouse, isMouseInside }: { mouse: THREE.Vector2; isMouseInside: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/robo_obj_pose4.glb');

  const idleRotation = useRef(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const lastMouse = useRef(new THREE.Vector2(0, 0));
  const headRef = useRef<THREE.Object3D | null>(null);

  // Cari node kepala (jika ada)
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.name.toLowerCase().includes('head')) {
          headRef.current = child;
        }
      });
    }
  }, [scene]);

  useFrame(({ camera }) => {
    if (!group.current) return;

    if (isMouseInside) {
      // Hitung pergerakan kursor (delta)
      const deltaX = mouse.x - lastMouse.current.x;
      const deltaY = mouse.y - lastMouse.current.y;
      lastMouse.current.copy(mouse);

      // Update target rotasi
      targetRotation.current.y += deltaX * 0.5;
      targetRotation.current.x += deltaY * 0.5;

      targetRotation.current.x = THREE.MathUtils.clamp(targetRotation.current.x, -0.4, 0.4);
      targetRotation.current.y = THREE.MathUtils.clamp(targetRotation.current.y, -1.2, 1.2);

      // Smooth ke target
      group.current.rotation.y = lerpRadians(group.current.rotation.y, targetRotation.current.y, 0.1);
      group.current.rotation.x = lerpRadians(group.current.rotation.x, targetRotation.current.x, 0.1);

      // lookAt untuk kepala robot
      if (headRef.current) {
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
        headRef.current.lookAt(vector);
      }
    } else {
      idleRotation.current += 0.002;
      group.current.rotation.y = idleRotation.current;
      group.current.rotation.x = 0;

      targetRotation.current.x = 0;
      targetRotation.current.y = idleRotation.current;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.25}
      position={[0, -1.6, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Wrapper dengan kontrol kamera
const RobotScene = forwardRef((_, ref) => {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [isMouseInside, setIsMouseInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetCameraPosition = useRef<THREE.Vector3 | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    mouse.current.x = x * 2 - 1;
    mouse.current.y = -(y * 2 - 1);
  };

  useImperativeHandle(ref, () => ({
    moveCameraTo: (target: 'default' | 'head' | 'hand' | 'torso') => {
      const positions: Record<string, [number, number, number]> = {
        default: [0, 1, 4],
        head: [0, 1.5, 2],
        hand: [1.5, 0.5, 2],
        torso: [0, 0.5, 3],
      };
      targetCameraPosition.current = new THREE.Vector3(...positions[target]);
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const enter = () => setIsMouseInside(true);
    const leave = () => setIsMouseInside(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', enter);
    container.addEventListener('mouseleave', leave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', enter);
      container.removeEventListener('mouseleave', leave);
    };
  }, []);

  const CameraAnimator = () => {
    const { camera } = useThree();
    useFrame(() => {
      if (targetCameraPosition.current) {
        camera.position.lerp(targetCameraPosition.current, 0.05);
      }
    });
    return null;
  };

  return (
    <div className="absolute inset-0 z-0" ref={containerRef}>
      <Canvas camera={{ position: [0, 1, 4] }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[2, 4, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="sunset" />
        <ContactShadows position={[0, -1.3, 0]} opacity={0.2} scale={5} blur={2} far={4} />
        <Robot mouse={mouse.current} isMouseInside={isMouseInside} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        <CameraAnimator />
      </Canvas>
    </div>
  );
});
RobotScene.displayName = 'RobotScene';
export default RobotScene;
