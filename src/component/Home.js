import React from 'react'
import thinking from '../Lotties/thinking.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'

const Home = ({ user }) => {
  return (
    <div className=' flex flex-col items-center pb-10 md:pb-0 md:py-10 space-y-8'>
      <div className='flex flex-col md:flex-row items-center justify-evenly pt-6 md:pt-0 py-3 md:px-6 md:rounded-2xl shadow-md homeBg'>
        <div className='space-y-8  px-6 py-2'>
          <div className='space-y-3'>
            <p className='text-6xl font-bold text-yellow-500'>
              PlayGround
            </p>
            <p className='text-xl'>
              Tired of losing count of your attendance?
            </p>
          </div>
          <div className='text-3xl font-bold text-[#06283D]'>
            We Got it Covered!
          </div>
        </div>
        <div className='md:w-[30vw]'>
          <Lottie animationData={thinking} />
        </div>
      </div>

      <div className='bg-[#F3F3F3] w-full py-8 space-y-5 pb-12'>
        <div className='w-full flex flex-row items-center justify-center text-center'>
          <div className='text-2xl md:text-[25px]'>
            Choose your journey?
          </div>
          <div className=''>
            <img className='w-32' src={require('../assets/home2.gif')} alt="" />
          </div>
        </div>
        <div className='flex flex-col md:flex-row flex-wrap items-center justify-center md:space-x-8 md:space-y-0 space-y-5'>
          <div>
            <Link to='/login'>
              <button className="text-white w-52 transition-all ease-out justify-center outline-none border-none bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-600 font-medium rounded-xl text-[15px] px-6 py-4 text-center dark:bg-blue-500 dark:hover:bg-blue-600 inline-flex items-center" >
                Login
              </button>
            </Link>
          </div>
          <div>
            <Link to='/signup'>
              <button className="text-white w-52 transition-all ease-out justify-center outline-none border-none bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-600 font-medium rounded-xl text-[15px] px-6 py-4 text-center dark:bg-blue-500 dark:hover:bg-blue-600 inline-flex items-center" >
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home