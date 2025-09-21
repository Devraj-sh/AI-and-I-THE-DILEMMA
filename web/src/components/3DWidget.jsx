"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';

// 3D Floating Brain Component
export function FloatingBrain({ size = 100, color = '#00bcd4' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create brain-like geometry
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: color,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    
    const brain = new THREE.Mesh(geometry, material);
    scene.add(brain);

    // Add some neural network lines
    const neuronGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;
      positions.push(x, y, z);
      
      const neuronColor = new THREE.Color(color);
      colors.push(neuronColor.r, neuronColor.g, neuronColor.b);
    }
    
    neuronGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    neuronGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const neuronMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });
    
    const neurons = new THREE.Points(neuronGeometry, neuronMaterial);
    scene.add(neurons);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    camera.position.z = 3;

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      brain.rotation.x += 0.01;
      brain.rotation.y += 0.01;
      neurons.rotation.x += 0.005;
      neurons.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size, color]);

  return (
    <motion.div
      ref={mountRef}
      className="flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}

// 3D Skill Orb Component
export function SkillOrb({ skill, value, size = 80 }) {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create orb with skill level
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: `hsl(${value * 240}, 70%, 60%)`,
      transparent: true,
      opacity: 0.7 + value * 0.3,
      shininess: 100
    });
    
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Add inner glow
    const innerGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: `hsl(${value * 240}, 80%, 80%)`,
      transparent: true,
      opacity: 0.3
    });
    
    const innerOrb = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerOrb);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(1, 1, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      orb.rotation.y += 0.01;
      innerOrb.rotation.x += 0.015;
      innerOrb.rotation.y -= 0.01;
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [value, size]);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div ref={mountRef} />
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-medium text-gray-800 shadow-lg whitespace-nowrap z-10"
        >
          {skill}: {Math.round(value * 100)}%
        </motion.div>
      )}
    </motion.div>
  );
}

// 3D Rotating Game Icon
export function GameIcon3D({ icon, color = '#00bcd4', size = 60 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create a cube for the game icon
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    scene.add(wireframe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(1, 1, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      wireframe.rotation.x += 0.01;
      wireframe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [color, size]);

  return (
    <motion.div
      ref={mountRef}
      whileHover={{ scale: 1.2, rotateY: 45 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}

// Floating Particles Background
export function FloatingParticles({ count = 50 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -20, 20, -10],
            x: [null, 10, -10, 5],
            scale: [null, 0.8, 1.2, 1],
            opacity: [0.3, 0.8, 0.3, 0.6],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}