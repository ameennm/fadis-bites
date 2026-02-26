import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PresentationControls, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Abstract 3D representations of the food types
function AbstractFoodShape({ name }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    // Determine geometry based on food name
    const isSamosa = name.toLowerCase().includes('samosa') || name.toLowerCase().includes('pie') || name.toLowerCase().includes('ada')
    const isRoll = name.toLowerCase().includes('roll') || name.toLowerCase().includes('unnakkai') || name.toLowerCase().includes('bite') && !name.toLowerCase().includes('bread')
    const isDisc = name.toLowerCase().includes('disc') || name.toLowerCase().includes('pathiri') || name.toLowerCase().includes('poovada')
    const isSquare = name.toLowerCase().includes('bread') || name.toLowerCase().includes('pocket')

    // Colors based on fried/golden texture
    const goldBase = '#d4a017'
    const crispyBrown = '#a0522d'

    return (
        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} receiveShadow castShadow>
                {isSamosa && <tetrahedronGeometry args={[1.5]} />}
                {isRoll && <capsuleGeometry args={[0.7, 1.2, 4, 32]} />}
                {isDisc && <cylinderGeometry args={[1.4, 1.4, 0.4, 32]} />}
                {isSquare && <boxGeometry args={[1.6, 1.4, 0.6]} />}
                {(!isSamosa && !isRoll && !isDisc && !isSquare) && <dodecahedronGeometry args={[1.2]} />}

                <meshPhysicalMaterial
                    color={isSamosa ? crispyBrown : goldBase}
                    roughness={0.4}
                    metalness={0.1}
                    clearcoat={0.3}
                    clearcoatRoughness={0.8}
                    envMapIntensity={2}
                />
            </mesh>
        </Float>
    )
}

function SpiceParticles() {
    const ref = useRef()
    const count = 40

    const { positions, scales } = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const scale = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 4
            pos[i * 3 + 1] = (Math.random() - 0.5) * 4
            pos[i * 3 + 2] = (Math.random() - 0.5) * 2
            scale[i] = Math.random() * 0.15 + 0.05
        }
        return { positions: pos, scales: scale }
    }, [])

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.1
            ref.current.rotation.z = state.clock.elapsedTime * 0.05
        }
    })

    return (
        <group ref={ref}>
            {Array.from({ length: count }).map((_, i) => (
                <mesh
                    key={i}
                    position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}
                    scale={scales[i]}
                >
                    <dodecahedronGeometry args={[1]} />
                    <meshBasicMaterial color={Math.random() > 0.5 ? '#E63946' : '#d4a017'} opacity={0.6} transparent />
                </mesh>
            ))}
        </group>
    )
}

export default function MenuCanvas({ item }) {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, cursor: 'grab' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#E63946" />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <group position={[0, 0.2, 0]}>
                        <AbstractFoodShape name={item.name} />
                        <SpiceParticles />
                    </group>
                </PresentationControls>

                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2.5}
                    far={4}
                    color="#000000"
                />

                {/* Adds realistic reflections to the materials */}
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
