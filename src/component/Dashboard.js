import React, { useState } from 'react'
import '../index.css'
import AddSubject from './AddSubject';
import Subject from './Subject';



const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    subject: '',
    classAtt: '',
    classOcc: '',
    minAtt: ''
  })


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
      <div className='flex flex-col justify-between items-center py-3 px-16 space-y-8'>
        <div className='text-4xl' style={{ fontFamily: 'Bungee Spice' }}>
          Hey, User
        </div>
        <div className=''>
          <button
            onClick={() => handleShow()}
            className='flex flex-col space-y-1 items-center hover:scale-105 transition-all ease-in-out selection:bg-none outline-none border-none'
          >
            <img className='w-[50px]' src={require('../assets/plus.png')} alt="add" />
            <div className='text-green-500 font-semibold text-[18px] bg-green-100 rounded-xl py-1 px-3'> Add Subject </div>
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
      <div className='flex flex-col items-center justify-center space-y-8 border-t-2 border-grey py-6 bg-blue-100'>
        <div className='w-[100%]'>
          <Subject />
        </div>
        <div className='w-[100%]'>
          <Subject />
        </div>
      </div>
    </div >
  )
}

export default Dashboard