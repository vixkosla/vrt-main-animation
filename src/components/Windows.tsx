import * as THREE from "three"

import vertex from "../shaders/window/vert.glsl"
import fragment from "../shaders/window/frag.glsl"

import { u_progress } from "../store/uniformsStore"

import { useEffect, useMemo, useRef } from "react"

export const Windows = ({ tl }) => {
    const groupRef = useRef(null);

    useEffect(() => {
        const children = groupRef.current.children;

        tl.current.to(
            children.map(obj => obj.position),
            {
                z: -5,
                stagger: 0.015,
                duration: 0.5,
                ease: 'power2.inOut',
            },
            1.4
        )

        tl.current.to(
            children.map(obj => obj.rotation),
            {
                z: Math.PI,
                stagger: 1.25,
                duration: 2.5,
                ease: 'power2.inOut',
            },
            2.5
        )

        tl.current.to(
            children.map(obj => obj.rotation),
            {
                z: -Math.PI,
                stagger: 0.025,
                duration: 1.5,
                ease: 'power2.inOut',
            },
            2.7
        )
    }, [])

    const items = Array.from({ length: 3 })

    return (
        <>
            <group ref={groupRef}>
                {items.map((_, i) => (
                    <Window key={i} i={i} />
                ))
                }

            </group>
        </>
    )
}

const Window = ({ i }) => {

    const material = useMemo(() =>
        new THREE.ShaderMaterial({
            wireframe: false,
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.FrontSide,
            uniforms: {
                u_progress,
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                u_mouse: { value: new THREE.Vector2(0, 0) },
                u_time: { value: 0 },
                u_index: { value: i }
            },
            transparent: true
        }), [])

    const zPosition = (i) => (i * 0.3 * (-1));

    return (
        <mesh position={[0, 0, zPosition(i)]}>
            <planeGeometry args={[2.25, 2.25]} />
            <primitive attach="material" object={material} />
            {/* <meshNormalMaterial /> */}
        </mesh>
    )
}