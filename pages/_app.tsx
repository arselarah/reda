import { AppProps } from 'next/app'
import '@/pages/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <main className=''>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
