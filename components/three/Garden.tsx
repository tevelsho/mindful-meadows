"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Types
interface GridProps {
  size: number;
  divisions: number;
  color?: string;
  opacity?: number;
}

interface TerrainProps {
  width: number;
  height: number;
  thickness?: number;
  grassColor?: string;
  dirtColor?: string;
}

// Grid component
const Grid: React.FC<GridProps> = ({
  size = 6,
  divisions = 6,
  color = "#4a5568",
  opacity = 0.3,
}) => {
  const gridMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    [color, opacity]
  );
  return (
    <gridHelper
      args={[size, divisions]}
      material={gridMaterial}
      position={[0, 0.01, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// Improved Terrain component with thickness and grass patch
const Terrain: React.FC<TerrainProps> = ({
  width = 6,
  height = 6,
  thickness = 0.3,
  grassColor = "#4ade80",
  dirtColor = "#8B4513",
}) => {
  // Create a geometry for the terrain with thickness
  const terrainGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(width, thickness, height);
    // Move the box so its top face is at y=0
    geo.translate(0, -thickness / 2, 0);
    return geo;
  }, [width, height, thickness]);

  return (
    <group>
      {/* Top grass layer (solid grass patch) */}
      <mesh
        receiveShadow
        position={[0, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={grassColor}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sides and bottom (dirt) */}
      <mesh geometry={terrainGeometry} receiveShadow>
        <meshStandardMaterial color={dirtColor} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

// Improved grass using instanced meshes
const GrassField: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const bladeCount = 3000;

  // Create a variety of grass blades
  const grassBlade = useMemo(() => {
    // Create a simple triangle shape for grass
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-0.025, 0.2);
    shape.lineTo(0.025, 0.2);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.005,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Set up the grass blades on component mount
  React.useEffect(() => {
    if (!instancedMeshRef.current) return;

    const mesh = instancedMeshRef.current;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    // Place grass blades randomly within the 6x6 grid
    for (let i = 0; i < bladeCount; i++) {
      position.set(
        (Math.random() - 0.5) * 5.8,
        0.02,
        (Math.random() - 0.5) * 5.8
      ); // Slightly above the grass patch

      // Random rotation for diversity
      rotation.set(
        Math.random() * 0.3,
        Math.random() * Math.PI * 2,
        Math.random() * 0.2
      );
      quaternion.setFromEuler(rotation);

      // Random scale for diversity
      const height = 0.1 + Math.random() * 0.2;
      scale.set(0.7 + Math.random() * 0.6, height, 1);

      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [bladeCount]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[grassBlade, new THREE.MeshStandardMaterial(), bladeCount]}
      castShadow
    >
      <meshStandardMaterial color="#9FCE41" side={THREE.DoubleSide} />
    </instancedMesh>
  );
};

// Main Scene
const Scene: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 3, 5], fov: 55 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Terrain with thickness and grass patch */}
      <Terrain
        width={6}
        height={6}
        thickness={0.3}
        grassColor="#9FCE41"
        dirtColor="#80642E"
      />
      {/* Grid */}
      <Grid size={6} divisions={6} color="#4a5568" opacity={0.3} />
      {/* Improved Grass */}
      <GrassField />
      {/* Grid Axis Helper */}
      {/* <axesHelper args={[5]} /> */}
      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.1} // Prevent going below the ground
      />
    </Canvas>
  );
};

// Garden component (the main export)
const Garden: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Scene />
    </div>
  );
};

export default Garden;
