import React from 'react'
import "./about.scss"
import oneImg from "../../assets/useraccount.png"
import {useTranslation} from "react-i18next"


const About = () => {
    const [t, ] = useTranslation()

  return (
    <div className='about'>
        <div className="about-container">
            <div className="left">
                <div className="title">
                    <h1>{t("About-Title")}</h1>
                </div>
                <div className="text">
                    <h3>{t("About-Text-Line-One")}</h3>
                    <h3>{t("About-Text-Line-Two")}</h3>
                </div>
            </div>
            <div className="right">
                <div className="img">
                    <img src={oneImg} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About