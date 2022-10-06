import React from 'react'
import { Link } from 'react-router-dom';
import '../index.css'

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row items-center justify-evenly my-14'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='bg-white md:container md:mx-auto w-[95vw] md:w-[52%] py-8 px-6 rounded-md shadow-md shadow-blue-100'>
            <h1 className='text-3xl font-semibold text-center mt-3 mb-9'> Welcome Back! </h1>
            {/* <p className='text-xl text-zinc-500 font-thin mt-2 mb-6'> Please proceed. . . </p> */}
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='email'>
                  Email:
                </label>
                <input
                  type="email"
                  id='email'
                  className='bg-zinc-100 border outline-none py-2 px-3 rounded-md shadow-inner focus:border-blue-400 '
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='password'>
                  Password:
                </label>
                <input
                  type="password"
                  id='password'
                  className='bg-zinc-100 outline-none py-2 px-3 rounded-md shadow-inner border focus:border-blue-400'
                />
              </div>

            </div>
            <button
              className='w-full text-[20px] mt-8 bg-blue-500 text-white py-2 px-6 rounded-xl shadow-xl shadow-blue-100'
            >
              Continue
            </button>
            <div className='mt-6'>
              don't have an account?&nbsp;
              <span className='underline underline-offset-4 text-blue-500 hover:font-semibold'>
                <Link to='/signup'>Create Now!</Link>
              </span>
            </div>
          </form>
        </div>
        <div className='hidden md:block flex-1'>
          <img className='' src={require('../assets/login.jpg')} alt='logo' />
        </div>
      </div>
    </div>
  )
}

export default Login