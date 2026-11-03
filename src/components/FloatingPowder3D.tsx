import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function FloatingPowder3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Create circular soft powder particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 235, 230, 1)');
    gradient.addColorStop(0.2, 'rgba(232, 197, 189, 0.85)');
    gradient.addColorStop(0.6, 'rgba(201, 149, 131, 0.4)');
    gradient.addColorStop(1, 'rgba(201, 149, 131, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    // Particle Geometry (Rose gold & blush cosmetic powder)
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z

      scales[i] = Math.random() * 8 + 4;

      velocities[i * 3] = (Math.random() - 0.5) * 0.15; // vx
      velocities[i * 3 + 1] = -Math.random() * 0.25 - 0.08; // vy (drifting downward like fine powder)
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // vz
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      size: 16,
      map: texture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Parallax smooth camera drift
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Particle physics: float, drift, and sway like cosmetic micro-powder
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += Math.sin(elapsedTime * 0.8 + i) * 0.2 + velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += Math.cos(elapsedTime * 0.6 + i) * 0.15;

        // Reset if drifted out of bounds
        if (array[i * 3 + 1] < -450) {
          array[i * 3 + 1] = 450;
          array[i * 3] = (Math.random() - 0.5) * 800;
        }
      }

      posAttr.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden mix-blend-screen opacity-80"
      aria-hidden="true"
    />
  );
}
