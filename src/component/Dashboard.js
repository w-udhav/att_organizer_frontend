import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import AddSubject from './AddSubject';
import Subject from './Subject';
import { auth, getCollections } from '../Firebase';
import { CredentialContext } from './contexts/CredentialContext';


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([])

  const { currentUser } = useContext(CredentialContext)

  useEffect(() => {
    handleData();
  }, [currentUser, data])

  const handleData = async () => {
    if (currentUser[0] !== undefined) {
      const dataSet = await getCollections(currentUser[0])
      setData(dataSet)
    }
  }

  const handleUpdate = () => {
    setData([])
  }


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <div className=''>

      {/* head */}
      <div className='flex flex-row justify-between items-center py-3 md:px-8 px-4 shadow-md'>
        <div className='text-xl ' style={{ fontFamily: 'Barlow' }}>
          {currentUser === '' ? "Not logged in" : currentUser[1]}
        </div>
        <div className=''>
          {
            currentUser[0] === undefined ?
              null
              :
              <button
                onClick={() => handleShow()}
                className='bg-blue-400 px-6 py-1 rounded-md text-white'
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
        {
          currentUser[0] !== undefined ?
            data ?
              data.map((e, index) => {
                return (
                  <div className='w-[100%]' key={index} >
                    <Subject data_model={e} handleUpdate={handleUpdate} index={index} />
                  </div>
                )
              })
              :
              <div className='text-2xl' >
                No data
              </div>
            :
            <div className='text-2xl' >
              Sign in first!
            </div>
        }
      </div>

      {/* <button
        onClick={() => handleData()}
        className='bg-blue-500 px-8 py-1 rounded-md'
      >
        test here
      </button> */}
    </div >
  )
}

export default Dashboard