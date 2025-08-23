import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function CenteredRotatingIphone() {
  const containerRef = useRef<HTMLDivElement>(null)
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
        model.scale.set(0.15, 0.15, 0.15) // Tamaño reducido
        model.position.set(0, -1, 0) // Centrado en la escena
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

  // Manejar evento de scroll - SOLO ROTACIÓN
  useEffect(() => {
    const handleScroll = () => {
      if (!iphone.current) return

      const scrollY = window.scrollY
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / documentHeight, 1)

      setScrollProgress(progress)

      // SOLO ROTACIÓN - el iPhone se queda en el centro
      const rotationAngle = progress * Math.PI * 2 // Rotación completa (360°)
      iphone.current.rotation.y = rotationAngle
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Actualizar al montar

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='relative min-h-[200vh]'>
      {/* Contenedor del iPhone FIJADO */}
      <div className='fixed left-0 top-0 z-[-1] h-screen w-full'>
        <div
          ref={containerRef}
          className='flex h-full w-full items-center justify-end'
        />

        {loading && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px]'>
            Cargando modelo 3D...
          </div>
        )}

        {error && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] text-lg text-white'>
            {error}
          </div>
        )}
      </div>

      <div className='fixed bottom-5 right-5 z-50 rounded-3xl p-4 text-sm text-slate-500'>
        Rotación: {Math.round(scrollProgress * 360)}°
      </div>
    </div>
  )
}
