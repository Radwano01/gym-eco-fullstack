import React from 'react'
import "./profile.scss"
import Navbar from '../../components/navbar/Navbar'
import userImg from "../../assets/useraccount.png"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Profile = () => {

    const [t,] = useTranslation()

    const navigate = useNavigate()

    const userData = {
        name: window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME),
        email: window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL)
    }

    const signOut = ()=>{
        window.localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_USER_ID)
        window.localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL)
        window.localStorage.removeItem(process.env.NAME)
        navigate("/")
        toast.success("Logout Successfull")
    }
  return (
    <div className='profile'>
        <br /><br />
        <Navbar type={"slider-navbar"}/><br/><br /><br />
        <div className="profile-container">
            <div className="left">
                <div className="img">
                    <img src={userImg} alt="" /><br />
                </div>
            </div><br />
            <div className="right">
                <div className="name">
                    <span>{t("Profile-Name")}: </span>{userData.name}
                </div>
                <div className="email">
                    <span>{t("Profile-Email")}: </span>{userData.email}
                </div>
                <div className="signout">
                    <button onClick={signOut}>{t("Profile-Button")}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile