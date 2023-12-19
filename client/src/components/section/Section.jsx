import React from 'react'
import "./section.scss"
import {BsShieldCheck} from "react-icons/bs"
import { useTranslation } from 'react-i18next'

const Section = ({type}) => {

    const [t,] = useTranslation()

  return (
    <div className='section'>
        {type === "first-section" &&
            <div className="first-section">
                <div className="cards">
                    <div className="card">
                        <div className="icon">
                            <BsShieldCheck size={25}/>
                        </div>
                        <div className="type">
                            <div className="title">
                                <h3>{t("Section-Title-one")}</h3>
                            </div> 
                            <div className="text">
                                <h5>{t("Section-text-one")}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="wall">
                        |
                    </div>
                    <div className="card">
                        <div className="icon">
                            <BsShieldCheck size={25}/>
                        </div>
                        <div className="type">
                            <div className="title">
                                <h3>{t("Section-Title-two")}</h3>
                            </div>
                            <div className="text">
                                <h5>{t("Section-text-two")}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="wall">
                        |
                    </div>
                    <div className="card">
                        <div className="icon">
                            <BsShieldCheck size={25}/>
                        </div>
                        <div className="type">
                            <div className="title">
                                <h3>{t("Section-Title-three")}</h3>
                            </div>
                            <div className="text">
                                <h5>{t("Section-text-three")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Section