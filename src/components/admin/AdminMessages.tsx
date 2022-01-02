import { collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { db, firebaseApp, messagesRef } from "../../firebase"
import { IContactInfo } from '../../models/message'
import { MessageCard } from "./MessageCard"

export const AdminMessages = () => {
    const [snapshot, loading, error] = useCollectionData(collection(getFirestore(firebaseApp), "messages"),
        { idField: "id" }
    )
    const [messages, setMessages] = useState<IContactInfo[]>([])
    const myMessages: any[] = []

    useEffect(() => {
        snapshot?.map((message) => {
            myMessages.push(message)
        })
        setMessages(myMessages)
    }, [snapshot])

    const deleteMessage = (item: DocumentData) => {
        setMessages(messages.filter(message => message.id !== item.id))
        deleteDoc(doc(db, "messages", item.id))
    }

    return (
        <>
            {loading ? <p>Loading</p> : error ? <p>Error</p> : null}
            {messages.map((item: IContactInfo, key: number) => {
                return (
                    <div key={key} >
                        <MessageCard key={key} item={item} deleteMessage={() => deleteMessage(item)} />
                    </div>
                )
            })}
        </>
    )
}