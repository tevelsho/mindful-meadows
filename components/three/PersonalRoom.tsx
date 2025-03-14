"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";

export default function PersonalRoom() {
  // Load the couch model (couch.glb)
  const couch = useLoader(GLTFLoader, "/models/couch.glb"); // Load the image texture
  const texture = useLoader(THREE.TextureLoader, "temp_ngeeann.png");

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

  return (
    <Canvas camera={{ position: [3, 3, 5], fov: 50 }} shadows>
      {/* ✅ Ambient light for overall brightness */}
      <ambientLight intensity={1.5} />
      {/* ✅ Directional light to simulate sunlight */}
      <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
      {/* ✅ Extra point lights for brightness */}
      <pointLight position={[0, 5, 0]} intensity={5} />
      <pointLight position={[-5, 5, 5]} intensity={4} />
      <pointLight position={[5, 5, -5]} intensity={4} />
      <OrbitControls />
      {/* Add the couch model to the scene */}
      <primitive
        object={couch.scene}
        position={[-0.5, 0.28, -1.1]}
        scale={[1.2, 1.4, 1.2]} // Scale the couch by 1.2x in all directions
        rotation={[0, (13 * Math.PI) / 45, 0]} // Rotate 52 degrees around the Y-axis
      />{" "}
      {/* ✅ Add the square (box geometry) with an image on one face */}
      <mesh position={[0.5, 1.4, -1.45]} castShadow>
        <boxGeometry args={[2, 1, 0.01]} />
        <meshStandardMaterial
          map={texture}
          // This will apply the texture only to the front face of the box
          // Customize the UV mapping if needed, but for simplicity, we map it to the whole box
        />
      </mesh>
      <primitive object={scene} />
    </Canvas>
  );
}
