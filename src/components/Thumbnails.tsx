import { useState } from "react"
import { useParams } from "react-router-dom"
import { ITitle, titles } from './../models/titles'

import { TrailerPlayer } from "./TrailerPlayer"

import '../styles/thumbnails.scss'

export const Thumbnails = () => {
    const [thumbnailSelected, setThumbnailSelected] = useState<null | ITitle>()

    const param = useParams().id

    const selectThumbnail = (title: ITitle) => {
        setThumbnailSelected(title)
    }

    const titlesOfGenre = titles.map((title, i) => {
        if (title.category === param) {
            return (
                <div key={i} className="thumbnailContainer" onClick={() => selectThumbnail(title)}>
                    <p>{title.titleSwedish}</p>
                    {thumbnailSelected === title ? <TrailerPlayer url={title.videoUrl} /> : <img src={title.imgUrl} className="thumbnail" alt="thumbnail" />}
                </div >
            )
        }
    })

    return (
        <div className="thumbnailsContainer">
            <h2>Thumbnails {param}</h2>
            {thumbnailSelected ? thumbnailSelected.titleSwedish : "notSelected"}
            {titlesOfGenre}
        </div>
    )
}