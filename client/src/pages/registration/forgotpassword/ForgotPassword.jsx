import React, { useState } from 'react'
import "./forgotpassword.scss"
import Navbar from '../../../components/navbar/Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/forgot-password`, {
        email: email,
      })
      if(response){
        toast.info("we have send reset password link")
      }
    }catch{
      toast.error("Something went wrong")
    }
  }
  return (
    <div className='forgotpassword'>
        <br /><br />
        <Navbar type={"slider-navbar"}/>
        <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <input type="email" placeholder='Your Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <button type='submit'>Forgot Password</button><br />
        </form>
    </div>
  )
}

export default ForgotPassword