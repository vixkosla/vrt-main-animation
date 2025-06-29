import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import { useEffect, useRef } from 'react';
import * as THREE from 'three'

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
    const groupRef = useRef<THREE.Group>(null!)

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
                {isRotating && <mesh scale={[0.1, 0.1, 0.1]} position={[positionX, positionY, zPosition(-1)]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[10 * scale, 10 * scale]} />
                    <meshStandardMaterial side={THREE.DoubleSide} color={'#220022'} />
                </mesh>}
                {items.map((item, index) => (
                    <mesh key={index} scale={[0.1, 0.1, 0.1]} position={[positionX, positionY, zPosition(index)]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[10 * scale, 10 * scale]} />
                        <meshStandardMaterial side={THREE.DoubleSide} color={blueShades[index].hex} />
                    </mesh>
                ))}
            </group>
        </>
    )
}

