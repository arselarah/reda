import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function CenteredIphone() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const requestRef = useRef<number>()
  const scene = useRef<THREE.Scene>()
  const camera = useRef<THREE.PerspectiveCamera>()
  const renderer = useRef<THREE.WebGLRenderer>()
  const iphone = useRef<THREE.Group>()

  useEffect(() => {
    if (!containerRef.current) return

    // Inicializar escena
    scene.current = new THREE.Scene()
    scene.current.background = null

    // Inicializar cámara
    camera.current = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.current.position.set(0, 0, 4)

    // Inicializar renderizador
    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    )
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.current.domElement)

    // Luces para mejor visualización
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.current.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(2, 3, 4)
    scene.current.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0x4477ff, 0.4)
    backLight.position.set(-3, 2, -3)
    scene.current.add(backLight)

    // Cargar modelo iPhone
    const loader = new GLTFLoader()
    loader.load(
      '/assets/3d/iphone_16_-_free.glb',
      gltf => {
        const model = gltf.scene
        model.scale.set(0.2, 0.2, 0.2) // Tamaño reducido
        model.position.set(0, -0.8, -0.1) // Abajo (Y negativo) y frente (Z negativo)
        model.rotation.set(-1, 0, 0) // Inclinado hacia arriba

        scene.current?.add(model)
        iphone.current = model
        setLoading(false)
      },
      undefined,
      error => {
        console.error('Error cargando el modelo:', error)
        setError('Error al cargar el modelo 3D')
        setLoading(false)
      }
    )

    // Ajustar en redimensionamiento
    const handleResize = () => {
      if (!containerRef.current || !camera.current || !renderer.current) return
      camera.current.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.current.updateProjectionMatrix()
      renderer.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      )
    }

    window.addEventListener('resize', handleResize)

    // Bucle de animación
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)
      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current)
      }
    }
    animate()

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (renderer.current) {
        renderer.current.dispose()
      }
      if (containerRef.current && renderer.current?.domElement) {
        containerRef.current.removeChild(renderer.current.domElement)
      }
    }
  }, [])

  // Manejar evento de scroll - Interpolación de rotación
  useEffect(() => {
    const handleScroll = () => {
      if (!iphone.current || !sceneRef.current) return

      const scrollY = window.scrollY
      const sceneHeight = sceneRef.current.clientHeight - window.innerHeight
      const progress = Math.min(scrollY / sceneHeight, 1)

      setScrollProgress(progress)

      // Interpolar la rotación desde la posición inicial (-1) hasta frontal (0)
      iphone.current.rotation.x = THREE.MathUtils.lerp(-1, 0, progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Actualizar al montar

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='relative min-h-[200vh]' ref={sceneRef}>
      {/* Contenedor del iPhone FIJADO */}
      <div className='relative z-[-1] flex h-screen w-full items-center justify-start'>
        <div ref={containerRef} className='fixed top-0 h-screen w-full'></div>

        {loading && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-black/70 p-5 text-white'>
            Cargando modelo 3D...
          </div>
        )}

        {error && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-red-500/70 p-5 text-white'>
            {error}
          </div>
        )}
      </div>

      {/* Indicador de progreso (opcional) */}
      <div className='fixed bottom-5 right-5 z-50 rounded-3xl bg-black/70 p-4 text-sm text-white'>
        Progreso: {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  )
}
