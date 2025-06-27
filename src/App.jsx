import './App.css'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ScrollControls, useScroll, Stars } from '@react-three/drei'
import gsap from 'gsap'

function App() {

  return (
    <>
      <Canvas>
        <color attach="background" args={['black']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ScrollControls pages={3} damping={0.5}>
          <Scene />
        </ScrollControls>

      </Canvas>
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
  const scroll = useScroll();

  const { camera } = useThree()

  useEffect(() => {
    tl.current
      .to(camera.position, {
        z: -5,
        duration: 0.2,
      }, 1.3) // start at progress 0
      .to(camera.rotation, {
        y: Math.PI,
        duration: 0.25,
      }, 1.5) // start at 0.5

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
      {/* <OrbitControls /> */}
      <Box tl={tl} />
      <Ball tl={tl} />
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