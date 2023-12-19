import React from 'react'
import "./contact.scss"
import Navbar from '../../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'

const Contact = () => {

    const [t,] = useTranslation()
  return (
    <div className='contact'>
        <br /><br />
        <Navbar type={"slider-navbar"}/><br/><br /><br />
        <div className="contact-container">
            <div className="type">
                <div className="title">
                    <h1>{t("Contact-Title")}</h1>
                </div>
                <div className="text">
                    <h3>{t("Contact-Text")}</h3>
                </div>
            </div>
            <div className="form">
                <form>
                    <div className="first-line">
                        <label htmlFor="name">{t("Contact-Label-Name")} </label><br />
                        <input type="name" name='name' id='name' placeholder='   Adın'/>
                    </div><br />
                    <div className="second-line">
                        <label htmlFor="surname">{t("Contact-Label-Surname")}</label><br />
                        <input type="text" name='surname' id='surname' placeholder='   Soyadın'/>
                    </div><br />
                    <div className="third-line">
                        <label htmlFor="email">{t("Contact-Label-Email")}</label><br />
                        <input type="email" name='email' id='email' placeholder='   E-Postan'/>
                    </div><br />
                    <textarea name="" id="" cols="30" rows="10" placeholder='Message'></textarea><br />
                    <button>{t("Contact-Label-Button")}</button>
                </form>
            </div>
        </div>
        <br />
    </div>
  )
}

export default Contact