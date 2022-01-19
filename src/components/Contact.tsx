import { useEffect, useState } from 'react'
import { db, messagesRef } from "./../firebase"
import { collection, addDoc, doc } from 'firebase/firestore'
import { defaultContactInfo, IContactInfo } from '../models/message'
import { init, send } from '@emailjs/browser';
import '../styles/contactPage.scss'
import { About } from './About'
import { Button, TextField, Typography } from '@mui/material';

export const Contact = () => {
    const [info, setInfo] = useState<IContactInfo>(defaultContactInfo)
    const [helpTextName, setHelpTextName] = useState<string>("")
    const [helpTextEmail, setHelpTextEmail] = useState<string>("")
    const [helpTextMessage, setHelpTextMessage] = useState<string>("")
    const [validName, setValidName] = useState<boolean>(false)
    const [validEmail, setValidEmail] = useState<boolean>(false)
    const [validMessage, setValidMessage] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


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

    function emailChecker(elementValue: any) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    const validateName = () => {
        if (!info.name || info.name.length <= 2) {
            setHelpTextName("Enter name")
            setValidName(false)
        } else {
            setHelpTextName("")
            setValidName(true)
        }
    }

    const validateEmail = () => {
        if (!info.email || info.email.length < 6 || !emailChecker(info.email)) {
            setHelpTextEmail("Invalid email")
            setValidEmail(false)
        } else {
            setHelpTextEmail("")
            setValidEmail(true)
        }
    }

    const validateMessage = () => {
        if (!info.message || info.message.length <= 2) {
            setHelpTextMessage("Enter message")
            setValidMessage(false)
        } else {
            setHelpTextMessage("")
            setValidMessage(true)
        }
    }

    const handleSubmit = () => {
        validateName()
        validateEmail()
        validateMessage()

        if (validName && validEmail && validMessage) {

        }
    }

    const contactForm =
        <form className="form">
            <Typography variant='h6'>Contact form</Typography>
            <TextField
                margin="dense"
                id="name"
                label={"Name"}
                fullWidth
                variant="outlined"
                error={helpTextName.length > 1}
                helperText={helpTextName}
                value={info.name}
                onBlur={validateName}
                onChange={(e) => handleForm("name", e.target.value)} />

            <TextField
                margin="dense"
                id="name"
                label={"Email"}
                fullWidth
                variant="outlined"
                error={helpTextEmail.length > 1}
                helperText={helpTextEmail}
                value={info.email}
                onBlur={validateEmail}
                onChange={(e) => handleForm("email", e.target.value)} />

            <TextField
                margin="dense"
                id="name"
                label={"Message"}
                fullWidth
                multiline
                variant="outlined"
                error={helpTextMessage.length > 1}
                helperText={helpTextMessage}
                value={info.message}
                onBlur={validateMessage}
                onChange={(e) => handleForm("message", e.target.value)} />

            <Button className='sendButton' type='button' variant='contained' onClick={handleSubmit} color={error ? "error" : "primary"}>{error ? "Failed to send" : "Send"}</Button>
        </form >

    return (
        <div className="contactContainer">
            <About />
            <div>
                <div className="secondSection">
                    <div className="introduction">
                        <Typography variant="body1" fontWeight={800}>
                            For enquiries and collaborations:
                        </Typography>
                        <Button className="aboutButton" size="small" href="mailto:MagnusSjostromMedia@gmail.com">MagnusSjostromMedia@gmail.com</Button>
                        <Button className="aboutButton" href="tel:+46707531599">+46(0)70-7531599</Button>
                        <div>
                            <Button className="aboutButton" href="https://www.linkedin.com/in/magnus-sj%C3%B6str%C3%B6m-18227659/?originalSubdomain=se">Linkedin</Button>
                            <Button className="aboutButton" href="https://www.imdb.com/name/nm6912800/">ImDb</Button>
                        </div>
                    </div>
                    {contactForm}
                </div>
            </div>
        </div>
    )
}