import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2";
import GoogleButton from 'react-google-button'

const SignIn = () => {
  const [userAccount, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const {signIn} = UserAuth()
  const {googleSignIn} = UserAuth()
  const { user } = UserAuth()
  const handleChanges = (e) => {
    setUser({ ...userAccount, [e.target.name]: e.target.value });
  }

  const handleGoogleSignIn = async () => {
    try {
      await Swal.fire({
        icon: 'success',
        title: 'Welcome Google User!',
        showConfirmButton: false,
        timer: 2000
      })
      await googleSignIn()
      navigate('/card')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(user != null){
      navigate('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    await signIn(userAccount.email, userAccount.password)
    Swal.fire({
      icon: 'success',
      title: 'Welcome again!',
      showConfirmButton: false,
      timer: 2000
    })
    navigate('/card')
    } catch (error) {
      if (error.code === 'auth/user-not-found'){
        Swal.fire({
        icon: 'error',
        title: 'User not found',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/wrong-password'){
        Swal.fire({
        icon: 'error',
        title: 'Wrong Password',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/internal-error'){
        Swal.fire({
        icon: 'error',
        title: 'Fill the password',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/invalid-email'){
        Swal.fire({
        icon: 'error',
        title: 'Use a valid email',
        showConfirmButton: false,
        timer: 2000
        })}
      }
  }

  return (
    <div>
      <div className='max-w-[700px] mx-auto p-4'>
        <div className='text-center mt-8'>
          <h1 className='text-3xl font-bold py-2'>Sign in to your financial account</h1>
          <p className='py-2 text-xl'>Don't have an account yet? <Link to='/createaccount' className='underline hover:text-blue-700'>Create account.</Link></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address:</label>
            <input name='email' onChange={handleChanges} className='p-3 rounded-md text-black' type="email" />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password:</label>
            <input name='password' onChange={handleChanges} className='p-3 rounded-md text-black' type="password" />
          </div>
          <GoogleButton onClick={handleGoogleSignIn} className='mt-4 mb-2' type='light'/>
          <button className='w-full py-4 my-2'>Sign In</button>
          <Link to='/forget'><button className='w-full py-4 my-2'>Forget password?</button></Link>
        </form>
      </div>
    </div>
  )
}

export default SignIn