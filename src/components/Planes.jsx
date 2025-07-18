import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three'
// import { MeshStandardNodeMaterial } from 'three/nodes'
// import { MeshStandardNodeMaterial } from 'three/examples/jsm/nodes/materials/MeshStandardNodeMaterial.js'
import { instanceIndex, positionLocal, storage, wgslFn, color, uniform } from 'three/tsl'

import { extend, useFrame } from '@react-three/fiber'
// import { shaderMaterial } from '@react-three/drei';

import fragment from '../shaders/Plane/frag.glsl';
import vertex from '../shaders/Plane/vert.glsl';

// import { MeshPhysicalNodeMaterial } from 'three-stdlib'

// extend({
//     MeshStandardNodeMaterial
// })

const randomColor = () => {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return new THREE.Color(r, g, b);
};

const blueShades = [
    { name: "Abyss", hex: "#000022", rgb: "rgb(0, 0, 34)" },          // Почти чёрный
    { name: "Midnight", hex: "#020235", rgb: "rgb(2, 2, 53)" },        // Глубокий синий
    { name: "VRT Core", hex: "#0A0A45", rgb: "rgb(10, 10, 69)" },      // Основной тёмный
    { name: "Navy Depth", hex: "#121255", rgb: "rgb(18, 18, 85)" },    // Насыщенный
    { name: "Royal Blue", hex: "#1E1E6E", rgb: "rgb(30, 30, 110)" },   // Яркий акцент
    { name: "Sapphire", hex: "#303090", rgb: "rgb(48, 48, 144)" },     // Полутона
    { name: "Ocean Wave", hex: "#4A4AA8", rgb: "rgb(74, 74, 168)" },   // Светлее
    { name: "Soft Azure", hex: "#6666C0", rgb: "rgb(102, 102, 192)" }, // Для текста
    { name: "Light Denim", hex: "#8888D0", rgb: "rgb(136, 136, 208)" }, // Светлый (но не белесый)
    { name: "Mist", hex: "#A5A5E0", rgb: "rgb(165, 165, 224)" }       // Самый светлый
];

export const Planes = ({ tl, isRotating = true, scale = 1, positionX = 0, positionY = 0, positionZ = -50 }) => {
    const groupRef = useRef(null)
    const materialRef = useRef(null)
    // const material = node

    const material = useMemo(() =>
        new THREE.ShaderMaterial({
            wireframe: false,
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            uniforms: { uTime: { value: 0 } },
            transparent: true
        }), []
    )

    useFrame((state, delta) => {
            material.uniforms.uTime.value += delta;
            // console.log('materialRef.current.uniforms.uTime.value', materialRef.current.uniforms.uTime.value)
    })

    useEffect(() => {

        if (groupRef.current) {
            const children = groupRef.current.children
            console.log('children', children)

            tl.current.to(
                children.map(obj => obj.scale),
                {
                    x: 5.5,
                    y: 5.5,
                    z: 5.5,
                    duration: 0.5,
                    ease: 'bounce.in',
                },
                0.3
            )

            if (isRotating) {
                tl.current.to(
                    children.map(obj => obj.rotation),
                    {
                        z: Math.PI,
                        stagger: 0.015,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    },
                    0.7
                )

                tl.current.to(
                    children.map(obj => obj.scale),
                    {
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                        stagger: 0.1,
                        duration: 0.2,
                        ease: 'back.out(1.7)',
                    },
                    0.9 // 👈 тот же момент времени
                )
            }


        }

    }, [])

    const items = Array.from({ length: 10 })
    const zPosition = (index) => positionZ + (index * 0.3 * (-1))

    return (
        <>
            <group ref={groupRef}>
                {/* {isRotating && <mesh scale={[0.1, 0.1, 0.1]} position={[positionX, positionY, zPosition(-1)]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[10 * scale, 10 * scale]} />
                    <meshStandardMaterial side={THREE.DoubleSide} color={'#A5A5E0'} />
                </mesh>} */}
                {items.map((item, index) => (
                    <mesh key={index} scale={[0.1, 0.1, 0.1]} position={[positionX, positionY, zPosition(index)]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[10 * scale, 10 * scale, 35, 5]} />
                        {/* <meshStandardMaterial side={THREE.DoubleSide} color={blueShades[index].hex} /> */}
                        {/* <meshPhysicalNodeMaterial /> */}
                        {/* <meshPhysicalNodeMaterial
                            vertexShader={vertex}
                            fragmentShader={fragment}
                            side={THREE.DoubleSide}
                            color={blueShades[index].hex}
                            roughness={0.5}
                            metalness={0.5}
                            clearcoat={0.5}
                            clearcoatRoughness={0.1}/> */}
                        {/* <shaderMaterial
                            ref={materialRef}
                            // wireframe
                            vertexShader={vertex}
                            fragmentShader={fragment}
                            side={THREE.DoubleSide}
                            uniforms={{ uTime: { value: 0 } }}
                            transparent={true}
                        /> */}
                        <primitive object={material} attach="material" />
                    </mesh>
                ))}
            </group>
        </>
    )
}

