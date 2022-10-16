import React from 'react'
import { BiWindowClose } from 'react-icons/bi'
import '../index.css'

const AddSubject = ({ handleClose, state, handleChange, handleSubmit }) => {
  return (
    <div className='absolute top-0 left-0 bottom-0 bg-black bg-opacity-60 w-screen pt-[10%]'>
      <div className='container m-auto items-center flex flex-col rounded-lg shadow-xl w-[max-content] bg-white py-6 px-5 '>
        <div className='w-full flex flex-row items-center justify-between mt-2 mb-7'>
          <div className='text-3xl' style={{ fontFamily: 'Bungee Spice' }}>
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
        <form className='w-full flex flex-col space-y-6' onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-1'>
            <input
              id='subject'
              placeholder='Subject Name'
              name='subject'
              value={state.subject}
              onChange={handleChange}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-[4px] focus:border-blue-400 customInput'
            />
          </div>



          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-x-3'>
            <label htmlFor='subject'> Total classes Occurred: </label>
            <input
              type='number'
              id='classOcc'
              placeholder='No.of classes occurred?'
              onChange={handleChange}
              value={state.classOcc}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-[4px] focus:border-blue-400 '
            />
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0'>
            <label htmlFor='classAtt'> Classes Attended: </label>
            <input
              type='number'
              id='classAtt'
              placeholder='No. of classes attended?'
              value={state.classAtt}
              onChange={handleChange}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-[4px] focus:border-blue-400 '
            />
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0'>
            <label htmlFor='minAtt'> Minimum Attendance: </label>
            <input
              type='number'
              id='minAtt'
              placeholder='Set required Percentage'
              onChange={handleChange}
              value={state.minAtt}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-[4px] focus:border-blue-400 '
            />
          </div>
          <div className='mt-7 mb-2'>
            <button
              onClick={() => { console.log(state) }}
              className='bg-blue-500 text-white text-[18px] px-6 py-1 rounded-[4px] outline-none'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSubject