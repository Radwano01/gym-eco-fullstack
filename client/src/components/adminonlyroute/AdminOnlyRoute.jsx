import { Link } from "react-router-dom"

const email = process.env.REACT_APP_EMAIL
const userID = process.env.REACT_APP_USER_ID
const client_email = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL)
const client_userID = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_USER_ID)

const AdminOnlyRoute = ({children}) => {

    if(email === client_email && userID === client_userID){
        return children
    }else{
        return(
            <section style={{ height: "80vh", color:"white" }}>
                <br />
                <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="--btn">&larr; Back To Home</button>
                </Link>
                </div>
            </section>

        )
    }

}


export const AdminOnlyLink = ({children}) => {

    if(email === client_email && userID === client_userID){
        return children
    }else{
        return null
    }

}

export default AdminOnlyRoute