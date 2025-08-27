import React from 'react'
import HeroIndex from '@/components/heroIndex/HeroIndex'
import SaleCards from '@/components/sale/SaleCards'

export default function index() {
  return (
    <>
      <main>
        <HeroIndex />
        <SaleCards />
        <section className='w-full bg-white'>
          <div className='relative mx-auto flex h-full w-full max-w-[75rem] flex-col items-start justify-center px-4 lg:flex-row'>
            <div className='sticky top-0 flex h-screen flex-col justify-center'>
              <h2 className='mb-4 text-6xl font-bold'>
                Herramientas para maximizar tus resultados
              </h2>
            </div>
            <div className='relative h-full w-full'>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
              <div className='relative mb-8 h-80 w-full bg-gray-300'></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
