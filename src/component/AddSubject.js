import React, { useContext, useEffect, useState } from 'react'
import { BiWindowClose } from 'react-icons/bi'
import { addDocument } from '../Firebase'
import { CredentialContext } from './contexts/CredentialContext';
import '../index.css'

const AddSubject = ({ handleClose }) => {
  const { currentUser } = useContext(CredentialContext)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    occurred: "",
    attended: "",
    min: "",
    achieved: "",
    date: ""
  })

  const date = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }

  const handleChange = (e) => {
    const value = e.target.value
    setData({
      ...data,
      [e.target.name]: value
    });
  }

  useEffect(() => {
    achievedStatus();
  }, [data.min, data.name, data.occurred, data.attended])


  function achievedStatus() {
    let x = parseFloat((data.attended / data.occurred) * 100).toFixed(2);
    let today = date()
    setData({
      ...data,
      achieved: x,
      date: today
    })
  }


  // Adding Document
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await addDocument(data, currentUser[0])
        .then(() => {
          const newVal = {
            name: "",
            occurred: "",
            attended: "",
            min: "",
            achieved: "",
            date: ""
          }
          setData(perState => ({
            ...perState,
            ...newVal
          }));
          setLoading(false);
          handleClose();
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='fixed top-0 left-0 bottom-0 bg-black bg-opacity-60 w-screen '>
      <div className='absolute top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]  items-center flex flex-col rounded-[10px] shadow-xl bg-blue-100 '>
        <div className='w-full flex flex-row items-center justify-between mb-7 rounded-t-[10px] pt-2 pb-1 px-2 border border-b-zinc-400'>
          <div className='text-3xl'>
            Enter details...
          </div>
          <div>
            <button
              onClick={() => handleClose()}
              className='text-red-700'
            >
              <BiWindowClose size={30} />
            </button>
          </div>
        </div>
        <form className='md:w-80 w-[95vw] flex flex-col space-y-6 mb-3 px-3' onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-1'>
            <input
              id='name'
              placeholder='Subject_name'
              name='name'
              value={data.name}
              onChange={handleChange}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-[10px] border-zinc-400 focus:border-blue-400 focus:bg-slate-200 transition-all duration-200 ease-in-out'
            />
          </div>



          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-x-3'>
            <label htmlFor='occurred'> Classes Occurred: </label>
            <input
              type='number'
              id='occurred'
              name='occurred'
              placeholder='Total'
              onChange={handleChange}
              value={data.occurred}
              className='bg-zinc-100 md:w-32 border outline-none py-2 px-3 shadow-inner rounded-[10px] border-zinc-400 focus:border-blue-400 focus:bg-slate-200 transition-all duration-200 ease-in-out'
            />
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0'>
            <label htmlFor='attended'> Classes Attended: </label>
            <input
              type='number'
              id='attended'
              name='attended'
              placeholder='Attended'
              value={data.attended}
              onChange={handleChange}
              className='bg-zinc-100 md:w-32 border outline-none py-2 px-3 shadow-inner rounded-[10px] border-zinc-400 focus:border-blue-400 focus:bg-slate-200 transition-all duration-200 ease-in-out'
            />
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0'>
            <label htmlFor='min'> Min Attendance: </label>
            <input
              type='number'
              id='min'
              name='min'
              placeholder='Set required Percentage'
              onChange={handleChange}
              value={data.min}
              className='bg-zinc-100 md:w-32 border outline-none py-2 px-3 shadow-inner rounded-[10px] border-zinc-400 focus:border-blue-400 focus:bg-slate-200 transition-all duration-200 ease-in-out'
            />
          </div>
          <div className='mt-7 mb-2 flex flex-row justify-center items-center space-x-6'>
            <button
              disabled={loading}
              className='bg-green-500 text-black text-3 px-6 py-2 rounded-sm shadow-xl outline-none transition-all ease-in-out hover:bg-green-500'
            >
              {
                loading ?
                  <svg role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  :
                  "Confirm"
              }
            </button>
            <button
              onClick={handleClose}
              disabled={loading}
              className='bg-red-500 text-black rounded-sm shadow-xl text-3 px-6 py-2 outline-none'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSubject