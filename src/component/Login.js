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
    setInputError('')
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
    <div className='w-full min-h-[92vh] relative pt-10'>
      <div className='flex flex-col md:flex-row items-center justify-evenly '>
        <div className='flex-1 '>
          <form onSubmit={handleLogin} className='bg-white md:container md:mx-auto w-[100vw] md:w-[52%] py-8 px-6 rounded-md shadow-xl shadow-zinc-300'>
            {/* <h1 className='text-3xl font-semibold text-center mt-3 mb-9'> Welcome Back! </h1> */}
            <img className='w-full mb-9' src={require('../assets/welcome.jpg')} alt="" />
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
                  className={`bg-zinc-100 border outline-none py-2 px-3 rounded-md shadow-inner focus:border-blue-400 ${inputError === 'email' ? "border-red-500" : ""}`}
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
                  className={`bg-zinc-100 outline-none py-2 px-3 rounded-md shadow-inner border focus:border-blue-400 ${inputError === 'pass' ? "border-red-500" : ""}`}
                />
              </div>

            </div>

            <button
              disabled={currentUser[0] !== undefined}
              className="text-white w-full mt-8 justify-center outline-none border-none bg-blue-500 shadow-blue-300 shadow-xl hover:bg-blue-600 font-medium rounded-xl text-[15px] px-6 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 inline-flex items-center"
            >
              {
                loading ?
                  <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  :
                  "Continue"
              }
            </button>
            <div className='mt-6 text-sm'>
              don't have an account?&nbsp;
              <span className='border border-transparent rounded-md px-3 py-1 transition-all  underline-offset-3 text-blue-500 hover:border-blue-300 hover:bg-blue-200'>
                <Link to='/signup'>Create new!</Link>
              </span>
            </div>
          </form>
        </div>
        <div className='hidden md:block flex-1 '>
          <img className='w-full' src={require('../assets/sign.jpg')} alt='logo' />
        </div>
      </div>
    </div>
  )
}

export default Login