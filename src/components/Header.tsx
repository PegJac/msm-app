import { Link } from "react-router-dom"

import "./../styles/header.scss"

export const Header = () => {

    return (
        <div className="headerContainer">
            <header>
                <Link to="/">
                    <p>msm</p>
                </Link>
                <Link to="/contact">
                    <p>contact</p>
                </Link>
            </header>
        </div>
    )
}