import { useRef, useMemo, Component } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import spaceEnvironmentGlb from '../../assets/space/space-environment.glb';

interface SpaceEnvironmentProps {
  dragRotation?: React.RefObject<{ x: number; y: number }>;
  intensity?: number;
}

/**
 * Three.js-safe Error Boundary that returns null on failure so the Canvas does not crash.
 */
class SpaceErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('SpaceEnvironment failed to render, falling back to clean space:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Inner component that loads the panoramic GLB and handles rendering & interaction.
 */
function SpaceEnvironmentInner({ dragRotation, intensity = 0.85 }: SpaceEnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(spaceEnvironmentGlb);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Prevent pointer event capture so Earth & markers remain the primary interaction
        child.raycast = () => null;

        // Configure material for deep space background rendering
        if (child.material) {
          const originalMat = child.material as THREE.MeshStandardMaterial;
          const mat = originalMat.clone();

          // DoubleSide ensures interior panoramic visibility regardless of normals
          mat.side = THREE.DoubleSide;

          // Never write to depth buffer so Earth, routes, markers, and aircraft ALWAYS render in front
          mat.depthWrite = false;
          mat.depthTest = true;

          mat.roughness = 1.0;
          mat.metalness = 0.0;

          // Self-emissive stars from the 4K texture with controlled intensity to not overpower Earth
          if (mat.emissive) {
            mat.emissive.setRGB(1, 1, 1);
            mat.emissiveIntensity = intensity;
          }

          child.material = mat;
        }

        // Render first before any other scene objects
        child.renderOrder = -1000;
      }
    });

    // Scale to a vast celestial sphere (radius ~200 units)
    clone.scale.set(40, 40, 40);
    return clone;
  }, [scene, intensity]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Camera-relative positioning:
    // Center the sphere around the camera so stars are at optical infinity.
    // Zooming in/out will never intersect the sphere geometry or cause box boundaries.
    groupRef.current.position.copy(state.camera.position);

    // 2. Immediate, frame-synchronized celestial orientation driven by user interaction:
    if (dragRotation?.current) {
      groupRef.current.rotation.y = dragRotation.current.y;
      groupRef.current.rotation.x = dragRotation.current.x;
    }
  });

  return (
    <group ref={groupRef} name="space-environment-group">
      <primitive object={clonedScene} />
    </group>
  );
}

/**
 * Reusable 3D Space Environment component.
 * Integrates the panoramic space GLB into the Three.js scene as a true 3D background.
 */
export function SpaceEnvironment(props: SpaceEnvironmentProps) {
  return (
    <SpaceErrorBoundary>
      <SpaceEnvironmentInner {...props} />
    </SpaceErrorBoundary>
  );
}

// Preload the GLB asset
useGLTF.preload(spaceEnvironmentGlb);
