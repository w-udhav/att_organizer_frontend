import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { addDocument, deleteDocument } from '../Firebase'
import '../index.css'
import { CredentialContext } from './contexts/CredentialContext'
import EditableBox from './EditableBox'

const Subject = (props) => {
  const { currentUser } = useContext(CredentialContext)
  const data = props.data_model
  const [state, setState] = useState({
    name: data.Name,
    occurred: data.occurred,
    attended: data.attended,
    min: data.min,
    achieved: data.achieved,
    date: data.date
  })
  const [status, setStatus] = useState(false);
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const imgClass = ["bgBack1", "bgBack2", "bgBack3", "bgBack4", "bgBack5", "bgBack6", "bgBack7"]

  useEffect(() => {
    if (state.achieved >= state.min) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [state.achieved, state.min])

  useEffect(() => {
    achievedStatus()
  }, [state.occurred, state.attended])


  function achievedStatus() {
    let x = parseFloat((state.attended / state.occurred) * 100).toFixed(2);
    let today = date()
    setState({
      ...state,
      achieved: x,
      date: today
    })
  }

  const handleUpdate = (e) => {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const date = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }


  const handleEdit = () => {
    setEdit(true)
    achievedStatus();
    console.log(data.date)
  }
  const handleConfirm = async () => {
    const confirm = window.confirm(
      "Are you sure to continue?"
    )
    if (confirm === true) {
      setEdit(false);
      setLoading(true);
      await addDocument(state, currentUser[0])
        .then(() => {
          setLoading(false);
          props.handleUpdate()
        })

    }
  }

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Do you want to cancel? All changes will be reversed!"
    )
    if (confirmCancel === true) {
      setState({
        name: data.Name,
        occurred: data.occurred,
        attended: data.attended,
        min: data.min,
        achieved: data.achieved,
        date: data.date
      })
    }
    setEdit(false);
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This subject's data will deleted permanently!"
    )
    if (confirmDelete === true) {
      try {
        setEdit(false)
        setLoading(true)
        await deleteDocument(state, currentUser[0])
          .then(() => {
            setLoading(false)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }


  return (
    <div className='mx-2 md:mx-[20%] flex flex-col shadow-md rounded-sm bg-white'>
      <div className={`flex flex-row px-3 justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[10px 10px 0 0] pt-16 md:pt-[10%] pb-2 ${imgClass[props.index]}`}>
        <h1 className='text-white text-2xl'> {state.name} </h1>
        <h3 className='text-white text-sm'> {data.date} </h3>
      </div>

      {/* Data div */}
      <div className='flex flex-row items-center justify-evenly md:px-8 px-5'>
        <div className='flex-1 py-3 '>
          <div className='flex flex-row items-center'>
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
            <div className="md:flex-1 flex flex-col justify-start items-center">
              {
                edit ?
                  <EditableBox value={state.occurred} name='occurred' handleUpdate={handleUpdate} />
                  :
                  <div>
                    {state.occurred}
                  </div>
              }
              {
                edit ?
                  <EditableBox value={state.attended} name='attended' handleUpdate={handleUpdate} />
                  :
                  <div>
                    {state.attended}
                  </div>
              }
              {
                edit ?
                  <EditableBox value={state.min} name='min' handleUpdate={handleUpdate} />
                  :
                  <div>
                    {state.min}
                  </div>
              }
              <div className={`font-bold ${status ? "text-green-600" : "text-red-600"}`}>
                {state.achieved}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 text-center'>
          {
            status ?
              (<p className='text-green-600'> Hooray! you are ahead. </p>)
              :
              (<p className='text-red-600'> Ohh! You are running late. </p>)
          }
        </div>
      </div>

      {/* Buttons */}
      <div className='flex flex-row items-center justify-between space-x-4 px-3 md:px-6 pt-2 pb-1 border-t-zinc-300 border'>
        {/* Edit */}
        {
          !edit ?
            <div className=''>
              <button
                onClick={() => handleEdit()}
              >
                <img className='w-6 ' src={require('../assets/edit.png')} alt='edit icon' />
              </button>
            </div>
            :
            <div className=''>
              <button
                onClick={() => handleCancel()}
              >
                <img className='w-6 ' src={require('../assets/remove.png')} alt='remove icon' />
              </button>
            </div>
        }

        {
          !edit ?
            // Delete
            < div className=''>
              <button
                disabled={loading}
                onClick={() => handleDelete()}
              >
                {
                  loading ?
                    <img className='w-8 ' src={require('../assets/trash.gif')} alt='trash icon' />
                    :
                    <img className='w-8 ' src={require('../assets/trash.png')} alt='trash icon' />
                }
              </button>
            </div>
            :
            // Confirm
            <div className='mb-1'>
              <button
                disabled={loading}
                onClick={() => handleConfirm()}
              >
                {
                  loading ?
                    <p className='py-2 px-3 bg-blue-500 rounded-lg text-white text-sm'> Loading... </p>
                    :
                    <p className='py-2 px-3 bg-green-600 rounded-lg text-white text-sm'> Confirm </p>
                }
              </button>
            </div>
        }

      </div>
    </div>
  )
}

export default Subject