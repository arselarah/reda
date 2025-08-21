import React from 'react'
import { Archivo } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function NavBar() {
  return (
    <>
      <section
        className={` ${archivo.className} nav-bar border-b-1 sticky top-0 z-10 flex h-[68px] w-full items-center justify-between border border-gray-100 bg-white px-4 text-white`}
      >
        <article className='nav-bar_inner-container relative mx-auto flex h-full w-full max-w-[75rem] items-center justify-start'>
          <div className='nav-bar_logo-container relative flex h-full w-40 items-center justify-center text-black'>
            <div className='nav-bar_logo flex h-full w-full items-center justify-center gap-2'>
              <div className='h-8 w-8 rounded-full bg-[#00d262]'></div>
              <a href='/' className='text-3xl font-semibold tracking-wider'>
                reda
              </a>
            </div>
          </div>
          <nav className='nav-bar_menu-container relative h-full w-full px-8'>
            <ul className='flex h-full w-full items-center justify-start space-x-4 font-semibold tracking-wider text-black'>
              <li>
                <a href='/'>Inicio</a>
              </li>

              <li>
                <a href='/precios'>Precios</a>
              </li>
              <li>
                <a href='/aprendizaje'>Aprendizaje</a>
              </li>
              <li>
                <a href='/soporte'>Soporte</a>
              </li>
              <li>
                <a href='/blog'>Blog</a>
              </li>
              <li>
                <a href='/nosotros'>Nosotros</a>
              </li>
            </ul>
          </nav>
          <div className='nav-bar_cta-container relative flex h-full w-full items-center justify-end gap-4 tracking-wider text-black'>
            <button className='rounded-lg border border-gray-300 bg-transparent px-[24px] py-[12px] font-bold text-black hover:bg-gray-200'>
              Ingresar
            </button>
            <button className='rounded-lg bg-[#00d262] px-[24px] py-[12px] font-bold text-white hover:bg-green-500'>
              Agenda una DEMO
            </button>
          </div>
        </article>
      </section>
    </>
  )
}
