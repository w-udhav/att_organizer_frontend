import React from 'react'

const Navbar = () => {
  return (
    <div className='border border-grey'>
      <div className='flex flex-row items-center justify-between py-3 md:px-16 px-3'>
        <div className='flex flex-row items-center space-x-3'>
          <img className='w-[45px]' src={require('../assets/logo.png')} alt="" />
          <div className='text-2xl'> PlayGround </div>
        </div>
        <div> links </div>
      </div>
    </div>
  )
}

export default Navbar