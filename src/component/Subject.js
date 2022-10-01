import React from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const Subject = () => {
  const handleClick = () => {
    let res = getRandomInt(1, 10);
    console.log(res)
  }

  return (
    <div className='mx-2 md:mx-[20%] flex flex-col shadow-md rounded-sm bg-white'>
      <div className='bg-purple-700 rounded-[10px 10px 0 0] pt-16 pb-2'>
        <h1 className='text-white text-2xl px-3'> Artificial Intelligence </h1>
      </div>

      {/* Data div */}
      <div className='flex flex-row items-center justify-evenly md:px-8 px-5'>
        <div className='flex-1 py-3 '>
          <div className='flex flex-row'>
            <div className='flex-1'>
              <div>
                total
              </div>
              <div>
                attended
              </div>
              <div>
                required %
              </div>
              <div>
                achieved %
              </div>
            </div>
            <div className='md:flex-1'>
              <div>
                44
              </div>
              <div>
                30
              </div>
              <div>
                75%
              </div>
              <div>
                68%
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 text-center'>
          status
        </div>
      </div>

      {/* Buttons */}
      <div className='flex flex-row items-center md:justify-end justify-center space-x-3 md:px-2 py-1 border-t-zinc-300 border'>
        <div>
          <button
            onClick={() => handleClick()}
            className='flex flex-row items-center space-x-2 bg-green-200 rounded-md px-6 py-1'
          >
            <font> Total </font>
            <img className='w-[25px]' src={require('../assets/plus.png')} alt="add" />
          </button>
        </div>
        <div>
          <button
            className='flex flex-row items-center space-x-2 bg-green-200 rounded-md px-6 py-1'
          >
            <font> Attended </font>
            <img className='w-[25px]' src={require('../assets/plus.png')} alt="add" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Subject