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
  const iphone = useRef<THREE.Group & { initialScale?: number }>()

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
        const model = gltf.scene as THREE.Group & { initialScale?: number }
        model.scale.set(0.3, 0.3, 0.3)
        model.position.set(0, -0.8, -0.1)
        model.rotation.set(-1.2, 0, 0)
        model.initialScale = 0.2 // Guardar escala inicial

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

  // Manejar evento de scroll - Animación en fases con escalado
  useEffect(() => {
    const handleScroll = () => {
      if (!iphone.current || !sceneRef.current) return

      const scrollY = window.scrollY
      const sceneHeight = sceneRef.current.clientHeight - window.innerHeight
      const progress = Math.min(scrollY / sceneHeight, 1)

      setScrollProgress(progress)

      // Definir las fases de la animación
      const scalePhase = 0.3 // 30% del scroll para completar cambio de tamaño
      const rotationPhase = 0.6 // 60% del scroll para completar rotación

      if (progress <= scalePhase) {
        // FASE 1: Cambio de tamaño y posición vertical (0% - 30% del scroll)
        const scaleProgress = progress / scalePhase

        // Rotación progresiva (solo 70% de la rotación completa)
        iphone.current.rotation.x = THREE.MathUtils.lerp(
          -1.2,
          -0.36, // -1.2 + (0 - (-1.2)) * 0.7 = -0.36
          scaleProgress
        )

        // Reducción de escala de 0.3 a 0.15
        iphone.current.scale.setScalar(
          THREE.MathUtils.lerp(0.3, 0.15, scaleProgress)
        )

        // Elevación vertical de -0.8 a -0.2
        iphone.current.position.y = THREE.MathUtils.lerp(
          -0.8,
          -0.2,
          scaleProgress
        )
      } else if (progress <= rotationPhase) {
        // FASE 2: Terminar la rotación (30% - 60% del scroll)
        const rotationProgress =
          (progress - scalePhase) / (rotationPhase - scalePhase)

        // Completar la rotación (últimos 30%)
        iphone.current.rotation.x = THREE.MathUtils.lerp(
          -0.36,
          0,
          rotationProgress
        )

        // Mantener tamaño y posición ya completados
        iphone.current.scale.setScalar(0.15)
        iphone.current.position.y = -0.2
      } else {
        // FASE 3: Mantener estado final (60% - 100% del scroll)
        iphone.current.rotation.x = 0 // Rotación frontal completa
        iphone.current.scale.setScalar(0.15) // Tamaño reducido
        iphone.current.position.y = -0.2 // Posición elevada
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Actualizar al montar

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='relative min-h-[300vh]' ref={sceneRef}>
      {/* Contenedor del iPhone FIJADO */}
      <div className='relative z-[1] flex h-screen w-full items-center justify-start'>
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
      {/* <div className='fixed bottom-5 right-5 z-50 rounded-3xl bg-black/70 p-4 text-sm text-white'>
        Progreso: {Math.round(scrollProgress * 100)}%
      </div> */}
    </div>
  )
}
