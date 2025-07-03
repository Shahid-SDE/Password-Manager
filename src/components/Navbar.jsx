import React from 'react'

const Navbar = () => {
  return (

    <nav className='bg-slate-800 text-white flex justify-between h-10 items-center px-4 myContainer'>

        <div className="logo font-bold text-xl">
          
          <span className='text-green-700'>&lt;</span>

          Pass
          
          <span className='text-green-700'>OP/&gt;</span>
          </div>
     
      <button className="">

        <img className='invert w-10' src="/icons/github.svg" alt="github" />
      </button>
    </nav>
  )
}

export default Navbar
