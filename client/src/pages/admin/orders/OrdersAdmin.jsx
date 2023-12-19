import React, { useEffect, useState } from 'react'
import "./ordersAdmin.scss"
import axios from "axios"
import {toast} from "react-toastify" 
import { useNavigate } from 'react-router-dom'
import Loading from "../../../assets/spinner.jpg";

const Orders = () => {

  const [Orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const  navigate = useNavigate()

  const getOrders = async()=>{
    try{
      const response =await axios.get(`${process.env.REACT_APP_API}/api/orders/get-orders`)
      const data = response.data[0]

      if(data){
        setOrders(data)
        setLoading(false)
      }
    }catch{
      toast.error("something went wrong")
    }
  }

  useEffect(()=>{
    getOrders()
  },[])

  const handleClick = (id) =>{
    navigate(`/admin/admin-orders/${id}`)
  }
  return (
    <div className='ordersAdmin'>
      <br />
      <div className="title"><h1>My Orders</h1></div>
      <div className="orders-container">
        <>
          <div className="table">
          {loading &&<img src={Loading} alt="loading"  style={{display:"flex", justifyContent:"center", alignItems:"center"}}/>}
            {Orders?.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Order Date</th>
                    <th>Order code</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders?.map((orders, index) => {
                    const {
                      p_id,
                      o_date,
                      o_name,
                      o_price,
                      o_status,
                    } = orders;
                    return (
                      <tr key={p_id} onClick={()=> handleClick(p_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {o_name} at {o_date}
                        </td>
                        <td>{p_id}</td>
                        <td>
                          {"$"}
                          {o_price}
                        </td>
                        <td>
                          <p
                            className={
                              o_status !== "Delivered"
                                ? "pending"
                                : "delivered"
                            }
                          >
                            {o_status}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </div>
  )
}

export default Orders