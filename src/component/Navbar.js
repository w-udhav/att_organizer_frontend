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
      let confirm = window.confirm('Wanna log out?');
      if (confirm) {
        await logout();
        navigate('/')
        console.log('Logged out')
      }
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }


  useEffect(() => { }, [currentUser])
  return (
    <div className='sticky top-0 border border-grey w-full bg-white z-30'>
      <div className='flex flex-row items-center justify-between py-3 md:px-16 px-3'>
        <div className='flex flex-row items-center space-x-3'>
          <img className='w-[35px]' src={require('../assets/logo.png')} alt="" />
          <div className='text-2xl'> PlayGround </div>
        </div>
        <div className='hidden md:flex md:flex-row flex-col justify-evenly items-center space-x-6 text-blue-900'>
          <div className=''>
            <Link to='/' className='flex flex-col items-center '>
              <div className='p-1 rounded-full bg-yellow-300'>
                <img className='w-[20px]' src={require('../assets/home.png')} alt="home logo" />
              </div>
              <p> Home </p>
            </Link>
          </div>

          {
            currentUser[0] !== undefined ?
              ""
              :
              <div>
                <Link to='/login' className='flex flex-col items-center'>
                  <div className='p-1 rounded-full bg-yellow-300'>
                    <img className='w-[20px]' src={require('../assets/login.png')} alt="login logo" />
                  </div>
                  <p> Login </p>
                </Link>
              </div>
          }

          {
            currentUser[0] !== undefined ?
              ""
              :
              <div>
                <Link to='/signup' className='flex flex-col items-center'>
                  <div className='rounded-full bg-yellow-300'>
                    <img className='w-[28px] ' src={require('../assets/signup.png')} alt="signup logo" />
                  </div>
                  <p> Sign up </p>
                </Link>
              </div>
          }
          <div>
            <Link to='/dashboard' className='flex flex-col items-center'>
              <div className='p-1'>
                <img className='w-[20px]' src={require('../assets/dashboard.png')} alt="signup logo" />
              </div>
              <p> Dashboard </p>
            </Link>
          </div>
          {
            currentUser[0] !== undefined ?
              <div className={`bg-red-600 text-white px-4 py-2 rounded-[10px] outline-none border-none ${loading ? "" : ""}`}>
                <button
                  disabled={loading}
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </div>
              :
              ""
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
        <div onClick={() => setShow(false)} className={`md:hidden fixed top-0 left-0 w-[100%] h-screen  transition-all duration-700 bg-black shadow-xl ${show ? "bg-opacity-80" : "bg-opacity-20 w-[0%]"}`}>
          <div className={`absolute w-[50%] h-screen bg-white transition-all ease-in-out duration-300   ${show ? "translate-x-0" : "translate-x-[-200px]"}`}>
            <div className='md:hidden flex flex-col text-[19px] space-y-4 px-3 py-8'>
              <div className=''>
                <Link to='/' className='flex flex-row items-center space-x-3'>
                  <div className='p-1 rounded-full bg-yellow-300'>
                    <img className='w-[20px]' src={require('../assets/home.png')} alt="home logo" />
                  </div>
                  <p> Home </p>
                </Link>
              </div>
              {
                currentUser[0] !== undefined ?
                  ""
                  :
                  <div>
                    <Link to='/login' className='flex flex-row items-center space-x-3'>
                      <div className='p-1 rounded-full bg-yellow-300'>
                        <img className='w-[20px]' src={require('../assets/login.png')} alt="login logo" />
                      </div>
                      <p> Login </p>
                    </Link>
                  </div>
              }
              {
                currentUser[0] !== undefined ?
                  ""
                  :
                  <div>
                    <Link to='/signup' className='flex flex-row items-center space-x-3'>
                      <div className='rounded-full bg-yellow-300'>
                        <img className='w-[28px] ' src={require('../assets/signup.png')} alt="signup logo" />
                      </div>
                      <p> Sign up </p>
                    </Link>
                  </div>
              }
              <div>
                <Link to='/dashboard' className='flex flex-row items-center space-x-3'>
                  <div className='p-1'>
                    <img className='w-[20px]' src={require('../assets/dashboard.png')} alt="signup logo" />
                  </div>
                  <p> Dashboard </p>
                </Link>
              </div>
              {
                currentUser[0] !== undefined &&
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