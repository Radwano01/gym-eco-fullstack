import React from 'react'
import "./footer.scss"
import {BsInstagram, BsFacebook} from "react-icons/bs"
import {FaCcVisa} from "react-icons/fa"
import {useTranslation} from "react-i18next"


const Footer = () => {
  const [t,] = useTranslation()

  return (
    <>
      <div className='footer'>
        <div className="footer-container">
          <div className="left">
            <div className="title">
              <h2>{t("Footer-About-Title")}</h2><br />
              <h4>{t("Footer-About-Text-Line-One")}</h4>
              <h4>{t("Footer-About-Text-Line-Two")}</h4>
              <h4>{t("Footer-About-Text-Line-Three")}</h4>
              <h4>{t("Footer-About-Text-Line-Four")}</h4>

            </div><br />
            <div className="icons">
              <div className="icon">
                <BsInstagram size={25} color='white'/>
              </div>
              <div className="icon">
                <BsFacebook size={25} color='white'/>
              </div>
            </div>
          </div>
          <div className="center">
            <h2>{t("Footer-Company-Title")}</h2><br />
            <ul>
              <li><a href="/">{t("Footer-Company-Section-One")}</a></li>
              <li><a href="/">{t("Footer-Company-Section-Two")}</a></li>
              <li><a href="/">{t("Footer-Company-Section-Three")}</a></li>
              <li><a href="/">{t("Footer-Company-Section-Four")}</a></li>
            </ul>

          </div>
          <div className="right">
            <h2>{t("Footer-Send-Email-Title")}</h2><br />
            <h4>{t("Footer-Send-Email-Text-Line-One")}</h4>
            <h4>{t("Footer-Send-Email-Text-Line-Two")}</h4><br />
            <form>
              <input type="email" placeholder='E-Postan'/>
              <button>{t("Footer-Send-Email-Button")}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="buttom-footer">
        <div className="left">
          <h3>{t("Footer-Copyright")}</h3>
        </div>
        <div className="right">
          <div className="icon">
            <FaCcVisa size={40}/>
          </div>
          <div className="icon">
            <FaCcVisa size={40}/>
          </div>
          <div className="icon">
            <FaCcVisa size={40}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer