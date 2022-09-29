import React from 'react'
import { BiWindowClose } from 'react-icons/bi'

const AddSubject = ({ handleClose, state, handleChange }) => {
  return (
    <div className='absolute -top-9 bottom-0 bg-black bg-opacity-20 w-screen py-8 pt-20'>
      <div className='container m-auto items-center flex flex-col rounded-xl shadow-xl w-[max-content] bg-white py-6 px-5'>
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
        <div className='flex flex-col space-y-3'>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='subject'> Subject Name: </label>
            <input
              id='subject'
              placeholder='Name'
              name='subject'
              value={state.subject}
              onChange={handleChange}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
            />
          </div>
          <div className='flex md:flex-row flex-col md:space-x-3 space-y-4 md:space-y-0'>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='classAtt'> Classes Attended: </label>
              <input
                type='number'
                id='classAtt'
                placeholder='No. of classes attended?'
                value={state.classAtt}
                onChange={handleChange}
                className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='classOcc'> Classes Occurred: </label>
              <input
                type='number'
                id='classOcc'
                placeholder='No.of classes occurred?'
                onChange={handleChange}
                value={state.classOcc}
                className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
              />
            </div>
          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor='minAtt'> Minimum Attendance: </label>
            <input
              type='number'
              id='minAtt'
              placeholder='Set required Percentage'
              onChange={handleChange}
              value={state.minAtt}
              className='bg-zinc-100 border outline-none py-2 px-3 shadow-inner rounded-xl focus:border-blue-400 '
            />
          </div>
        </div>
        <div className='mt-7 mb-2'>
          <button
            onClick={() => { console.log(state) }}
            className='bg-blue-500 text-white text-[18px] px-6 py-1 rounded-xl outline-none'
          >
            Add 👍
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSubject