import './App.css'
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Gltf, ScrollControls, useScroll, Stars, Float, Text, StatsGl, Preload, Center, useGLTF } from '@react-three/drei'
import gsap from 'gsap'

import { Planes } from './components/Planes'
import { Lights } from './components/Light'

function App() {

  return (
    <>
      <Canvas shadows={false}>
        <color attach="background" args={['black']} />
        <StatsGl className="stats" />
        <Float speed={1} // Animation speed, defaults to 1
          rotationIntensity={1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />

        </Float>
        <ScrollControls pages={8} damping={0.5} maxSpeed={0.2}>
          <Scene />
        </ScrollControls>
        <Lights />
      </Canvas >
    </>
  )
}

export default App

function snapToClosest(progress, snapPoints, threshold = 0.05) {
  let closest = progress
  for (const point of snapPoints) {
    if (Math.abs(progress - point) < threshold) {
      closest = point
      break
    }
  }
  return closest
}

const Scene = () => {

  const tl = useRef(gsap.timeline({ paused: true }))
  const refModel1 = useRef(null)
  const refModel2 = useRef(null)

  const scroll = useScroll();

  const { camera, scene } = useThree()

  useEffect(() => {
    const group = new THREE.Group();

    tl.current
      .to(camera.position, {
        z: -3,
        duration: 3.2,
        ease: 'linear'
      }, 0.3) // start at progress 0
      .to(camera.position, {
        z: -7,
        duration: 0.25,
        ease: 'linear'
      }, ">0.5") // start at 0.5
      .to([camera.position, refModel1.current.position], {
        z: -6,
        x: -1,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 4.5)
      .to([camera.rotation, refModel1.current.rotation], {
        x: 0,
        y: Math.PI / 2,
        z: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 4.5)
      .to(refModel1.current.material.color, {
        r: 0.25,
        g: 0.65,
        b: 0.05,
        duration: 0.15,
        ease: 'power2.inOut'
      }, 4.5)
      .to([refModel1.current.rotation], {
        x: Math.PI / 2,
        y: 0,
        z: 3 * Math.PI / 2,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 4.8)
      .to(camera.position, {
        x: 1,
        z: -7,
        duration: 0.25,
        ease: 'power2.inOut'
      }, 4.8) // start at 0.5
    // .to(group.rotation, {
    //   x: 0,
    //   y: Math.PI / 2,
    //   z: 0,
    //   duration: 0.3,
    //   ease: 'power2.inOut',
    //   onStart: () => {
    //     if (refModel1.current) {
    //       scene.remove(refModel1.current)
    //       scene.remove(camera)
    //       group.add(refModel1.current)
    //       group.add(camera)
    //       scene.add(group)
    //     }
    //   },
    //   onComplete: () => {
    //     if (refModel1.current) {
    //       group.remove(refModel1.current)
    //       group.remove(camera)
    //       scene.remove(group)
    //       scene.add(refModel1.current)
    //       scene.add(camera)
    //     }
    //   }
    // }, ">0.8") // запускаются одновременно
    // .to(camera.position, {
    //   z: 10,
    //   duration: 0.25,
    //   ease: 'linear'
    // }, 0.96) // start at 0.5

  }, [])

  useFrame(() => {
    const rawProgress = scroll.offset
    // const snappedProgress = snapToClosest(rawProgress, [0, 0.5, 1])
    tl.current.progress(rawProgress)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <Logo tl={tl} /> */}
      <Suspense fallback={null}>
        <Model ref={refModel1} tl={tl} color={'#A5A5E0'} position={[0, 0, 0]} />
        <Model ref={refModel2} tl={tl} color={'#000022'} position={[0.05, 0, 0]} />
      </Suspense>
      <Description tl={tl} />
      <Planes tl={tl} />
      {
        Array.from({ length: 35 }).map((plane, index) => (
          <Planes tl={tl}
            key={index}
            isRotating={false}
            positionX={Math.random() * 100 - 50}
            positionY={Math.random() * 100 - 50} scale={0.1} />
        ))
      }

      {/* <OrbitControls /> */}
      {/* <Box tl={tl} /> */}
      {/* <Ball tl={tl} /> */}
    </>
  )
}


useGLTF.preload('./vrt.glb')

const Model = forwardRef(({ tl, color, position }, ref) => {
  const { nodes } = useGLTF('./vrt.glb');

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
      <Center>
        <mesh
          ref={ref}
          geometry={nodes.svgMesh1.geometry}
          rotation={[Math.PI / 2, 0, 0]}
          position={position}
          scale={0.06}
        >
          <meshPhysicalMaterial color={color} />
        </mesh>
      </Center>
    </group>
  );
});

const Logo = ({ tl }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      // Добавляем анимацию в Timeline
      tl.current.to(ref.current.position, {
        x: 0,
        duration: 0.2,
        ease: 'bounce.in' // добавлен ease
      }, 0.15) // start at progress 0

      tl.current.to(ref.current.position, {
        x: 0,
        duration: 0.2,
        ease: 'bounce.in' // добавлен ease
      }, 0.35) // start at progress 0

      tl.current.to(ref.current.position, {
        z: -10,
        duration: 2,
        ease: 'back.out(1.7)' // легкий отскок в конце
      }, 0.55) // start at progress 0
    }
  }, [])

  return (
    <>
      <Text ref={ref}
        color={'white'}
        position={[-15, 0, 0]}

        fontSize={0.8}>
        VRT
      </Text>
    </>
  )
}

const Description = ({ tl }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      // Добавляем анимацию в Timeline
      tl.current.to(ref.current.position, {
        x: 0,
        duration: 0.2,
        ease: 'linear'
      }, 0.25) // start at progress 0
    }
  }, [])
  return (
    <>
      <Text ref={ref}
        color={'white'}
        position={[20, -0.4, 0]}
        fontSize={0.1}
        fontStyle='italian'
        font='./soria-font.ttf'
      >
        Life is not fair, but our work always greate.
      </Text>
    </>
  )
}

const Ball = ({ tl }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      // Добавляем анимацию в Timeline
      tl.current.to(ref.current.position, {
        y: 2,
        duration: 3,
      }, 0.65) // start at progress 0

      // tl.current.to(ref.current.position, {
      //   y: 0,
      //   duration: 1,
      // }, 0.75) // start at 0.5
    }
  }, [])

  return (
    <>
      <mesh ref={ref} position={[-1.5, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={'blue'} />
      </mesh>
    </>
  )
}

const Box = ({ tl }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      // Добавляем анимацию в Timeline
      tl.current.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
      }, 0) // start at progress 0

      tl.current.to(ref.current.position, {
        x: 2,
        duration: 1,
      }, 0.5) // start at 0.5
    }
  }, [])

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}