import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const EditableBox = ({ value, handleUpdate, name }) => {
  return (
    <div className='text-center flex flex-row items-center justify-center rounded-[4px] my-[1px]' >
      {/* <button className='w-[30px] h-[30px] rounded-sm text-[13px] '>
        <div className='ml-[50%] mt-[50%] translate-x-[-40%] translate-y-[-50%]'>
          <AiOutlineMinus />
        </div>
      </button> */}
      <div>
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleUpdate}
          className='w-10  text-center border border-black rounded-[4px] outline-none'
        />
      </div>
      {/* <button className='w-[30px] h-[30px] rounded-sm text-[13px] '>
        <div className='ml-[50%] mt-[50%] translate-x-[-40%] translate-y-[-50%]'>
          <AiOutlinePlus />
        </div>
      </button> */}
    </div>
  )
}

export default EditableBox