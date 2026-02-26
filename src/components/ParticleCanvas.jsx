import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function SpiceParticles() {
    const ref = useRef()
    const count = 2500

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const c1 = new THREE.Color('#D4A017')
        const c2 = new THREE.Color('#E63946')
        const c3 = new THREE.Color('#F0C040')

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 1 + Math.random() * 8
            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10
            positions[i * 3 + 2] = Math.sin(angle) * radius

            const c = Math.random() < 0.5 ? c1 : Math.random() < 0.5 ? c2 : c3
            colors[i * 3] = c.r
            colors[i * 3 + 1] = c.g
            colors[i * 3 + 2] = c.b
        }
        return { positions, colors }
    }, [count])

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.elapsedTime * 0.08
            ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.2
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    )
}

function RotatingRing({ radius, tube, color, speed, tiltX = 0, tiltZ = 0 }) {
    const ref = useRef()

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.elapsedTime * speed
            ref.current.rotation.x = tiltX + Math.sin(clock.elapsedTime * 0.3) * 0.1
        }
    })

    return (
        <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
            <torusGeometry args={[radius, tube, 16, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.25}
                wireframe={false}
            />
        </mesh>
    )
}

export default function ParticleCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 5, 5]} intensity={2} color="#D4A017" />
            <pointLight position={[0, -5, -5]} intensity={1} color="#E63946" />
            <SpiceParticles />
            <RotatingRing radius={3.5} tube={0.04} color="#D4A017" speed={0.15} tiltX={0.4} />
            <RotatingRing radius={5} tube={0.03} color="#E63946" speed={-0.1} tiltX={-0.3} tiltZ={0.5} />
            <RotatingRing radius={2} tube={0.05} color="#F0C040" speed={0.25} tiltX={0.8} />
        </Canvas>
    )
}
