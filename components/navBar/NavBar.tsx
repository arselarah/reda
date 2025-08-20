import React from 'react'

export default function NavBar() {
  return (
    <>
      <section className='relative flex items-center justify-between bg-gray-800 px-4 text-white'>
        <div className='logo'>
          <div>REDA</div>
        </div>
        <nav>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}
