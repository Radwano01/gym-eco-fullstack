import React from 'react'
import "./slider.scss"
import Navbar from '../navbar/Navbar'
import { useTranslation } from 'react-i18next'


const Slider = () => {

    const [t,] = useTranslation()


    
  return (
    <div className='slider'>
        <div className="slider-container"><br />
            <Navbar type={"slider-navbar"}/>
            <div className="content">
                <div className="title">
                    <h1>{t("Slider-Title")}</h1>
                </div><br />
                <div className="text">
                    <h3>{t("Slider-Text")}</h3>
                </div><br />
                <div className="button">
                    <button><a href="/products">{t("Slider-Button")}</a></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Slider