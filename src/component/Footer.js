import React from 'react'

const Footer = () => {
  return (
    <div className='pt-8 pb-3 bg-zinc-800 text-[#FAFAFA] w-full relative '>
      <div className='flex flex-col sticky left-0 bottom-0'>
        <div className='flex-1 flex flex-row space-x-2 items-center justify-center'>
          <img className='w-6' src={require('../assets/logo.png')} alt="" />
          <p> PlayGround | <span className='text-[14px]'> Student Dashboard </span> </p>
        </div>

        {/* Div 2 */}
        <div className='flex flex-row items-center justify-center py-5 space-x-3'>
          <p> Follow me at:</p>
          <div className='flex flex-row space-x-6 items-center'>
            <a href="https://www.instagram.com/w_udhav/" target="_blank" rel='noreferrer'>
              <img className='w-6' src={require('../assets/social apps/Instagram.svg').default} alt="" />
            </a>
            <a href="https://www.facebook.com/wudhav/" target="_blank" rel='noreferrer'>
              <img className='w-6' src={require('../assets/social apps/Facebook.svg').default} alt="" />
            </a>
            <a href="https://github.com/w-udhav" target="_blank" rel='noreferrer'>
              <img className='w-6 bg-white rounded-full' src={require('../assets/social apps/Github.svg').default} alt="" />
            </a>
          </div>
        </div>

        {/* Div 3 */}
        <div>
          <p className='text-center md:text-right md:px-6'> @w_udhav </p>
        </div>
      </div>
    </div>
  )
}

export default Footer