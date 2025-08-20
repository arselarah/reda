import { AppProps } from 'next/app'
import '@/pages/globals.css'
import NavBar from '@/components/navBar/NavBar'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <main className=''>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
