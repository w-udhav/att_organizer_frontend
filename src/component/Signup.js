import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import db, { auth } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { CredentialContext } from './contexts/CredentialContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);
  const [user1, setUser1] = useState({
    username: "",
    email: "",
    pass: "",
    cpass: "",
  })
  const [uid, setUID] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  // Destructuring
  const { user, setUser } = useContext(CredentialContext)
  const { username, email, pass, cpass } = user1;

  const sendData = async (e) => {
    await setDoc(doc(db, uid, 'userInfo'), {
      name: user1.username,
      email: user1.email,
    }).then(() => console.log('data sent'))
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
    const validateRes = validate();
    console.log(validateRes)
    console.log(inputError)
    if (validateRes === true) {
      setLoading(true)
      setInputError('');
      await createUserWithEmailAndPassword(auth, user1.email, user1.pass)
        .then((cred) => {
          const user = cred.user;
          setUID(user.uid);
          sendData();
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          setErrors('error')
          console.log(error.message)
          if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            alert('Email already in use')
            setErrors('Email already in use')
          }
        })
    }
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
              disabled={loading}
              className={`w-full text-[20px] mt-8 text-white py-2 px-6 rounded-md shadow-xl shadow-blue-100 ${loading ? "bg-slate-400 " : "bg-blue-500"}`}
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