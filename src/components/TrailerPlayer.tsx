import { send } from '@emailjs/browser'
import { useEffect, useState } from 'react'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ReactPlayer from 'react-player/lazy'

import '../styles/trailerPlayer.scss'
import { Typography } from '@mui/material';

interface ITrailerPlayerProps {
    url: string
    imdb: string
    title: string
}

export const TrailerPlayer = (props: ITrailerPlayerProps) => {
    const [error, setError] = useState(false)
    const [imdbObj, setImdbObj] = useState<any>()

    useEffect(() => {
        if (props.imdb) {
            getImDbRating()
        }
    }, [props.imdb])

    const getImDbRating = async () => {
        const response = await fetch(`https://imdb-api.com/API/Ratings/k_tugr9bgk/${props.imdb}`);
        const myJson = await response.json();
        setImdbObj(myJson)
        return console.log(myJson)
    }

    const handleError = () => {
        setError(true)

    }

    return (
        <div className="trailerPlayerContainer">
            {error ? "An error occured, please try again later" :
                <ReactPlayer url={`https://vimeo.com/${props.url}`}
                    className="reactPlayer" onError={handleError} />
            }
            <Typography className="cardContent" variant='h4' title={props.title}>{props.title}</Typography>
            <Typography className="cardContent" variant='body1'>{imdbObj ? <a href={`https://www.imdb.com/title/${props.imdb}`}>
                <StarRateRoundedIcon />
                IMDb: {imdbObj.imDb}/10</a> : null}</Typography>
        </div>
    )
}