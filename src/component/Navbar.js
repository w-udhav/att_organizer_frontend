import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='sticky top-0 border border-grey w-full bg-white '>
      <div className='flex flex-row items-center justify-between py-3 md:px-16 px-3'>
        <div className='flex flex-row items-center space-x-3'>
          <img className='w-[35px]' src={require('../assets/logo.png')} alt="" />
          <div className='text-2xl'> PlayGround </div>
        </div>
        <div className='flex md:flex-row flex-col justify-center items-center space-x-6 text-blue-900'>
          <div className='underline underline-offset-4'>
            <Link to='/'> Home </Link>
          </div>
          <div className='underline underline-offset-4 '>
            <Link to='/login'> Login </Link>
          </div>
          <div className='underline underline-offset-4'>
            <Link to='/signup'> Sign up </Link>
          </div>
          <div className='underline underline-offset-4'>
            <Link to='/dashboard'> Dashboard </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar