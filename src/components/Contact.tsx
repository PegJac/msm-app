import { useState } from 'react'
import { db, messagesRef } from "./../firebase"
import { collection, addDoc, doc } from 'firebase/firestore'
import { defaultContactInfo, IContactInfo } from '../models/message'

import '../styles/contactPage.scss'

export const Contact = () => {
    const [info, setInfo] = useState<IContactInfo>(defaultContactInfo)

    const handleForm = (id: string, value: string) => {

        const hour: string = new Date().getHours().toString()
        const minutes: string = new Date().getMinutes().toString()
        const seconds: string = new Date().getSeconds().toString()

        const currentDate: string = new Date().toLocaleDateString()
        const currentTime: string = hour + ":" + minutes + ":" + seconds

        setInfo(prev => {
            return {
                ...prev,
                [id]: value,
                dateSent: currentDate,
                timeSent: currentTime,
                date: new Date()
            }
        })
    }

    const handleSubmit = () => {
        if (info.name && info.email && info.message) {
            addDoc(messagesRef, info)
            setInfo(defaultContactInfo)
        } else {
            alert("Empty fields")
        }
    }

    const contactForm =
        <form id="form">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={info?.name ? info.name : ""} onChange={(e) => handleForm("name", e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={info?.email ? info.email : ""} onChange={(e) => handleForm("email", e.target.value)} />

            <label htmlFor="tel">Tel</label>
            <input type="tel" id="tel" value={info?.tel ? info.tel : ""} onChange={(e) => handleForm("tel", e.target.value)} />

            <label htmlFor="message">Message</label>
            <textarea id="message" value={info?.message ? info.message : ""} onChange={(e) => handleForm("message", e.target.value)} />
            <button type='button' onClick={handleSubmit}>Send</button>
        </form>

    return (
        <div className="contactContainer">
            <h1>Contact</h1>
            {contactForm}
        </div>
    )
}