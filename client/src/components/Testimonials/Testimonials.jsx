import React, { useState } from 'react'
import "./testimonials.scss"
import {BiSolidQuoteRight} from "react-icons/bi"
import {AiTwotoneStar} from "react-icons/ai"
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import sliderData from "./SliderData.js"
import {useTranslation} from "react-i18next"

const Testimonials = () => {
    const {t,} = useTranslation()
    const [slide, setSlide] = useState(0)
    const slideLength = sliderData.length;

    const prevClick = ()=>{
        setSlide(slide === 0 ? slideLength - 1 : slide - 1)
    }
    const nextClick = ()=>{
        setSlide(slide === slideLength - 1 ? 0 : slide + 1)
    }
  return (
    <div className='opinions'>
        <div className="opinions-container">
            <div className="opinions-text">
                <div className="type">
                    <h4>{t("Testimonial-Type")}</h4>
                </div>
                <div className="title">
                    <h1>{t("Testimonial-Title")}</h1>
                </div><br />
                <div className="text">
                    <h4>{t("Testimonial-Text")}</h4>
                </div>
            </div><br /><br />
            <div className="opinions-cards">
                <div className="card">
                     <div className="icon">
                        <BiSolidQuoteRight size={30}/>
                     </div>
                    <div className="text">
                        <h3>{sliderData[slide].text}</h3>
                    </div>
                    <div className="rate">
                        <AiTwotoneStar/><AiTwotoneStar/><AiTwotoneStar/><AiTwotoneStar/><AiTwotoneStar/>
                    </div>
                    <div className="client-name">
                        <h3>{sliderData[slide].name}</h3>
                    </div>
                </div>
            </div><br />
            <div className="arrows">
                <BsFillArrowLeftCircleFill size={30} className='left arrow' onClick={prevClick}/>
                <BsFillArrowRightCircleFill size={30} className='right arrow' onClick={nextClick}/>
            </div>
        </div>
    </div>
  )
}

export default Testimonials