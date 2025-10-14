import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, SoftShadows } from "@react-three/drei"

function Model(props) {
  const { nodes, materials, animations } = useGLTF(`${import.meta.env.BASE_URL}models/jump-transformed.glb`)
  const { ref, actions } = useAnimations(animations)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => void (actions.jump.reset().play().paused = true), [actions])
  
  // 监听页面滚动
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.three-animation-section')
      if (container) {
        const rect = container.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        // 计算容器在视口中的位置
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)))
        setScrollProgress(progress)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始调用
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame(() => {
    if (actions.jump) {
      actions.jump.time = actions.jump.getClip().duration * scrollProgress
    }
  })
  
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
    </group>
  )
}

export const ThreeScene = () => (
  <Canvas shadows gl={{ antialias: false, alpha: true }} camera={{ position: [0.8, 0.3, 2.8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
    <color attach="background" args={["#FF3347"]} />
    <fog attach="fog" args={["#FF3347", 0, 20]} />
    <ambientLight intensity={0.5} />
    <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
    <Model position={[0, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.0105} />
    <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -0.96, 0]} receiveShadow>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shadowMaterial transparent opacity={0.75} />
    </mesh>
    <SoftShadows size={40} samples={16} />
  </Canvas>
)

