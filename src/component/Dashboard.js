import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import AddSubject from './AddSubject';
import Subject from './Subject';
import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore'
import { auth } from '../Firebase';
import { CredentialContext } from './contexts/CredentialContext';
import { onAuthStateChanged } from 'firebase/auth';


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    subject: '',
    classAtt: '',
    classOcc: '',
    minAtt: '',
    achieved: ''
  })
  // const currentUserStatus = useAuth();
  const { currentUser, setCurrentUser } = useContext(CredentialContext)

  // const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user !== null) {
        setCurrentUser([user.uid, user.email]);
      } else {
        setCurrentUser('')
      }
    });
    return unsub;
  }, []);

  const handleTest = () => {
    console.log(currentUser.uid)
  }

  // Submitting Function
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.id]: value
    })
  }

  return (
    <div className=''>

      {/* head */}
      <div className='flex flex-row justify-between items-center py-3 px-8 shadow-md'>
        <div className='text-2xl ' style={{ fontFamily: 'Barlow' }}>
          {currentUser === '' ? "Not logged in" : currentUser[1]}
        </div>
        <div className=''>
          <button
            onClick={() => handleShow()}
            className='bg-blue-400 px-6 py-2 rounded-md text-white'
          >
            New
          </button>
        </div>

        {/* Pop up */}
        {
          show ?
            <AddSubject handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} state={state} />
            : (
              null
            )
        }

      </div>

      {/* Data */}
      <div className='flex flex-col items-center justify-center space-y-8 border-t-2 border-grey py-6'>
        {/* <div className='w-[100%]'>
          <Subject handleTest={handleTest} />
        </div> */}
        {
          currentUser !== '' ?
            (
              <div className='w-[100%]'>
                <Subject handleTest={handleTest} />
              </div>
            )
            :
            (
              <div className='text-2xl' >
                Sign in first!
              </div>
            )
        }
      </div>

      <button
        onClick={() => handleTest()}
        className='bg-blue-500 px-8 py-1 rounded-md'
      >
        test here
      </button>
    </div >
  )
}

export default Dashboard