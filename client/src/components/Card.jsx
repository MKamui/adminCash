import React, { useEffect, useState} from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { UserAuth } from '../context/AuthContext'
import { getOperations, getOperation, restartUser, deleteOperation, getFilteredType, getFilteredCategory, sumTotal } from '../reducer/actions/actions.js'
import NavBar from './NavBar';

const Card = () => {
  const {user, logout} = UserAuth()
  const [showActivities, setShowActivities] = useState(false)
  let idUser = user?.uid;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const operations = useSelector(state => state.operations)
  const operationsTotal = useSelector(state => state.operationsTotal)

  useEffect(() => {
    if(idUser !== undefined)dispatch(getOperations(idUser))
  }, [showActivities])

  useEffect(() => {
    dispatch(sumTotal());
  }, [operations, operationsTotal, dispatch]);

  const handleLogout = async () => {
    try {
        await logout()
        navigate('/')
        dispatch(restartUser())
        Swal.fire({
        icon: 'success',
        title: 'You logout',
        showConfirmButton: false,
        timer: 3000
        })
    } catch (e) {
        console.log(e.message)
    }
}

  return (
    <>
    <NavBar/>
    <div className="pt-28 text-blue-500">
      <div className="container mx-auto max-w-2xl md:w-3/4">
        <div className="rounded-t-lg border-2 border-sky-600 p-4">
          <div className="mx-auto max-w-sm md:mx-0 md:w-full">
            <div className="inline-flex space-x-8 items-center">
              <h1 className="text-white text-2xl">{user?.email}</h1>
              <Link to="/activity"><button className='py-2 px-5'>+Activity</button></Link>
              <button onClick={handleLogout} className='bg-red-600 border-red-600 hover:text-red-700 py-2 px-5'>Logout</button>
            </div>
          </div>
        </div>
        <div className="space-y-3 border border-sky-600">
          <div className='flex justify-between mx-4 mt-3 mb-6'>
            <button onClick={() => dispatch(getFilteredType('Income'))}>Filter INCOME</button>
            <button onClick={() => dispatch(getFilteredType('Expense'))}>Filter EXPENSE</button>
            <select name="category" onClick={(e) => { dispatch(getFilteredCategory(e.target.value))}} className='rounded-md text-black'>
                <option value="">--Filter CATEGORY--</option>
                <option value="Documentation">Documentation</option>
                <option value="Food">Food</option>
                <option value="Job">Job</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
            </select>
          </div>
          <h2 className='text-center font-bold text-lg text-white'>Financial History</h2>
          {showActivities ?
          <>
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left uppercase border-b border-sky-600">
                <th className="px-4 py-3">concept</th>
                <th className="px-4 py-3">amount</th>
                <th className="px-4 py-3">date</th>
                <th className="px-4 py-3">category</th>
                <th className="px-4 py-3">type</th>
                <th className="px-4 py-3">edit</th>
                <th className="px-4 py-3">delete</th>
              </tr>
            </thead>
        <tbody className="divide-y divide-sky-600 border-b border-sky-600">
        {operations.length > 0 && operations.map(op =>
        <>
          <tr className="text-white">
            <td className="px-4 py-3 text-sm">{op.concept}</td>
            <td className="px-4 py-3 text-sm">${op.amount}</td>
            <td className="px-4 py-3 text-sm">{op.date}</td>
            <td className="px-4 py-3 text-sm">{op.category}</td>
            <td className="px-4 py-3 text-sm">{op.type}</td>
            <Link to="/edit" ><td className="px-4 py-3 text-lg cursor-pointer hover:text-blue-500"><button onClick={() => {dispatch(getOperation(op.id))}}><MdEdit/></button></td></Link>
            <td className="px-4 py-3 text-lg"><button className='bg-red-600 border-red-600 hover:text-red-700' onClick={() => {
              dispatch(deleteOperation(op.id))
              window.location.reload()}}><MdDelete/></button></td>
          </tr>
          </>
          )}
        </tbody>
      </table>
      <div className='px-4 py-3 font-semibold flex'>
      <p>Total:</p>
      <p className='ml-4 text-white'>{operationsTotal != 0 ? "$" + operationsTotal : "No activities"}</p>
      </div>
      </>
      : (user?.email) && <button onClick={() => setShowActivities(true)} className='ml-[40%] px-3 py-3'>Show Activities</button> 
      }
          <hr className='border border-sky-600'/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Card