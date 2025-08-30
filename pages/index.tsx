import React from 'react'
import Image from 'next/image'
import HeroIndex from '@/components/heroIndex/HeroIndex'
import SaleCards from '@/components/sale/SaleCards'

const herramientas = [
  {
    title: 'Campañas Masivas',
    description:
      'Envía mensajes masivos desde WhatsApp a todos tus prospectos.',
    imageUrl: '/assets/herramientas/pexels-a-darmel-7641842.jpg',
    link: '/tools/roi-calculator'
  },
  {
    title: 'Digitaliza tu proyecto',
    description:
      'Lleva toda tu gestión de manera digital con eficiencia y seguridad.',
    imageUrl: '/assets/herramientas/pexels-a-darmel-7642000.jpg',
    link: '/tools/ad-generator'
  },
  {
    title: 'Estudio Reda',
    description:
      'Obtén en tiempo real reportes detallados de marketing, ventas y finanzas.',
    imageUrl: '/assets/herramientas/pexels-expect-best-79873-323705.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'Asistencia y análisis por IA',
    description: 'Deja que la inteligenia artificial haga el trabajo por ti.',
    imageUrl: '/assets/herramientas/pexels-heyho-8146316.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'Interconexiones inteligentes',
    description: 'Deja que la inteligenia artificial haga el trabajo por ti.',
    imageUrl: '/assets/herramientas/pexels-a-darmel-7641842.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'Nube de contenidos',
    description:
      'Centraliza tu material de ventas, documentos, imágenes y más.',
    imageUrl: '/assets/herramientas/pexels-expect-best-79873-323705.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'Semáforo Reda',
    description: 'Gestiona tu embudo de ventas automaticamente.',
    imageUrl: '/assets/herramientas/pexels-expect-best-79873-323705.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'WhatsApp API ilimitado',
    description: 'Integra WhatsApp Business con líneas ilimitadas sin costo.',
    imageUrl: '/assets/herramientas/pexels-a-darmel-7641842.jpg',
    link: '/tools/competitor-analyzer'
  },
  {
    title: 'Webhooks y automatización',
    description: 'Programa acciones y optimiza tu flujo de trabajo.',
    imageUrl: '/assets/herramientas/pexels-a-darmel-7641842.jpg',
    link: '/tools/competitor-analyzer'
  }
]

export default function index() {
  return (
    <>
      <main>
        <HeroIndex />
        <SaleCards />
        <section className='w-full bg-white'>
          <div className='relative mx-auto flex h-full w-full max-w-[75rem] flex-col items-start justify-center gap-8 px-4 lg:flex-row-reverse lg:px-0'>
            <div className='sticky top-0 flex h-screen w-[80rem] grow flex-col justify-center'>
              <div className='relative w-full bg-blue-800 md:px-16 md:py-40'>
                <h2 className='mb-4 text-6xl font-bold text-white lg:ml-52'>
                  Herramientas para maximizar tus resultados
                </h2>
              </div>
            </div>
            <div className='relative -mr-44 h-full w-[50%] py-[50%]'>
              {
                // Grid of herramientas
                herramientas.map(herramienta => (
                  <div
                    key={herramienta.title}
                    className='relative mb-8 flex h-80 w-full flex-col overflow-hidden bg-gray-200 p-0'
                  >
                    <Image
                      src={herramienta.imageUrl}
                      alt={herramienta.title}
                      width={400}
                      height={160}
                      className='absolute mb-4 h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-40'>
                      <div className='relative flex h-full w-full flex-col items-start justify-end p-4 lg:p-8'>
                        <h3 className='z-[1] text-2xl font-semibold text-white lg:text-4xl'>
                          {herramienta.title}
                        </h3>
                        <p className='pt-4 text-xl text-white lg:text-2xl'>
                          {herramienta.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
