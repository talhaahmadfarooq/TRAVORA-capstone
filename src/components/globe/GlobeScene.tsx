import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { FlightRoute } from './FlightRoute';
import { Aircraft } from './Aircraft';
import { SpaceEnvironment } from './SpaceEnvironment';
import { latLongToVector3 } from '../../utils/globeMath';
import { Suspense } from 'react';
import { mockDestinations } from '../../data/mockData';

export const GLOBE_LOCATIONS = mockDestinations.map(d => ({
  id: d.id,
  name: d.name,
  lat: d.coordinates[0],
  lng: d.coordinates[1]
}));

interface GlobeSceneProps {
  appState: 'INTRO' | 'EXPLORE' | 'CALCULATING' | 'RESULT';
  selectedDestinationId: string | null;
  flightData?: {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
  } | null;
  flightProgress?: number;
  onDestinationClick?: (id: string) => void;
}

function SceneContent({ appState, selectedDestinationId, flightData, flightProgress, onDestinationClick }: GlobeSceneProps) {
  const rotationGroupRef = useRef<THREE.Group>(null);
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const spaceRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (appState === 'INTRO') return;
      
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = () => {
      isDragging.current = false;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !rotationGroupRef.current) return;
      
      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      
      rotationGroupRef.current.rotation.y += deltaX * 0.005;
      rotationGroupRef.current.rotation.x += deltaY * 0.005;

      spaceRotationRef.current.y += deltaX * 0.0022;
      spaceRotationRef.current.x = THREE.MathUtils.clamp(
        spaceRotationRef.current.x + deltaY * 0.0016,
        -Math.PI / 5,
        Math.PI / 5
      );
      
      rotationGroupRef.current.rotation.x = THREE.MathUtils.clamp(
        rotationGroupRef.current.rotation.x,
        -Math.PI / 2.5,
        Math.PI / 2.5
      );
      
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [appState]);

  const cameraZoomTarget = useRef(8.0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (appState === 'INTRO') return;
      e.preventDefault();
      cameraZoomTarget.current = THREE.MathUtils.clamp(
        cameraZoomTarget.current + e.deltaY * 0.01,
        5.0,
        12.0
      );
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [appState]);

  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const autoRotateSpeed = useRef(0.065);

  useFrame((state, delta) => {
    if (!rotationGroupRef.current) return;
    
    const targetSpeed = (appState === 'CALCULATING' || appState === 'RESULT') ? 0.08 : 0.065;
    autoRotateSpeed.current = THREE.MathUtils.lerp(autoRotateSpeed.current, targetSpeed, 0.05);

    let targetRotation: THREE.Euler | null = null;
    if (flightData && (appState === 'CALCULATING' || appState === 'RESULT')) {
      const midLat = (flightData.startLat + flightData.endLat) / 2;
      let midLng = (flightData.startLng + flightData.endLng) / 2;
      if (Math.abs(flightData.startLng - flightData.endLng) > 180) {
        midLng += 180;
        if (midLng > 180) midLng -= 360;
      }
      
      const targetY = -(midLng * Math.PI / 180) - Math.PI / 2;
      const targetX = midLat * Math.PI / 180;
      targetRotation = new THREE.Euler(targetX, targetY, 0, 'XYZ');
    }

    if (!isDragging.current) {
      if (appState === 'CALCULATING' && targetRotation) {
        const currentRot = rotationGroupRef.current.rotation;
        const prevRotY = currentRot.y;
        const prevRotX = currentRot.x;

        currentRot.x = THREE.MathUtils.lerp(currentRot.x, targetRotation.x, 2.5 * delta);
        let diffY = targetRotation.y - currentRot.y;
        while (diffY > Math.PI) diffY -= 2 * Math.PI;
        while (diffY < -Math.PI) diffY += 2 * Math.PI;
        currentRot.y += diffY * (2.5 * delta);

        const dY = currentRot.y - prevRotY;
        const dX = currentRot.x - prevRotX;
        spaceRotationRef.current.y += dY * 0.44;
        spaceRotationRef.current.x = THREE.MathUtils.clamp(
          spaceRotationRef.current.x + dX * 0.32,
          -Math.PI / 5,
          Math.PI / 5
        );
      } else {
        rotationGroupRef.current.rotation.y += delta * autoRotateSpeed.current;
      }
    }

    const camera = state.camera;
    let targetPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    const earthCameraState = appState === 'INTRO' ? 'hero' : 'journey';

    if (earthCameraState === 'hero') {
      cameraZoomTarget.current = 8.0;
      targetPos.set(0, 0.2, 3.2);
      targetLookAt.set(0, 1.6, 0); 
    } else {
      targetPos.set(0, 0, cameraZoomTarget.current);
      targetLookAt.set(0, 0, 0);
    }

    camera.position.lerp(targetPos, 0.05);
    lookAtTarget.current.lerp(targetLookAt, 0.08);
    camera.lookAt(lookAtTarget.current);
  });

  const activeOriginId = flightData ? GLOBE_LOCATIONS.find(l => Math.abs(l.lat - flightData.startLat) < 0.1)?.id : null;
  const activeDestId = flightData ? GLOBE_LOCATIONS.find(l => Math.abs(l.lat - flightData.endLat) < 0.1)?.id : null;

  return (
    <>
      <Suspense fallback={null}>
        <SpaceEnvironment dragRotation={spaceRotationRef} />
      </Suspense>

      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#38bdf8" />
      <hemisphereLight args={['#ffffff', '#0a1128', 1.5]} />

      <group ref={rotationGroupRef}>
        <Earth />

        {GLOBE_LOCATIONS.map(loc => {
          const pos = latLongToVector3(loc.lat, loc.lng, 2.02);
          
          const isSelected = selectedDestinationId === loc.id || activeDestId === loc.id || activeOriginId === loc.id;
          const isHovered = hoveredDest === loc.id;
          
          return (
            <group key={loc.id} position={pos}>
              <mesh 
                onPointerOver={(e) => { e.stopPropagation(); setHoveredDest(loc.id); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); setHoveredDest(null); document.body.style.cursor = 'auto'; }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDestinationClick) {
                    onDestinationClick(loc.id);
                    if (selectedDestinationId === loc.id) {
                      setHoveredDest(null);
                    }
                  }
                }}
              >
                <sphereGeometry args={[isSelected || isHovered ? 0.04 : 0.02, 16, 16]} />
                <meshBasicMaterial color={isSelected ? "#e2b170" : (isHovered ? "#ffffff" : "#38bdf8")} />
              </mesh>

              {isSelected && (
                <mesh>
                  <ringGeometry args={[0.05, 0.06, 32]} />
                  <meshBasicMaterial color="#e2b170" side={THREE.DoubleSide} transparent opacity={0.6} />
                </mesh>
              )}

              {(isHovered || isSelected) && (
                <Html distanceFactor={20} center style={{ pointerEvents: 'none' }}>
                  <div style={{
                    transform: 'translateY(-22px)',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    userSelect: 'none',
                  }}>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.10em',
                        color: 'rgba(255,255,255,0.92)',
                        textTransform: 'uppercase',
                        textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
                        lineHeight: 1.3,
                      }}>
                        {loc.name}
                      </div>
                  </div>
                </Html>
              )}
            </group>
          );
        })}

        {flightData && (appState === 'CALCULATING' || appState === 'RESULT') && (
          <Suspense fallback={null}>
            <FlightRoute 
              startLat={flightData.startLat} startLng={flightData.startLng}
              endLat={flightData.endLat} endLng={flightData.endLng}
            />
            {appState === 'CALCULATING' && (
              <Aircraft
                startLat={flightData.startLat} startLng={flightData.startLng}
                endLat={flightData.endLat} endLng={flightData.endLng}
                progress={flightProgress || 0}
              />
            )}
          </Suspense>
        )}
      </group>
    </>
  );
}

export function GlobeScene(props: GlobeSceneProps) {
  return (
    <Canvas 
      camera={{ position: [0, 0.2, 3.2], fov: 45, near: 0.1, far: 2000 }}
      style={{ touchAction: 'none' }} 
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
