import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../Firebase'
import { CredentialContext } from './contexts/CredentialContext'

const Navbar = () => {
  const { currentUser } = useContext(CredentialContext)
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  async function handleLogOut() {
    setLoading(true);
    try {
      await logout();
      navigate('/')
      console.log('Logged out')
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  function handleToggle() {
    setShow(!show)
  }


  useEffect(() => { }, [currentUser])
  return (
    <div className='sticky top-0 border border-grey w-full bg-white z-30'>
      <div className='flex flex-row items-center justify-between py-3 md:px-16 px-3'>
        <div className='flex flex-row items-center space-x-3'>
          <img className='w-[35px]' src={require('../assets/logo.png')} alt="" />
          <div className='text-2xl'> PlayGround </div>
        </div>
        <div className='hidden md:flex md:flex-row flex-col justify-center items-center space-x-6 text-blue-900'>
          <div className='underline underline-offset-4'>
            <Link to='/'> Home </Link>
          </div>

          {
            currentUser !== '' ?
              ""
              :
              <div className='underline underline-offset-4 '>
                <Link to='/login'> Login </Link>
              </div>
          }

          {
            currentUser !== '' ?
              ""
              :
              <div className='underline underline-offset-4'>
                <Link to='/signup'> Sign up </Link>
              </div>
          }
          <div className='underline underline-offset-4'>
            <Link to='/dashboard'> Dashboard </Link>
          </div>
          {
            currentUser === '' ?
              ""
              :
              <div className='bg-red-600 text-white px-4 py-2 rounded-[10px] outline-none border-none'>
                <button
                  disabled={loading}
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </div>
          }
        </div>
        <div className='md:hidden block'
          onClick={() => setShow(true)}
        >
          <button
            className=''
          >
            <img className='w-[40px]' src={require('../assets/menu.png')} alt='hamburger icon' />
          </button>
        </div>
        <div onClick={() => setShow(false)} className={`md:hidden fixed top-0 left-0 w-[100%] h-screen  transition-opacity duration-700 bg-black shadow-xl ${show ? "bg-opacity-80" : "bg-opacity-20 left-[-100%]"}`}>
          <div className={`absolute w-[45%] h-screen bg-white transition-all ease-in-out duration-300   ${show ? "translate-x-0" : "translate-x-[-200px]"}`}>
            <div className='md:hidden flex flex-col text-[19px] space-y-2'>
              <div className=''>
                <Link to='/'> # Home </Link>
              </div>
              {
                currentUser === '' ?
                  ""
                  :
                  <div className=''>
                    <Link to='/login'> # Login </Link>
                  </div>
              }
              {
                currentUser === '' ?
                  ""
                  :
                  <div className=''>
                    <Link to='/signup'> # Sign up </Link>
                  </div>
              }
              <div className=''>
                <Link to='/dashboard'> # Dashboard </Link>
              </div>
              {
                currentUser !== '' &&
                <div className='py-8'>
                  <button
                    disabled={loading}
                    className='bg-red-600 text-white text-center px-4 py-2 rounded-[10px] outline-none border-none'
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar