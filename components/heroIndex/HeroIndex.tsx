import React from 'react'

export default function HeroIndex() {
  return (
    <>
      <section>
        <div className='hero-index_container relative flex min-h-screen w-full items-center justify-center'>
          <div className='hero-index_overlay absolute left-0 top-0 h-full w-full bg-black/60'></div>
          <div className='hero-index_content relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white'>
            <h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
              La plataforma todo en uno para gestionar tu negocio
            </h1>
            <p className='mb-8 max-w-2xl text-lg md:text-xl'>
              Simplifica la administración de tu empresa con nuestras
              herramientas integradas y fáciles de usar.
            </p>
            <div className='hero-index_cta-buttons flex space-x-4'>
              <button className='rounded-lg bg-[#00d262] px-6 py-3 font-bold text-white hover:bg-green-500'>
                Comenzar Ahora
              </button>
              <button className='rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-bold text-white hover:bg-gray-200 hover:text-black'>
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
