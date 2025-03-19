"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import GardenModal from "../modals/GardenModal";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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
const Fence: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh castShadow receiveShadow position={[-2.75, 0, 0]}>
        <boxGeometry args={[0.25, 2, 0.25]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Right post */}
      <mesh castShadow receiveShadow position={[2.75, 0, 0]}>
        <boxGeometry args={[0.25, 2, 0.25]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Top rail */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[6, 0.15, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Bottom rail */}
      <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[6, 0.15, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Vertical pickets */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh
          key={`picket-${i}`}
          castShadow
          receiveShadow
          position={[-2.6 + i * 0.35, 0.12, 0]}
        >
          <boxGeometry args={[0.1, 1.8, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Improved grass using instanced meshes
const GrassField: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const bladeCount = 3000;

  const grassBladeGeometry = useMemo(() => {
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

  const grassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#9FCE41",
      side: THREE.DoubleSide,
    });
  }, []);

  React.useEffect(() => {
    if (!instancedMeshRef.current) return;

    const mesh = instancedMeshRef.current;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < bladeCount; i++) {
      position.set(
        (Math.random() - 0.5) * 5.8,
        0.02,
        (Math.random() - 0.5) * 5.8
      );

      rotation.set(
        Math.random() * 0.3,
        Math.random() * Math.PI * 2,
        Math.random() * 0.2
      );
      quaternion.setFromEuler(rotation);

      const height = 0.1 + Math.random() * 0.2;
      scale.set(0.7 + Math.random() * 0.6, height, 1);

      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    return () => {
      mesh.instanceMatrix.needsUpdate = false;
    };
  }, [bladeCount]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[grassBladeGeometry, grassMaterial, bladeCount]}
      castShadow
    />
  );
};

const MemoizedGrassField = React.memo(GrassField);

function RealFlower({ plantHealth }: { plantHealth: number }) {
  // Load the GLTF model
  const { scene: originalScene } = useGLTF("/models/flower.glb");
  const flowerRef = useRef<THREE.Group>(null);

  // Deep clone the scene and materials for this instance
  const clonedScene = useMemo(() => {
    const scene = originalScene.clone();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((material) => material.clone());
        } else {
          mesh.material = mesh.material.clone();
        }
      }
    });
    return scene;
  }, [originalScene]);

  useEffect(() => {
    if (!flowerRef.current) return;

    // Create a new petal color based on HSL (unique for each flower)
    const petalColor = new THREE.Color().setHSL(
      0.15, // Hue (reddish color)
      1 * plantHealth, // Saturation, dynamic based on plant health
      0.6 * plantHealth // Lightness, dynamic based on plant health
    );

    // Apply the color to the cloned materials
    flowerRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => {
            if ("color" in material) {
              (material as THREE.MeshStandardMaterial).color.set(petalColor);
            }
          });
        } else if (mesh.material && "color" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).color.set(petalColor);
        }
      }
    });
  }, [plantHealth]); // Re-run effect when plantHealth changes

  return (
    <primitive
      ref={flowerRef}
      object={clonedScene} // Use the deeply cloned scene
      position={[0, 2.5, 0]}
      scale={[5, 5, 5]}
      rotation={[0, (5 * Math.PI) / 3, 0]}
    />
  );
}

const MemoRealFlower = React.memo(RealFlower);
function Flower({
  onClick,
  name,
  pos,
  id,
  plantHealth,
  openModal,
}: {
  onClick: () => void;
  name: string;
  pos: [number, number, number];
  id: number;
  plantHealth: number;
  openModal?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const flowerRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Calculate health-based colors
  const stemColor = new THREE.Color().setHSL(
    0.33,
    0.6 * plantHealth,
    0.4 * plantHealth + 0.2
  );
  const petalColor = new THREE.Color().setHSL(
    0.15,
    1 * plantHealth,
    0.6 * plantHealth
  );

  const centerColor = new THREE.Color().setHSL(
    0.15,
    0.8 * plantHealth,
    0.5 * plantHealth + 0.2
  );

  // Scale based on health
  const flowerScale = 0.19;
  const petalScale = 0.8 * (0.8 + 0.2 * plantHealth);

  // Animate based on health
  useFrame((state) => {
    if (flowerRef.current) {
      const swayAmount = 0.1 * plantHealth;
      const droopAmount = (1 - plantHealth) * 0.5;
      flowerRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * swayAmount;
      flowerRef.current.rotation.z = droopAmount;
    }

    if (particlesRef.current && plantHealth < 0.5) {
      const time = state.clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02; // Make particles float up slowly

        // Reset particles to the starting position when they move too high
        if (positions[i + 1] > 5) positions[i + 1] = -4;
      }

      // Update the particle position buffer
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Create floating particles effect
  useEffect(() => {
    const particleCount = 8;
    const particles = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random position around the flower
      particles[i * 3] = Math.random() * 2 - 1; // x
      particles[i * 3 + 1] = Math.random() * 2 - 4.5; // y (start from different heights)
      particles[i * 3 + 2] = Math.random() * 2 - 1; // z
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color().setHSL(0, 0, 0.099).getHex(), // Lower lightness for dark grey
      size: 0.05,
      transparent: true,
      opacity: 1,
    });

    const pointCloud = new THREE.Points(geometry, material);
    if (flowerRef.current) {
      flowerRef.current.add(pointCloud);
    }

    // Assign reference to the particles
    particlesRef.current = pointCloud;

    // Cleanup particles on unmount
    return () => {
      if (flowerRef.current && particlesRef.current) {
        flowerRef.current.remove(particlesRef.current);
      }
    };
  }, [petalColor]);

  return (
    <group
      ref={flowerRef}
      position={pos}
      scale={flowerScale}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setHovered(false);
      }}
    >
      {/* Stem */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
        <meshStandardMaterial color={stemColor.getHex()} />
      </mesh>
      {/* Leaves on stem */}
      {[-1.5, -0.8, 0, 0.8, 1.6].map((y, i) => (
        <group
          key={`leaf-${i}`}
          position={[0, y, 0]}
          rotation={[0, 0, Math.PI * 0.25 * (i % 2 ? 1 : -1)]}
        >
          <mesh castShadow receiveShadow>
            <coneGeometry args={[0.2, 0.5, 8]} />
            <meshStandardMaterial
              color={stemColor.getHex()}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
      {/* Bud/calyx base - connects petals to stem */}
      <mesh position={[0, 2.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.1, 0.3, 8]} />
        <meshStandardMaterial color={new THREE.Color(0x2e7d32)} />
      </mesh>
      {/* Flower center */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={centerColor.getHex()} />
      </mesh>
      <MemoRealFlower plantHealth={plantHealth} />
      {/* Petals */}
      {/* Tooltip with health information */}
      {hovered && (
        <Html position={[0, 5, 0]} center>
          <div
            className="
              bg-lime-100
              text-black
              text-md
              px-4
              py-2
              border  
              border-black
              font-sans
              font-bold
              shadow-[2px_2px_0_0_rgba(0,0,0,1)]
              rounded-lg
            "
          >
            {/* Plant Name */}
            <p className="mb-2">{name}</p>
            {/* Health Bar Container */}
            <div className="h-2 w-full border-2 border-black bg-white">
              <div
                className="h-full"
                style={{
                  width: `${plantHealth * 100}%`,
                  backgroundColor:
                    plantHealth > 0.6
                      ? "#22c55e" // green
                      : plantHealth > 0.3
                      ? "#eab308" // yellow
                      : "#ef4444", // red
                }}
              />
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
interface PlantData {
  id: number;
  name: string;
  plant_health: number;
  xy: [number, number];
}
function Gnome() {
  const { scene } = useGLTF("/models/garden_gnome.glb");
  return (
    <primitive
      object={scene}
      position={[-2, 0, 2]}
      scale={[0.003, 0.003, 0.003]}
      rotation={[0, (5 * Math.PI) / 3, 0]}
    />
  );
}
// Main Scene
const Scene: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PlantData[]>([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    fetch("dataset/garden.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [-5, 3, 5], fov: 55 }}
        style={{ background: "transparent" }}
      >
        {/* Add subtle fog for depth perception */}
        <fog attach="fog" args={["#e2eed7", 6, 16]} />
        {/* Neutral ambient light for overall scene illumination */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.0}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Add cooler fill light for more dimension */}
        <directionalLight
          position={[-8, 6, -2]}
          intensity={0.3}
          color="#d0e0ff"
        />
        {/* Subtle accent light */}
        <pointLight
          position={[0, 1, 0]}
          intensity={0.2}
          color="#f0f5ff"
          distance={4}
        />
        {/* Terrain with thickness and grass patch */}
        <Terrain
          width={6}
          height={6}
          thickness={0.3}
          grassColor="#9FCE41"
          dirtColor="#80642E"
        />
        {/* Gnome model */}
        <Gnome />
        {data.map((item) => (
          <Flower
            key={item.id}
            onClick={() => {
              setIsOpen(true);
              setId(item.id);
            }}
            name={item.name}
            pos={[item.xy[0], 0.4, item.xy[1]]}
            id={item.id}
            plantHealth={item.plant_health}
          />
        ))}
        {/* Grid */}
        <Grid size={6} divisions={6} color="#4a5568" opacity={0.3} />
        {/* Improved Grass */}
        <MemoizedGrassField />
        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.1} // Prevent going below the ground
          enableRotate={true} // Enable rotation
          enableZoom={true} // Disable zoom
          enablePan={false} // Disable panning (translation)
        />
        <Fence position={[0, 0.5, -3]} /> {/* Back fence */}
        <Fence position={[3, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} />{" "}
        {/* Left fence */}
      </Canvas>

      <GardenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={id}
      ></GardenModal>
    </>
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
