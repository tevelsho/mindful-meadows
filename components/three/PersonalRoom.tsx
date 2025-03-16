"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";
import GardenModal from "../modals/GardenModal";
import { useCursor } from "@react-three/drei";
import RoomModal from "../modals/RoomModal";

export default function PersonalRoom() {
  // Load the couch model (couch.glb)
  const couch = useLoader(GLTFLoader, "/models/couch.glb"); // Load the image texture
  const texture = useLoader(THREE.TextureLoader, "team.png");

  // Load both GLB files
  const gltfMain = useLoader(
    GLTFLoader,
    "/models/Dark_Second.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);

      const renderer = new THREE.WebGLRenderer();
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const ktx2Loader = new KTX2Loader()
        .setTranscoderPath(
          "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/jsm/libs/basis/"
        )
        .detectSupport(renderer);

      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  const gltfLights = useLoader(GLTFLoader, "/models/Dark_Targets.glb");
  const table = useLoader(GLTFLoader, "/models/table.glb");
  const teddyBear = useLoader(GLTFLoader, "/models/teddybear.glb");
  const camera = useLoader(GLTFLoader, "/models/camera.glb");

  const scene = useMemo(() => {
    const clonedScene = gltfMain.scene.clone();

    // ✅ Extract and add lights from `Dark_Targets.glb`
    const lights: THREE.Light[] = [];
    gltfLights.scene.traverse((child) => {
      if (child instanceof THREE.Light) {
        const lightClone = child.clone();
        lights.push(lightClone);
      }
    });

    if (lights.length > 0) {
      lights.forEach((light) => clonedScene.add(light));
    } else {
      // If no lights found in `Dark_Targets.glb`, add a bright default light
      const fallbackLight = new THREE.PointLight(0xffffff, 5);
      fallbackLight.position.set(0, 5, 0);
      clonedScene.add(fallbackLight);
    }

    return clonedScene;
  }, [gltfMain, gltfLights]);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); // Changes cursor to pointer when hovering
  return (
    <>
      <Canvas camera={{ position: [-3, 4, 3], fov: 65 }} shadows>
        {/* ✅ Ambient light for overall brightness */}
        <ambientLight intensity={1.5} />
        {/* ✅ Directional light to simulate sunlight */}
        <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
        {/* ✅ Extra point lights for brightness */}
        <pointLight position={[0, 5, 0]} intensity={5} />
        <pointLight position={[-5, 5, 5]} intensity={4} />
        <pointLight position={[5, 5, -5]} intensity={4} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.1} // Prevent going below the ground
          enableRotate={true} // Enable rotation
          enableZoom={true} // Disable zoom
          enablePan={false} // Disable panning (translation)
        />{" "}
        {/* Add the couch model to the scene */}
        <primitive
          object={couch.scene}
          position={[-0.5, 0.28, -1.1]}
          scale={[1.2, 1.4, 1.2]} // Scale the couch by 1.2x in all directions
          rotation={[0, (13 * Math.PI) / 45, 0]} // Rotate 52 degrees around the Y-axis
        />{" "}
        {/* ✅ Add the square (box geometry) with an image on one face */}
        <primitive
          object={table.scene}
          position={[-0.8, 0.02, 1.1]}
          scale={[1.3, 1.3, 1.3]}
          rotation={[0, (13 * Math.PI) / 45, 0]}
        />
        <primitive
          object={teddyBear.scene}
          position={[0.55, 0.12, 0.2]}
          scale={[0.001, 0.001, 0.001]}
          rotation={[0, Math.PI / 45, 0]}
          onClick={() => setIsOpen(!isOpen)}
          onPointerOver={() => setHovered(true)} // Mouse enters
          onPointerOut={() => setHovered(false)} // Mouse leaves
        />
        <primitive
          object={camera.scene}
          position={[-0.8, 0.75, 1]}
          scale={[0.04, 0.04, 0.04]}
          rotation={[0, (1 * Math.PI) / 45, 0]}
        />
        <mesh position={[0.5, 1.4, -1.45]} castShadow>
          <boxGeometry args={[2, 1, 0.01]} />
          <meshStandardMaterial
            map={texture}
            // This will apply the texture only to the front face of the box
            // Customize the UV mapping if neede1d, but for simplicity, we map it to the whole box
          />
        </mesh>
        <primitive object={scene} />
      </Canvas>
      <RoomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={1}
      ></RoomModal>
    </>
  );
}
