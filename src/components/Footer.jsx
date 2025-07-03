import React from 'react'

const Footer = () => {
  return (

    <div className='flex flex-grow  justify-center  items-center'>
    <div className="bg-slate-800 mt-[200px] text-white flex flex-col justify-center items-center fixed  bottom-0 w-full">
        <div className='font-bold  '>
             <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
        </div>

        <div className='flex justify-center items-center '>

      Created with <img className='w-8 mx-1' src="/icons/love.png" alt="love" /> by Shahid
        </div>
    </div>

    </div>
  )
}

export default Footer
