import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { latLongToVector3 } from '../../utils/globeMath';

interface AircraftProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  progress: number;
}

export function Aircraft({ startLat, startLng, endLat, endLng, progress }: AircraftProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  const { scene } = useGLTF('/models/aircraft/aircraft.glb');
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    scene.updateMatrixWorld(true);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim > 0 && maxDim !== Infinity && !isNaN(maxDim)) {
      const targetSize = 0.08;
      const scale = targetSize / maxDim; 
      clonedScene.scale.set(scale, scale, scale);
      
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    } else {
      clonedScene.scale.set(0.001, 0.001, 0.001);
    }
  }, [clonedScene, scene]);

  const curve = useMemo(() => {
    const globeRadius = 2.0;
    const startPoint = latLongToVector3(startLat, startLng, globeRadius);
    const endPoint = latLongToVector3(endLat, endLng, globeRadius);
    const distance = startPoint.distanceTo(endPoint);
    const midPoint = startPoint.clone().lerp(endPoint, 0.5);
    const arcHeight = distance * 0.2;
    midPoint.normalize().multiplyScalar(globeRadius + arcHeight);
    return new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
  }, [startLat, startLng, endLat, endLng]);

  useFrame(() => {
    if (meshRef.current) {
      const position = curve.getPointAt(progress);
      meshRef.current.position.copy(position);
      
      // Calculate smooth orientation along the route tangent
      if (progress < 0.99) {
        const nextPosition = curve.getPointAt(Math.min(1.0, progress + 0.01));
        // The aircraft should stay parallel to the surface, so its "up" vector points away from Earth's center
        const upNormal = position.clone().normalize();
        meshRef.current.up.copy(upNormal);
        meshRef.current.lookAt(nextPosition);
      }
    }
  });

  return (
    <group ref={meshRef}>
      {/* 
        The aircraft GLB might not naturally face +Z. 
        Adjusting rotation to ensure the nose points toward the flight path tangent.
      */}
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/aircraft/aircraft.glb');

