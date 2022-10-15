import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import {  editOperation } from '../reducer/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2";

const Edit = () => {
  const {user} = UserAuth()
  const navigate = useNavigate()
  let idUser = user?.uid;

  const operationEdited = useSelector(state => state.operation)
  const [operation, setOperation] = useState({
    concept: '',
    amount: '',
    date: '',
    type: '',
    category: '',
    idUser: ''
  })
  

useEffect(() => {
  setOperation(params => ({
    ...params,
    concept: operationEdited?.concept,
    amount: operationEdited?.amount,
    date: operationEdited?.date,
    category: operationEdited?.category,
    type: operationEdited?.type
  }));
}, [operationEdited])

  const dispatch = useDispatch()
  useEffect(() => {
    setOperation({ ...operation, idUser: idUser });
  }, [user])
  
  const handleChanges = (e) => {
      setOperation({ ...operation, [e.target.name]: e.target.value });
    }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editOperation(operationEdited.id,operation))
    Swal.fire({
      icon: 'success',
      title: 'Activity edited!',
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
            <input name='concept' className='p-3 rounded-md text-black' type="text" value={operation.concept} required onChange={handleChanges} />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Amount:</label>
            <input name='amount' className='p-3 rounded-md text-black'  type="number" value={operation.amount} required onChange={handleChanges}/>
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Date:</label>
            <input name='date' className='p-3 rounded-md text-black' type="date" value={operation.date} required onChange={handleChanges} />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Category:</label>
            <select name="category" className='p-3 rounded-md text-black' value={operation.category} required onChange={handleChanges}>
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
            <select disabled name="type" className='p-3 rounded-md text-black mb-4'  required onChange={handleChanges} value={operationEdited?.type} >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <button className='w-full py-4 my-2'>Edit Activity</button>
          <Link to='/card'><button className='w-full py-4 my-2' >Back Home</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Edit