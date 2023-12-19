import React, { useRef } from 'react'
import "./navbar.scss"
import {CgProfile} from "react-icons/cg"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsTranslate} from "react-icons/bs"
import {NavLink} from "react-router-dom"
import{ AdminOnlyLink } from '../adminonlyroute/AdminOnlyRoute'
import { useTranslation } from 'react-i18next'
import {FaTimes , FaBars} from "react-icons/fa"

const Navbar = ({type}) => {

  const navRef = useRef()

  const showNavbar = ()=>{
    navRef.current.classList.toggle("responsive-nav")
  }

  const [t, i18n] = useTranslation()

  const handleChangeLanguage = () =>{
    if(i18n.language === "en"){
      i18n.changeLanguage("tr")
    }else if(i18n.language === "tr"){
      i18n.changeLanguage("en")
    }
  }

  const userID = window.localStorage.getItem(
    process.env.REACT_APP_LOCALSTORAGE_USER_ID
  );

  
  return (
    <div className='navbar'>
        <div className="navbar-container">
          {
            type === "offer-navbar" &&
            (
              <div className="offer">
                <h2>Yaz indirimleri yakında bitiyor | Express worldwide shipping</h2>
              </div>
            )
          }
          {
            type === "slider-navbar" &&
            (
              <div className="slider-navbar">
                <div className="left-navbar">
                    <div className="logo">
                        <NavLink to="/"><h1>LOGO</h1></NavLink>
                    </div>
                </div>
                <div className="center-navbar">
                  <div className="options">
                    <ul ref={navRef}>
                      <AdminOnlyLink>
                        <NavLink to="/admin/homepage">{t("Navbar-Admin")}</NavLink>
                      </AdminOnlyLink>
                      <NavLink to="/">{t("Navbar-Home")}</NavLink>
                      <NavLink to="/products">{t("Navbar-Products")}</NavLink>
                      <NavLink to="/contact">{t("Navbar-Contact")}</NavLink>
                      <NavLink to="/orders">{t("Navbar-Orders")}</NavLink>
                      {userID ? <NavLink to="/profile"><CgProfile size={20}/></NavLink> : <NavLink to="/registration/login"><CgProfile size={20}/></NavLink>}
                      <NavLink to="/cart"><AiOutlineShoppingCart size={20}/></NavLink>
                      <li><button onClick={handleChangeLanguage}><BsTranslate size={20}/></button></li>
                      <button onClick={showNavbar} className='nav-btn nav-close-btn'>
                        <FaTimes size={30} color='white'/>
                      </button>
                    </ul>
                    <button className='nav-btn bar' onClick={showNavbar}>
                      <FaBars size={30} color='white'/>
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Navbar