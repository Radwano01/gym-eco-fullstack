import React, { useState } from 'react'
import "./changestatus.scss"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-toastify"
import {BsFillTrashFill} from "react-icons/bs"

const ChangeStatus = ({code}) => {

  const [status, setStatus] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  const updateStatus = async()=>{
    try{
      if(status === ""){
        toast.error("fill the status")
        navigate("/admin/admin-orders")
      }else{
        await axios.put(`${process.env.REACT_APP_API}/api/orders/change-status/${id}`,
          {
            status:status
          }
        )
        navigate("/admin/admin-orders")
        toast.success('Status updated successfully');
      }

    }catch{
      toast.error("something went wrong")
    }
  }
  const deleteOrder = async()=>{
    try{
      await axios.post(`${process.env.REACT_APP_API}/api/orders/delete-order/${id}`,{
        code:code
      })
      navigate("/admin/admin-orders")
      toast.success("order deleted successfully")
    }catch{
      toast.error("delete unsuccessful")
    }
  }
  return (
    <div className='status'>
        <div className="status-container">
          <select value={status} onChange={(e)=> setStatus(e.target.value)}>
            <option value="" disabled>Select Status</option>
            <option value="Checking">Checking</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <div className="buttons">
            <button onClick={updateStatus} className='change-button'>Change Status</button>
            <button onClick={deleteOrder} className='delete-button'><BsFillTrashFill color='red' size={18}/></button>
          </div>
        </div>
    </div>
  )
}

export default ChangeStatus