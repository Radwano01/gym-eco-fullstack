import React from "react"
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import Slider from '../../components/slider/Slider'
import Section from '../../components/section/Section'
import PopularFeatures from '../../components/popularfeatures/PopularFeatures'
import Testimonials from '../../components/Testimonials/Testimonials'
import About from '../../components/about/About'
import Questions from '../../components/questions/Questions'


const Home = () => {


  return (
    <div className='home'>
        <div className="home-container">
            <div className="offer">
                <Navbar type={"offer-navbar"}/>
            </div>
            <div className="slider">
                <Slider/>
            </div>
            <div className="section">
                <Section type={"first-section"}/>
            </div><hr />
            <div className="popularfeatures">
                <PopularFeatures/>
            </div><hr />
            <div className="options">
                <Testimonials/>
            </div><hr />
            <div className="about">
                <About/>
            </div><hr />
            <div className="question">
                <Questions/>
            </div><hr />
            <div className="section">
                <Section type={"first-section"}/>
            </div>
        </div>
    </div>
  )
}

export default Home