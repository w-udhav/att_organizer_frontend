import React from 'react'
import Lottie from 'lottie-react'
import construction from '../Lotties/construction.json'

const Home = () => {
  return (
    <div className='bg-[#F3E6DD] flex flex-col md:flex-row items-center py-10'>
      <div className='flex-1 flex flex-col items-center'>
        <div className='md:text-7xl text-3xl' style={{ fontFamily: 'Bungee Inline' }}>
          Welcome Aboard!
        </div>
        <div className=''>
          Site is currently underconstruction...
        </div>
        <div className='md:w-[36%] w-full'>
          <Lottie animationData={construction} />
        </div>
      </div>
      {/* <div className='flex-1'>
        <img className='' src={require('../assets/home.jpg')} alt="home" />
      </div> */}
    </div>
  )
}

export default Home