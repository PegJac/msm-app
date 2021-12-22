import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <header>
            <Link to="/">
                <h1>msm</h1>
            </Link>
            <Link to="/contact">
                <h1>contact</h1>
            </Link>
        </header>
    )
}