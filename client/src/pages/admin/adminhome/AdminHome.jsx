import React, { useEffect, useState } from 'react'
import "./adminhome.scss"

import { AiFillDollarCircle } from "react-icons/ai"
import { BsCart4 } from "react-icons/bs"
import {FaCartArrowDown} from "react-icons/fa"
import axios from "axios"
import { toast } from 'react-toastify'
import InfoBox from '../../../components/admin/infobox/InfoBox'
import Chart from '../../../components/admin/chart/Chart'

const AdminHome = () => {

  const [productsLength, setProductsLength] = useState(0)
  const [amount, setAmount] = useState(0)
  const [ordersLength, setOrdersLength] = useState(0)
  const [ordersStatus, setOrdersStatus] = useState([])

  const getProductData = async()=>{

    const response = await axios.get(`${process.env.REACT_APP_API}/api/products/get-products`)
    const productslength = response.data?.length || 0;
    setProductsLength(productslength)
  }

  const getOrderData = async()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/api/orders/get-orders`)
      const data = response.data[0]
      
      const productsAmount = data?.map((item)=> item.o_price)
      const total = productsAmount.reduce((a,b)=> {return a + b}, 0)
      setAmount(total)
  
      const ordersFilter = data.length;
      setOrdersLength(ordersFilter)

      const ordersStatus = data?.map((item)=> item?.o_status) || 0;
      setOrdersStatus(ordersStatus)
      
    }catch{
      toast.error("something went wrong")
    }
  }
  

  useEffect(()=>{
    getProductData()
    getOrderData()
  },[])

  return (
    <div className="home-admin">
        <div className="info-box">
            <InfoBox className={"card-box  cardone-box"} title={"Earnings"} count={`TRY${amount}`} icon={<AiFillDollarCircle size={30} color='#b624ff'/>}/>
            <InfoBox className={"card-box  cardtwo-box"} title={"Products"} count={`${productsLength}`} icon={<BsCart4 size={30} color='#1f93ff'/>}/>
            <InfoBox className={"card-box  cardthree-box"} title={"Orders"} count={`${ordersLength}`} icon={<FaCartArrowDown size={30} color='orangered'/>}/>
        </div>
        <div className="chart">
            <Chart orderStatus={ordersStatus}/>
        </div>
    </div>
  )
}

export default AdminHome