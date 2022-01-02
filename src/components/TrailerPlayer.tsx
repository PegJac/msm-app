import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'

import '../styles/trailerPlayer.scss'

interface ITrailerPlayerProps {
    url: string;
}

export const TrailerPlayer = (props: ITrailerPlayerProps) => {
    const [error, setError] = useState(false)

    const handleError = () => {
        setError(true)
    }

    return (
        <div className="trailerPlayerContainer">
            <ReactPlayer width={500} url={`https://vimeo.com/${props.url}`} className="reactPlayer" onError={handleError} />
            {error ? "An error occured, please try again later" : null}
        </div>
    )
}