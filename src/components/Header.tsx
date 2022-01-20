import { Button, Typography } from "@mui/material"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

import "./../styles/header.scss"

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isOnHomePage, setIsOnHomePage] = useState(true)

    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/') {
            return setIsOnHomePage(true)
        }
        setIsOnHomePage(false)
    }, [location]);


    onAuthStateChanged(auth, (currentUser) => {
        currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
    })

    const logout = async () => {
        await signOut(auth)
    }

    const color = isOnHomePage ? "white" : "black"

    return (
        <div className="headerContainer">
            <header>
                <Link className="link" to="/">
                    {isOnHomePage ?
                        <img src={require("./../assets/transp_besk.png")} alt="logo" />
                        : <img src={require("./../assets/logonew_besk.png")} alt="logo" />}
                </Link>
                {isLoggedIn ?
                    <div style={{ display: "flex" }}>
                        <Button className="links" href="/contact">
                            <Typography color={color} variant='body2'>Contact</Typography>
                        </Button>
                        <Button className="links" href="/admin">
                            <Typography color={color} variant='body2'>Admin</Typography>
                        </Button>
                        <Button className="links logoutButton" onClick={logout}>
                            <FontAwesomeIcon color={color} icon={faSignOut} />
                        </Button>
                    </div>
                    : <Button className="links" href="/contact">
                        <Typography color={color} variant='body2'>Contact</Typography>
                    </Button>}
            </header>
        </div>
    )
}