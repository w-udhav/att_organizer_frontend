import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import db, { auth } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { CredentialContext } from './contexts/CredentialContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  // Assignment
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);
  const [user1, setUser1] = useState({
    username: "",
    email: "",
    pass: "",
    cpass: "",
  })
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");
  let naviagate = useNavigate();

  // Destructuring
  const { currentUser, setCurrentUser } = useContext(CredentialContext);
  const { username, email, pass, cpass } = user1;



  const sendData = async (e) => {
    await setDoc(doc(db, e, 'userInfo'), {
      name: username,
      email: email,
    }).then(() => {
      setSuccess(true);
      console.log('data sent')
      const newVal = { username: '', email: '', pass: '', cpass: '' };
      setUser1(perState => ({
        ...perState,
        ...newVal
      }))
      naviagate('/dashboard');
    })
  }

  function validate() {
    if (username === "") {
      setInputError('username')
      return false
    }
    if (email === "") {
      setInputError('email')
      return false
    }
    if (pass === "") {
      setInputError('pass')
      return false
    }
    if (cpass === "") {
      setInputError('cpass')
      return false
    }
    if (pass !== cpass) {
      setInputError("!match")
      return false
    }
    else {
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validateRes = validate();
    console.log(validateRes)

    if (validateRes === true) {
      setLoading(true)
      setInputError('');
      await createUserWithEmailAndPassword(auth, email, pass)
        .then((cred) => {
          const uid = cred.user.uid;
          sendData(uid);
        })
        .catch((error) => {
          if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            setErrors('Email already in use')
            alert('Email already in use')
          } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            setErrors('Weak Password!')
          } else {
            setErrors('Error!')
          }
        })
    }
    setLoading(false);
  }


  const userHandler = (e) => {
    const { name, value } = e.target
    setUser1((perState) => ({ ...perState, [name]: value }))
  }


  return (
    <div className='w-full'>
      <div className='text-center text-2xl text-red-600'>
        {errors}
      </div>
      <div className='flex flex-col md:flex-row items-center justify-evenly my-14'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='bg-white container mx-auto w-[95vw] md:w-[52%] py-8 px-6 rounded-md shadow-xl shadow-blue-100' >
            <h1 className='text-3xl font-semibold text-center mt-3 mb-9'> Create an account </h1>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='username'>
                  Name:
                </label>
                <input
                  type="text"
                  id='username'
                  name='username'
                  value={username}
                  onChange={(e) => userHandler(e)}
                  className={`bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-md focus:border-blue-400 ${inputError === 'username' ? "border-red-500" : ""}`}
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='email'>
                  Email:
                </label>
                <input
                  type="email"
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => userHandler(e)}
                  className={`bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-md focus:border-blue-400  ${inputError === "email" ? "border-red-500" : ""}`}
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='password'>
                  Password:
                </label>
                <input
                  type="password"
                  id='pass'
                  name='pass'
                  value={pass}
                  onChange={(e) => userHandler(e)}
                  className={`bg-zinc-100 outline-none py-2 px-3 rounded-md shadow-inner border focus:border-blue-400 ${inputError === "pass" ? "border-red-500" : ""}`}
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor='conPass'>
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id='cpass'
                  name='cpass'
                  value={cpass}
                  onChange={(e) => userHandler(e)}
                  className={`bg-zinc-100 outline-none py-2 px-3 rounded-md shadow-inner border focus:border-blue-400 ${inputError === "cpass" ? "border-red-500" : ""}`}
                />
              </div>
            </div>
            {
              inputError === "!match" ?
                <div className='text-center pt-2 text-red-500'>
                  Password does not match!
                </div>
                :
                null
            }
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
                  "Submit"
              }
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