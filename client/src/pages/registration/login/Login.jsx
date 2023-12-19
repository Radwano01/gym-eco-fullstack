import React, { useState } from 'react'
import "./login.scss"
import Navbar from '../../../components/navbar/Navbar'
import axios from "axios"
import { toast } from "react-toastify"
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [, setCookies] = useCookies([process.env.REACT_APP_ACCESS_COOKIES])
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
        email: email,
        password: password
      })

      if(response.data.token && response.data.id){
        setCookies(process.env.REACT_APP_ACCESS_COOKIES, response.data.token)
        window.localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_USER_ID, response.data.id)
        window.localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL, (response.data.email))
        window.localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_NAME, (response.data.name))
        navigate("/")
        toast.success("Login success")
      }else{
        toast.error("Something went wrong")
      }
      
    }catch(err){
      toast.error("Something went wrong")
    }
  }
  return (
    <div className='login'>
        <br /><br />
        <Navbar type={"slider-navbar"}/>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email" placeholder='Your Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder='Your Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
            <a href='/registration/register'>You don't have an account?</a>
            <a href="/forgotpassword">Forgot Your password?</a>
        </form>
        
    </div>
  )
}

export default Login