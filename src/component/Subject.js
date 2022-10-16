import React, { useEffect, useState } from 'react'
import '../index.css'

const Subject = (props) => {
  const [state, setState] = useState({
    total: '',
    attended: '',
    required: '',
    achieved: ''
  })
  const [status, setStatus] = useState(false);

  function achievedStatus() {
    let x = Math.floor((state.attended / state.total) * 100);
    setState({
      ...state,
      achieved: x
    })
    if (x >= 75) {
      console.log(x)
      setStatus(true);
    }
    else if (x < 75) {
      console.log(x)
      setStatus(false);
    }
    return status;

  }

  useEffect(() => {
    let res = achievedStatus();
    console.log(res)

  }, [status])


  const handleClick = () => {

  }

  return (
    <div className='mx-2 md:mx-[20%] flex flex-col shadow-md rounded-sm bg-white'>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[10px 10px 0 0] pt-16 pb-2 bgBack'>
        <h1 className='text-white text-2xl px-3 '> Artificial Intelligence </h1>
      </div>

      {/* Data div */}
      <div className='flex flex-row items-center justify-evenly md:px-8 px-5'>
        <div className='flex-1 py-3 '>
          <div className='flex flex-row'>
            <div className='flex-1'>
              <div>
                Total
              </div>
              <div>
                Attended
              </div>
              <div>
                Required %
              </div>
              <div>
                Achieved %
              </div>
            </div>
            {/* Data */}
            <div className='md:flex-1'>
              <div>
                {state.total}
              </div>
              <div>
                {state.attended}
              </div>
              <div>
                {state.required}%
              </div>
              <div>
                {state.achieved}%
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 text-center'>
          {
            status ?
              (
                <p className='text-green-600'> Hooray! you are ahead. </p>
              )
              :
              (
                <p className='text-red-600'> Ohh! You are running late. </p>
              )
          }
        </div>
      </div>

      {/* Buttons */}
      <div className='flex flex-row items-center md:justify-end justify-center space-x-3 md:px-2 py-1 border-t-zinc-300 border'>
        <div>
          <button
            onClick={() => handleClick()}
            className='bg-green-200 rounded-md px-6 py-1'
          >
            <font> Total </font>

          </button>
        </div>
        <div>
          <button
            onClick={() => props.handleTest()}
            className='bg-green-200 rounded-md px-6 py-1'
          >
            <font> Attended </font>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Subject