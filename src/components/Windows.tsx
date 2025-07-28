import * as THREE from "three"

import vertex from "../shaders/window/vert.glsl"
import fragment from "../shaders/window/frag.glsl"

import { u_progress } from "../store/uniformsStore"

import { useEffect, useMemo, useRef } from "react"

export const Windows = ({ tl }) => {
    const groupRef = useRef(null);

    useEffect(() => {
        const children = groupRef.current.children;

        // tl.current.to(
        //     children.map(obj => obj.position),
        //     {
        //         z: -5,
        //         stagger: 0.35,
        //         duration: 0.25,
        //         ease: 'power2.inOut',
        //     },
        //     0.8
        // )

        tl.current.to(
            children.map(obj => obj.rotation),
            {
                z: Math.PI,
                stagger: 0.05,
                duration: 0.25,
                ease: 'power2.inOut',
            },
            0.8
        )

        tl.current.to(
            children.map(obj => obj.rotation),
            {
                z: -Math.PI,
                stagger: 0.05,
                duration: 0.25,
                ease: 'power2.inOut',
            },
            1.0
        )
    }, [])

    const items = Array.from({ length: 7 })

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