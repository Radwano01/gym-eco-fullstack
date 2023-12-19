import React from 'react'
import "./payment.scss"
import Navbar from '../../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'

const Payment = () => {

    const [t, ] = useTranslation()
  return (
    <div className='payment'>
        <br /><br /><Navbar type={"slider-navbar"}/><br /><br /><br />
        <div className="payment-container">
            <div className="title">
                <h1>{t("CheckOutPage-Title")}</h1>
            </div>
            <div className="text">
                <h3>{t("CheckOutPage-Title")}</h3>
            </div>
            <div className="cards">  
                <div className="card first-payment-way">
                    <a href="/first-payment-way">
                        <h1>{t("CheckOutPage-First-Payment")}</h1>
                    </a>
                </div>
                
                <div className="card second-payment-way">
                    <a href='/#'>
                        <h1>{t("CheckOutPage-Second-Payment")}</h1>
                    </a>
                </div> 
            </div>
            
        </div>
    </div>
  )
}

export default Payment