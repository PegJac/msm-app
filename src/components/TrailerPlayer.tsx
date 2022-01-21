import { send } from '@emailjs/browser'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import '../styles/trailerPlayer.scss'

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

        send(
            `${process.env.REACT_APP_EMAIL_SERVICE}`,
            `${process.env.REACT_APP_EMAIL_TEMPLATE}`,
            {
                from_name: "website",
                message: `An error occured on website, ${props.title} trailer failed.`
            },
            `${process.env.REACT_APP_EMAIL_USER}`
        )
    }

    return (
        <div className="trailerPlayerContainer">
            {error ? "An error occured, please try again later" :
                <ReactPlayer url={`https://vimeo.com/${props.url}`}
                    className="reactPlayer" onError={handleError} />
            }
            <Typography className="cardContent" variant='h4' title={props.title}>{props.title}</Typography>
            {imdbObj ? <Button href={`https://www.imdb.com/title/${props.imdb}`} className="button" variant='outlined'>
                <><FontAwesomeIcon className='icon' icon={faImdb as IconProp} />{imdbObj.imDb}/10</>
            </Button> : null}
        </div>
    )
}