import { motion } from 'motion/react'

export default function SaleCards() {
  return (
    <>
      <section
        id='sale-cards-section'
        className='sale-cards relative z-[1] flex h-screen w-full items-center bg-white'
      >
        <div className='sale-cards_container relative mx-auto flex h-full w-full max-w-[75rem] flex-row items-center justify-center px-4'>
          <div className='relative w-full'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className='max-w-[70%] bg-[radial-gradient(100%_162.87%_at_0_0,_#00b354_0%,_#00d262_100%)] p-8 lg:p-16'
            >
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
            </motion.div>
            <div className='sale-cards_video absolute -bottom-8 right-0'>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/drNhjmjugFI?si=wHfWFYnX3hg0HW1m'
                title='YouTube video player'
                // frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
