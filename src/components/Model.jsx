import * as THREE from 'three'

import { useGLTF } from '@react-three/drei';
import { forwardRef, useEffect, useMemo } from 'react';

import { u_progress, u_timer } from '../store/uniformsStore'

import fragment from '../shaders/logo/frag.glsl';
import vertex from '../shaders/logo/vert.glsl';


useGLTF.preload('./vrt.glb')

export const Model = forwardRef(({ tl, color, position }, ref) => {
    const { nodes } = useGLTF('./vrt.glb');
    const material = useMemo(() =>
        new THREE.ShaderMaterial({
            uniforms: {
                u_progress: u_progress,
                u_timer: u_timer,
                color: color
            },
            vertexShader: vertex,
            fragmentShader: fragment,
        }), []);

    useEffect(() => {
        if (!ref?.current) return;

        const mesh = ref.current;

        // Анимации GSAP
        tl.current.to(mesh.position, {
            x: 0,
            duration: 0.2,
            ease: 'bounce.in',
        }, 0.15);

        tl.current.to(mesh.position, {
            x: 0,
            duration: 0.2,
            ease: 'bounce.in',
        }, 0.35);

        tl.current.to(mesh.material.color, {
            r: 0,
            g: 0,
            b: 0.45,
            duration: 0.1,
            ease: 'linear',
        }, ">0.75");

        tl.current.to(mesh.position, {
            z: -10,
            duration: 2,
            ease: 'back.out(1.7)',
        }, 0.55);
    }, []);

    return (
        <group>
            {/* <Center> */}
            <mesh
                ref={ref}
                geometry={nodes.svgMesh1.geometry}
                rotation={[Math.PI / 2, 0, 0]}
                position={position}
                scale={0.06}
            >
                <primitive attach="material" object={material} />
                {/* <meshPhysicalMaterial color={color} /> */}
            </mesh>
            {/* </Center> */}
        </group>
    );
});