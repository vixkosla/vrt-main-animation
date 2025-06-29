import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
// import { dir } from 'react';

export const Lights = () => {
    const { scene } = useThree();

    const lightRef = useRef<THREE.DirectionalLight>(null!);
    
    useEffect(() => {
        const lightHelper = new THREE.DirectionalLightHelper(lightRef.current);
        scene.add(lightHelper);
        lightRef.current.target.position.set(0, 0, -50);
        lightRef.current.position.set(0, 0, 0)
    }, [])

    return (
        <>
            <ambientLight intensity={0.9} />
            {/* <pointLight position={[10, 10, 10]} intensity={1} /> */}
            {/* <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={2} /> */}
            <directionalLight ref={lightRef} intensity={1} />
        </>
    )
}