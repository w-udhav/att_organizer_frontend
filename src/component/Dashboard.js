import React, { useState } from 'react'
import '../index.css'
import AddSubject from './AddSubject';
import Subject from './Subject';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase';


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    subject: '',
    classAtt: '',
    classOcc: '',
    minAtt: '',
    achieved: ''
  })

  const handleTest = async () => {
    const docRef = doc(db);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document Data ", docSnap.data())
    } else {
      console.log("No such Document")
    }
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
        <div className='text-2xl' style={{ fontFamily: 'Barlow' }}>
          user
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
            <AddSubject handleClose={handleClose} handleChange={handleChange} state={state} />
            : (
              null
            )
        }

      </div>

      {/* Data */}
      <div className='flex flex-col items-center justify-center space-y-8 border-t-2 border-grey py-6'>
        <div className='w-[100%]'>
          <Subject handleTest={handleTest} />
        </div>
      </div>
    </div >
  )
}

export default Dashboard