import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ITitle } from './../models/titles'

import { TrailerPlayer } from "./TrailerPlayer"

import '../styles/thumbnails.scss'
import { collection, DocumentData, getFirestore } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firebaseApp } from "../firebase"
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types"

export const Thumbnails = () => {
    const [thumbnailSelected, setThumbnailSelected] = useState<null | ITitle>()
    const [snapshot, loading, error] = useCollectionData(collection(getFirestore(firebaseApp), "titles"),
        { idField: "id" }
    )
    const [titles, setTitles] = useState<ITitle[]>([])
    const myTitles: any[] = []

    useEffect(() => {
        snapshot?.map(title => {
            myTitles.push(title)
        })
        setTitles(myTitles)
    }, [snapshot])

    console.log(snapshot)

    const param = useParams().id

    const selectThumbnail = (title: ITitle) => {
        setThumbnailSelected(title)
        console.log(title)
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