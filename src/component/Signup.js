import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <div className='flex flex-col md:flex-row items-center justify-evenly my-14'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='bg-white container mx-auto w-full md:w-[45%] py-8 px-6 rounded-xl shadow-xl shadow-blue-100'>
            <h1 className='text-3xl font-semibold text-center mt-3 mb-9'> Create an account </h1>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='username'>
                  Name:
                </label>
                <input
                  type="text"
                  id='username'
                  className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='email'>
                  Email:
                </label>
                <input
                  type="email"
                  id='email'
                  className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='password'>
                  Password:
                </label>
                <input
                  type="password"
                  id='password'
                  className='bg-zinc-100 outline-none py-2 px-3 rounded-xl shadow-inner border focus:border-blue-400'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='conPass'>
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id='conPass'
                  className='bg-zinc-100 outline-none py-2 px-3 rounded-xl shadow-inner border focus:border-blue-400'
                />
              </div>
            </div>
            <button
              className='w-full text-[20px] mt-8 bg-blue-500 text-white py-2 px-6 rounded-xl shadow-xl shadow-blue-100'
            >
              Submit
            </button>
            <div className='mt-6'>
              already have an account?&nbsp;
              <span className='underline text-blue-500 hover:font-bold'>
                <Link to='/login'>Sign In </Link>
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

export default Signup