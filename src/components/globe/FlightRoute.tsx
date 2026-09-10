import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { latLongToVector3 } from '../../utils/globeMath';

interface FlightRouteProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
}

export function FlightRoute({ startLat, startLng, endLat, endLng, color = '#38bdf8' }: FlightRouteProps) {
  const points = useMemo(() => {
    const globeRadius = 2.0; // Same as Earth
    const startPoint = latLongToVector3(startLat, startLng, globeRadius);
    const endPoint = latLongToVector3(endLat, endLng, globeRadius);
    
    // Calculate the distance to determine the height of the arc
    const distance = startPoint.distanceTo(endPoint);
    
    // Find the midpoint
    const midPoint = startPoint.clone().lerp(endPoint, 0.5);
    
    // Push the midpoint outwards from the center of the globe
    const arcHeight = Math.max(0.2, distance * 0.4); // Adjust for curve height
    midPoint.normalize().multiplyScalar(globeRadius + arcHeight);

    // Create the bezier curve
    const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
    
    // Get points along the curve
    return curve.getPoints(50);
  }, [startLat, startLng, endLat, endLng]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.8}
    />
  );
}

