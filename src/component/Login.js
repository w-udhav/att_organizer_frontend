import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import '../index.css'
import { CredentialContext } from './contexts/CredentialContext';

const Login = () => {
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState('');
  const [data, setData] = useState({
    email: '',
    pass: ''
  });
  const { currentUser } = useContext(CredentialContext);
  let navigate = useNavigate();


  const userHandler = (e) => {
    const { name, value } = e.target;
    setData(perState => ({ ...perState, [name]: value }))
  }

  function validate() {
    if (data.email === "") {
      setInputError('email')
      return false
    }
    if (data.pass === "") {
      setInputError('pass')
      return false
    }
    else {
      return true
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const validateRes = validate();
    try {
      if (validateRes === true) {
        setLoading(true)
        setInputError('');
        await signInWithEmailAndPassword(auth, data.email, data.pass)
          .then(() => {
            console.log('signed in')
            setLoading(false)
            navigate("/dashboard")
          })
          .catch((error) => {
            setLoading(false)
            console.log(error.message)
            if (error.message === 'Firebase: Error (auth/wrong-password).') {
              alert('Wrong Password')
            }
          })
      }
    } catch {
      console.log("error")
    }

  }
  return (
    <div className='w-full min-h-[92vh] relative'>
      <div className='flex flex-col md:flex-row items-center justify-evenly absolute alignY'>
        <div className='md:w-[50%] '>
          <form onSubmit={handleLogin} className='bg-white md:container md:mx-auto w-[100vw] md:w-[52%] py-8 px-6 rounded-md shadow-xl shadow-zinc-300'>
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
                  autoComplete='off'
                  name='email'
                  value={data.email}
                  onChange={userHandler}
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
                  value={data.pass}
                  onChange={userHandler}
                  name='pass'
                  className='bg-zinc-100 outline-none py-2 px-3 rounded-md shadow-inner border focus:border-blue-400'
                />
              </div>

            </div>
            <button
              disabled={currentUser !== ''}
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
        <div className='hidden md:block md:w-[50%]'>
          <img className='' src={require('../assets/login.jpg')} alt='logo' />
        </div>
      </div>
    </div>
  )
}

export default Login