import React from 'react'

export default function SaleCards() {
  return (
    <>
      <section className='sale-cards relative z-[1] flex h-screen w-full items-center'>
        <div className='sale-cards_container mx-auto flex w-full max-w-[75rem] flex-col items-start justify-center px-4'>
          <div className='max-w-[70%] bg-[radial-gradient(100%_162.87%_at_0_0,_#00b354_0%,_#00d262_100%)] p-8 lg:p-16'>
            <h2 className='mb-4 text-6xl font-bold text-white'>
              Tu equipo merece una forma más inteligente de vender
            </h2>
            <p className='mb-8 max-w-[50%] text-lg text-white'>
              Con Reda, optimizas cada interacción y conviertes leads en
              clientes, asegurando que tu negocio crezca con una metodología
              probada.
            </p>
            <p className='mb-8 text-lg text-white'>
              ¡Lleva tu negocio al siguiente nivel!
            </p>
            <div className='hero-index_cta-buttons flex space-x-4'>
              <button className='rounded-lg border border-transparent bg-black px-6 py-3 font-bold text-white hover:border-black hover:bg-transparent hover:text-black'>
                Comenzar Ahora
              </button>
              <button className='rounded-lg border border-white bg-transparent px-6 py-3 font-bold text-white hover:border-black hover:text-black'>
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
