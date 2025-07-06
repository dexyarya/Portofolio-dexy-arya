'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

interface ThreeDTextProps {
  text: string;
  color?: string;
  glowColor?: string;
  rotationSpeed?: number;
}

const ThreeDText: React.FC<ThreeDTextProps> = ({
  text,
  color = '#ffffff', // Warna terang
  glowColor = '#00ffff',
  rotationSpeed = 0.01,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [errorLoadingFont, setErrorLoadingFont] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111111');

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    const pointLight = new THREE.PointLight(glowColor, 1.5, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Load Font
    const loader = new FontLoader();
    let textMesh: THREE.Mesh | null = null;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    loader.load(
      '/fonts/helvetiker_bold.typeface.json', // Pastikan file ini ada di public/fonts/
      (font: Font) => {
        setFontLoaded(true);
        setErrorLoadingFont(false);

        const textGeometry = new TextGeometry(text, {
          font,
          size: 0.8,
          height: 0.05, // ✅ Tipis
          curveSegments: 8,
          bevelEnabled: true,
          bevelThickness: 0.005,
          bevelSize: 0.003,
          bevelSegments: 3,
        });

        textGeometry.center();
        textGeometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.05,
          roughness: 0.9,
          emissive: new THREE.Color(color),
          emissiveIntensity: 0.1,
        });

        textMesh = new THREE.Mesh(textGeometry, material);
        textMesh.castShadow = true;
        textMesh.receiveShadow = true;
        scene.add(textMesh);

        animate();
      },
      undefined,
      (error) => {
        console.error('❌ Gagal memuat font:', error);
        setErrorLoadingFont(true);
        setFontLoaded(false);
      }
    );

    // Animation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (textMesh) {
        textMesh.rotation.y += rotationSpeed;
        textMesh.position.y = Math.sin(elapsed * 2) * 0.2;
      }

      renderer.render(scene, camera);
    };

    // Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (textMesh) {
        textMesh.geometry.dispose();
        (textMesh.material as THREE.Material).dispose();
      }
      scene.clear();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [text, color, glowColor, rotationSpeed]);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-black rounded-lg overflow-hidden">
      {/* Background semi transparan */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0 rounded-lg" />
      {/* Tempat canvas */}
      <div ref={mountRef} className="absolute inset-0 z-10" />
      {/* Loading font */}
      {!fontLoaded && !errorLoadingFont && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg bg-black bg-opacity-60 z-20">
          Memuat font 3D...
        </div>
      )}
      {/* Error font */}
      {errorLoadingFont && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-lg bg-black bg-opacity-60 z-20">
          Gagal memuat font. Pastikan file <code>helvetiker_bold.typeface.json</code> ada di <code>/public/fonts/</code>
        </div>
      )}
    </div>
  );
};

export default ThreeDText;
