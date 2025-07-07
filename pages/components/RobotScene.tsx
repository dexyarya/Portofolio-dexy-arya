// components/RobotScene.tsx
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';

function lerpRadians(a: number, b: number, t: number): number {
  const max = Math.PI * 2;
  const delta = ((b - a + Math.PI) % max) - Math.PI;
  return a + delta * t;
}

function Robot({ mouse, isMouseInside }: { mouse: THREE.Vector2; isMouseInside: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/robo_obj_pose4.glb');
  const idleRotation = useRef(0);

  useFrame(() => {
    if (!group.current) return;

    if (isMouseInside) {
      const targetY = mouse.x * 0.5;
      const targetX = mouse.y * 0.2;

      group.current.rotation.y = lerpRadians(group.current.rotation.y, targetY, 0.05);
      group.current.rotation.x = lerpRadians(group.current.rotation.x, targetX, 0.05);
    } else {
      idleRotation.current += 0.003;
      group.current.rotation.y = idleRotation.current;
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

// Komponen wrapper agar bisa kontrol kamera dari luar
const RobotScene = forwardRef((_, ref) => {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [isMouseInside, setIsMouseInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetCameraPosition = useRef<THREE.Vector3 | null>(null);
  // const cameraRef = useRef<THREE.PerspectiveCamera>(null);

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
      const newTarget = new THREE.Vector3(...positions[target]);
      targetCameraPosition.current = newTarget;
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleEnter = () => setIsMouseInside(true);
    const handleLeave = () => setIsMouseInside(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
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
