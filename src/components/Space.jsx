import { useMemo, useEffect } from 'react'
import * as THREE from 'three'

import { useFrame, useThree } from '@react-three/fiber'

import vertex from '../shaders/space/vert.vert'
import fragment from '../shaders/space/frag.frag'

export const Space = () => {
    console.log('background added')



    return (
        <>
            <Sphere />
            <color attach="background" args={[0.5, 0.1, 0.3]} />
        </>
    )
}

const Sphere = () => {
    const { mouse } = useThree()



    const material = useMemo(() =>
        new THREE.ShaderMaterial({
            wireframe: false,
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.BackSide,
            uniforms: {
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                u_mouse: { value: new THREE.Vector2(0, 0) },
                u_time: { value: 0 }
            },
            // transparent: true
        }), [])

    useFrame((state, delta) => {
        material.uniforms.u_time.value += delta
    })

    useEffect(() => {
        const mouseHandler = () => {
            material.uniforms.u_mouse.value.copy(mouse)
        }

        window.addEventListener('mousemove', mouseHandler);

        return () => {
            window.removeEventListener('mousemove', mouseHandler);
        }

        console.log('material.uniforms.u_mouse.value', material.uniforms.u_mouse.value)

    }, []) // Зависимость от mouse

    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[100, 64, 64]} />
            <primitive attach="material" object={material} />
        </mesh>
    )
}