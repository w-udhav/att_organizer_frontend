import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import AddSubject from './AddSubject';
import Subject from './Subject';
import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore'
import { getDatabase, auth, addDocument, getCollections } from '../Firebase';
import { CredentialContext } from './contexts/CredentialContext';
import { onAuthStateChanged } from 'firebase/auth';


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([])

  const { currentUser, setCurrentUser } = useContext(CredentialContext)

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

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const dataSet = await getCollections(currentUser[0])
    setData(dataSet)
  }



  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <div className=''>

      {/* head */}
      <div className='flex flex-row justify-between items-center py-3 px-8 shadow-md'>
        <div className='text-2xl ' style={{ fontFamily: 'Barlow' }}>
          {currentUser === '' ? "Not logged in" : currentUser[1]}
        </div>
        <div className=''>
          {
            currentUser[0] === undefined ?
              null
              :
              <button
                onClick={() => handleShow()}
                className='bg-blue-400 px-6 py-2 rounded-md text-white'
              >
                New
              </button>
          }
        </div>

        {/* Pop up */}
        {
          show ?
            <AddSubject handleClose={handleClose} />
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
          !currentUser[0] !== undefined ?
            (

              data &&
              data.map((e) => {
                console.log(e)
                return (
                  <div className='w-[100%]'>
                    <Subject data_model={e} />
                  </div>
                )
              })

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
        onClick={() => handleData()}
        className='bg-blue-500 px-8 py-1 rounded-md'
      >
        test here
      </button>
    </div >
  )
}

export default Dashboard