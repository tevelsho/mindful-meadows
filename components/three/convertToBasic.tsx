import * as THREE from "three";

interface MaterialMap {
  [key: string]: THREE.Material;
}

export function convertMaterialsToBasic(
  materials: MaterialMap,
  alphaTestValue: number = 0
): MaterialMap {
  const newMaterials: MaterialMap = {};

  Object.keys(materials).forEach((key) => {
    const oldMaterial = materials[key];
    if (oldMaterial instanceof THREE.MeshStandardMaterial) {
      const newMaterial = new THREE.MeshBasicMaterial({
        map: oldMaterial.map,
        transparent: oldMaterial.transparent,
        alphaTest: oldMaterial.transparent ? 0.1 : alphaTestValue,
      });
      newMaterials[key] = newMaterial;
    } else {
      newMaterials[key] = oldMaterial;
    }
  });

  return newMaterials;
}
