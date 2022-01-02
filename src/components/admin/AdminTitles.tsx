import { collection, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firebaseApp, storageRef } from "../../firebase"
import { ITitle } from "../../models/titles"

export const AdminTitles = () => {
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

    const thumbnails = titles.map((title, i) => {
        return (
            <div key={i} className="thumbnailContainer">
                <p>{title.titleSwedish}</p>
                <img src={title.imgUrl} className="thumbnail" alt="thumbnail" width={"200px"} />
            </div >
        )
    })

    return (
        <>
            {thumbnails}
        </>
    )
}

function SnapshtContext(SnapshtContext: any) {
    throw new Error("Function not implemented.")
}
