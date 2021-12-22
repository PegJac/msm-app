import { useParams } from "react-router-dom"

export const Thumbnails = () => {

    const param = useParams().id

    return (
        <div className="ThumbnailsContainer">
            <h2>Thumbnails {param}</h2>
        </div>
    )
}