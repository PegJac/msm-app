import { Link } from "react-router-dom"

export const GenrePicker = () => {
    return (
        <div className="genrePickerContainer">
            <h1>GENRE</h1>
            <Link className="category" to="/genre/science">
                <button>Science</button>
            </Link>

            <Link className="category" to="/genre/history">
                <button>History</button>
            </Link>

            <Link className="category" to="/genre/culture">
                <button>Culture</button>
            </Link>
        </div>
    )
}