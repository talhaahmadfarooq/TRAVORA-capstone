import { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Earth() {
  const { scene } = useGLTF('/models/earth/earth.glb');
  const cloudRef = useRef<THREE.Mesh>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;
        child.castShadow = true;

        if (child.name === 'Earth_Earth_0' || child.material.name === 'Earth') {
          child.material.roughness = 0.8;
          child.material.metalness = 0.1;
        }

        if (child.name === 'Clouds_Clouds_0' || child.material.name === 'Clouds') {
          child.material.metalness = 0.0;
          child.material.roughness = 1.0;
          child.material.transparent = true;
          child.material.opacity = 0.6; 
          child.material.depthWrite = false; 
          // @ts-ignore
          cloudRef.current = child;
        }
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    // Ensure matrices are updated so Box3 calculates correctly on the very first tick
    scene.updateMatrixWorld(true);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Safely apply scaling only if the dimension is valid
    if (maxDim > 0 && maxDim !== Infinity && !isNaN(maxDim)) {
      const targetDim = 4.0; // diameter 4 = radius 2
      const scale = targetDim / maxDim;
      clonedScene.scale.set(scale, scale, scale);
      
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      window.dispatchEvent(new CustomEvent('earth-ready'));
    } else {
      console.warn("Earth bounds invalid on mount. Using fallback scale.");
      clonedScene.scale.set(0.02, 0.02, 0.02); // Fallback to prevent NaN
      window.dispatchEvent(new CustomEvent('earth-ready'));
    }
  }, [clonedScene, scene]);

  useFrame((_state, delta) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.015;
    }
  });

  // Rotate the earth model by +90 degrees around Y axis so its Prime Meridian aligns with the math coordinate system
  return <primitive object={clonedScene} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload('/models/earth/earth.glb');
