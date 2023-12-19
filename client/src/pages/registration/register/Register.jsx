  import React, { useState } from 'react'
  import "./register.scss"
  import Navbar from '../../../components/navbar/Navbar'
  import axios from 'axios'
  import { toast } from 'react-toastify'

  const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
          name: name,
          email: email,
          password: password
        })
        if(response){
          toast.info("we have send verification link")
        }
      }catch{
        toast.error("email exists")
      }
    }
    return (
      <div className='register'>
          <br /><br />
          <Navbar type={"slider-navbar"}/>
          <form onSubmit={handleSubmit}>
              <h1>Register</h1>
              <input type="text" placeholder='Your Name' required value={name} onChange={(e)=> setName(e.target.value)}/>
              <input type="email" placeholder='Your Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder='Your Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <button type='submit'>Register</button><br />
              <a href='/registration/login'>You  have an account?</a>  
          </form>
      </div>
    )
  }

  export default Register