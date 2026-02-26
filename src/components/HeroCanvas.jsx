import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField() {
    const ref = useRef()
    const count = 1800

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return pos
    }, [count])

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.04
            ref.current.rotation.y = state.clock.elapsedTime * 0.06
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#d4a017"
                size={0.035}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    )
}

function FloatingOrbs() {
    const orbs = useMemo(() => (
        Array.from({ length: 5 }, (_, i) => ({
            id: i,
            pos: [
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 3,
            ],
            radius: 0.3 + Math.random() * 0.5,
            speed: 0.3 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
        }))
    ), [])

    return orbs.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
    ))
}

function FloatingOrb({ pos, radius, speed, phase }) {
    const ref = useRef()

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * speed + phase) * 0.6
            ref.current.rotation.y = clock.elapsedTime * 0.3
        }
    })

    return (
        <mesh ref={ref} position={pos}>
            <torusGeometry args={[radius, radius * 0.15, 12, 48]} />
            <meshStandardMaterial
                color="#d4a017"
                emissive="#A07010"
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
                wireframe={false}
            />
        </mesh>
    )
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#d4a017" />
            <pointLight position={[-5, -3, -3]} intensity={0.5} color="#E63946" />
            <StarField />
            <FloatingOrbs />
        </Canvas>
    )
}
