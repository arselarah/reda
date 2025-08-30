import React from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Archivo } from 'next/font/google'
import CenteredIphone from '../ejemplo/Three'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function HeroIndex() {
  const refHero = useRef(null)
  const { scrollYProgress: opacityHero } = useScroll({
    target: refHero,
    offset: ['.5 start', 'start start']
  })
  const opacity = useTransform(opacityHero, [0, 1], ['0%', '100%'])
  return (
    <>
      <section
        ref={refHero}
        className={` ${archivo.className} hero-index relative z-0 h-[300vh] w-full overflow-hidden`}
      >
        <motion.div
          style={{ opacity }}
          className='hero-index_container fixed left-0 top-0 flex min-h-screen w-full items-start justify-center pt-[15vh]'
        >
          <div className='hero-index_overlay absolute left-0 top-0 h-full w-full'></div>
          <div className='hero-index_content relative z-10 flex h-full w-full max-w-[75rem] flex-col items-center justify-center px-4 text-center text-black'>
            <h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-8xl'>
              Bienvenido a la nueva era digital en ventas
            </h1>
            {/* <p className='mb-8 max-w-2xl text-lg md:text-xl'>
              Reda es el primer CRM optimizado para centralizar, automatizar y
              escalar tu proceso comercial.
            </p> */}
            <p className='text-md mb-8 max-w-2xl text-[#888888] md:text-2xl'>
              Conecta marketing, ventas y finanzas en una sola plataforma con
              tecnología inteligente, herramientas automatizadas y métricas en
              tiempo real.
            </p>
          </div>
        </motion.div>
        <CenteredIphone />
      </section>
    </>
  )
}
