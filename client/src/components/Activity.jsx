import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { postOperation } from '../reducer/actions/actions'
import { useDispatch } from 'react-redux'
import Swal from "sweetalert2";

const Activity = () => {
  const {user} = UserAuth()
  const navigate = useNavigate()
  let idUser = user?.uid;
  const [operation, setOperation] = useState({
    concept: '',
    amount: '',
    date: '',
    type: '',
    category: '',
    idUser: ''
  })

  const dispatch = useDispatch()
  useEffect(() => {
    setOperation({ ...operation, idUser: idUser });
  }, [user])
  
  const handleChanges = (e) => {
      setOperation({ ...operation, [e.target.name]: e.target.value });
    }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postOperation(operation))
    Swal.fire({
      icon: 'success',
      title: 'Activity created!',
      showConfirmButton: false,
      timer: 2000
  })
  navigate('/card')
  }

  return (
    <div>
      <NavBar/>
      <div className='max-w-[700px] mx-auto p-4 pt-14'>
        <h1 className='text-2xl font-bold py-2 text-center'>New Financial Activity</h1>
        <form 
        onSubmit={(e) =>  handleSubmit(e)}
        >
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Concept:</label>
            <input name='concept' className='p-3 rounded-md text-black' type="text" required onChange={handleChanges} />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Amount:</label>
            <input name='amount' className='p-3 rounded-md text-black'  type="number" required onChange={handleChanges}/>
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Date:</label>
            <input name='date' className='p-3 rounded-md text-black' type="date"  required onChange={handleChanges} />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Category:</label>
            <select name="category" className='p-3 rounded-md text-black' required onChange={handleChanges}>
              <option value="">--Please choose an option--</option>
              <option value="Documentation">Documentation</option>
              <option value="Food">Food</option>
              <option value="Job">Job</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Type:</label>
            <select name="type" className='p-3 rounded-md text-black mb-4'  required onChange={handleChanges}>
              <option value="">--Please choose an option--</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <button className='w-full py-4 my-2'>Create Activity</button>
          <Link to='/card'><button className='w-full py-4 my-2'>Back Home</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Activity