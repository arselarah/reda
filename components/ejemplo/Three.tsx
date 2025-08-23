'use client'

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
    camera.current.position.set(0, 0, 5)

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
        model.position.set(0, 0, 0) // Centrado en la escena
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
    <div style={{ position: 'relative', minHeight: '200vh' }}>
      {/* Contenedor del iPhone FIJADO */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: -1
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%'
          }}
        />

        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '18px',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            Cargando modelo 3D...
          </div>
        )}

        {error && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '18px',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: 'rgba(200,0,0,0.7)',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '10px 15px',
          borderRadius: '20px',
          zIndex: 100
        }}
      >
        Rotación: {Math.round(scrollProgress * 360)}°
      </div>

      {/* <div
        style={{
          padding: '100vh 20px 40px 20px', 
          maxWidth: '800px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          position: 'relative',
          zIndex: 5
        }}
      >
        <h1>iPhone Rotando en el Centro</h1>
        <p>
          Desplázate hacia abajo para ver cómo el iPhone gira sobre su eje
          mientras permanece fijo en el centro de la pantalla.
        </p>

        <div style={{ height: '50vh' }}></div>

        <h2>Características</h2>
        <ul>
          <li>iPhone centrado en pantalla</li>
          <li>Posición fija durante el scroll</li>
          <li>Rotación controlada por scroll</li>
          <li>Tamaño reducido para mejor visualización</li>
        </ul>

        <div style={{ height: '50vh' }}></div>

        <h2>Más contenido</h2>
        <p>Sigue desplazándote para ver la rotación completa del iPhone.</p>

        <div style={{ height: '50vh' }}></div>

        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            marginTop: '40px'
          }}
        >
          <h3>¡Rotación completada!</h3>
          <p>El iPhone ha girado 360° gracias al scroll.</p>
        </div>

        <div style={{ height: '50vh' }}></div>
      </div> */}
    </div>
  )
}
