'use client';

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { FontLoader, Font, TextGeometry } from 'three-stdlib';
import gsap from 'gsap';

interface CustomTextGeometryParameters {
  font: Font;
  size?: number;
  height?: number;
  curveSegments?: number;
  bevelEnabled?: boolean;
  bevelThickness?: number;
  bevelSize?: number;
  bevelOffset?: number;
  bevelSegments?: number;
}

interface ThreeDTextProps {
  text: string;
  color?: string;
  glowColor?: string;
}

const ThreeDText: React.FC<ThreeDTextProps> = ({
  text,
  color = '#00FF88',
  glowColor = '#00FF88',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const textMeshRef = useRef<THREE.Mesh | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const mouse = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const pointLight = new THREE.PointLight(glowColor, 2, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Load font
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_bold.typeface.json', (font: Font) => {
      const cfg: CustomTextGeometryParameters = {
        font,
        size: 0.6,
        height: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.005,
        bevelSegments: 3,
        curveSegments: 12,
      };

      const geo = new TextGeometry(text, cfg);
      geo.center();

      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.5,
        roughness: 0.3,
        transparent: true,
        opacity: 1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      textMeshRef.current = mesh;
      scene.add(mesh);
      setFontLoaded(true);
    });

    // Mouse move: untuk efek tilt
    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const nx = (e.clientX - left) / width * 2 - 1;
      const ny = -((e.clientY - top) / height) * 2 + 1;
      mouse.current.dx = nx - mouse.current.x;
      mouse.current.dy = ny - mouse.current.y;
      mouse.current.x = nx;
      mouse.current.y = ny;

      const v = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      pointLight.position.lerp(v, 0.1);

      if (textMeshRef.current) {
        gsap.to(textMeshRef.current.rotation, {
          x: mouse.current.dy * 0.3,
          y: -mouse.current.dx * 0.3,
          duration: 0.3,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Hover bounce effect
    const onHover = () => {
      if (textMeshRef.current) {
        gsap.to(textMeshRef.current.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.4,
          ease: 'bounce.out',
        });
      }
    };
    container.addEventListener('mouseenter', onHover);

    // Scroll effect to fade and shrink
    const onScroll = () => {
      if (!textMeshRef.current) return;

      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollTop / maxScroll, 1); // 0 to 1

      const scale = 1 - progress * 0.5;
      const opacity = 1 - progress;

      gsap.to(textMeshRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (
        textMeshRef.current.material &&
        textMeshRef.current.material instanceof THREE.MeshStandardMaterial
      ) {
        textMeshRef.current.material.opacity = opacity;
      }
    };
    window.addEventListener('scroll', onScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mouseenter', onHover);
      renderer.dispose();
      scene.clear();
    };
  }, [text, color, glowColor]);

  return (
    <div className="relative w-full h-full min-h-[100px] overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      {!fontLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Loading 3D Text...
        </div>
      )}
    </div>
  );
};

export default ThreeDText;
