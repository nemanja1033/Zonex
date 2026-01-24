"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - 0.5;
    float n = noise(uv * 12.0 + uTime * 0.2);
    float pulse = 0.12 * sin(uTime * 0.6 + length(centered) * 8.0);
    float glow = smoothstep(0.35, 0.0, length(centered + uPointer * 0.08));
    vec3 base = vec3(0.12, 0.13, 0.15);
    vec3 accent = vec3(0.45, 0.18, 0.18);
    vec3 color = mix(base, accent, glow * 0.4 + pulse * 0.3) + n * 0.03;
    gl_FragColor = vec4(color, 0.55);
  }
`

function AccentPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { invalidate } = useThree()

  useEffect(() => {
    let frame = 0
    const handleMove = (event: MouseEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = (event.clientY / window.innerHeight) * 2 - 1
        pointerRef.current = { x, y }
        invalidate()
        frame = 0
      })
    }

    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [invalidate])

  useEffect(() => {
    let active = true
    let start = performance.now()

    const kick = (time: number) => {
      if (!active) return
      if (time - start < 1200) {
        invalidate()
        requestAnimationFrame(kick)
      }
    }

    requestAnimationFrame(kick)

    return () => {
      active = false
    }
  }, [invalidate])

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    materialRef.current.uniforms.uPointer.value = pointerRef.current
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    []
  )

  return (
    <mesh>
      <planeGeometry args={[1.6, 1.2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default function HeroAccent() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 2.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <AccentPlane />
    </Canvas>
  )
}
