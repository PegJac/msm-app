import { useEffect, useState } from 'react'
import { db, messagesRef } from "./../firebase"
import { collection, addDoc, doc } from 'firebase/firestore'
import { defaultContactInfo, IContactInfo } from '../models/message'
import { init, send } from '@emailjs/browser';
import '../styles/contactPage.scss'
import { Button, Link, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faImdb } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane, faFrownOpen, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { emailChecker } from '../utils/emailChecker';

export const Contact = () => {
    const [info, setInfo] = useState<IContactInfo>(defaultContactInfo)
    const [helpTextName, setHelpTextName] = useState<string>("")
    const [helpTextEmail, setHelpTextEmail] = useState<string>("")
    const [helpTextMessage, setHelpTextMessage] = useState<string>("")
    const [validName, setValidName] = useState<boolean>(false)
    const [validEmail, setValidEmail] = useState<boolean>(false)
    const [validMessage, setValidMessage] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [sent, setSent] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    init(`${process.env.REACT_APP_EMAIL_USER}`)

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
            setLoading(true)

            return send(
                `${process.env.REACT_APP_EMAIL_SERVICE}`,
                `${process.env.REACT_APP_EMAIL_TEMPLATE}`,
                {
                    from_name: info.name,
                    message: info.message,
                    reply_to: info.email,
                    contact_email: info.email
                },
                `${process.env.REACT_APP_EMAIL_USER}`
            )
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setValidName(true)
                    setValidEmail(true)
                    setValidMessage(true)
                    addDoc(messagesRef, info)
                    setInfo(defaultContactInfo)

                    setLoading(false)
                    setSent(true)
                    return setTimeout(() => {
                        setSent(false)
                    }, 4000);
                })
                .catch((err) => {
                    setLoading(false)
                    setError(true)
                    console.log(err)
                    return send(
                        `${process.env.REACT_APP_EMAIL_SERVICE}`,
                        `${process.env.REACT_APP_EMAIL_TEMPLATE}`,
                        {
                            from_name: "website",
                            message: `An error occured on website, contact form failed. ERROR: ${err.text}`
                        },
                        `${process.env.REACT_APP_EMAIL_USER}`
                    )
                });
        }
        setLoading(false)
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000);
    }

    const contactForm =
        <form className="form" title="form">
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

            <Button className='sendButton' type='button' variant='contained' onClick={handleSubmit} color={error ? "error" : "primary"}>
                {loading ? <FontAwesomeIcon icon={faSpinner} className='spinner' />
                    : sent ? <FontAwesomeIcon icon={faCheckCircle} />
                        : error ? <FontAwesomeIcon icon={faFrownOpen} />
                            : <FontAwesomeIcon icon={faPaperPlane} />}
            </Button>
        </form >

    return (
        <div className="contactContainer" title="contact">
            <div className="aboutContainer" title="about">
                <img src="https://media-exp1.licdn.com/dms/image/C5103AQGmXL1iQ2b0OA/profile-displayphoto-shrink_800_800/0/1517235139683?e=1646870400&v=beta&t=QszHY-zugOMOhgphIO8GAgM9k1GMGUxwBGV92JOo0S4" alt="Magnus Sjöström" />
                <div className="introduction">
                    <Typography variant='h6'>Magnus Sjöström</Typography>
                    <Typography variant="body1">
                        Director, writer and producer of thought provoking documentaries and factual series.
                        Vivid visual storytelling. Captivating characters and cases.
                    </Typography>
                </div>
            </div>
            <div className="secondSection">
                <div className="introduction">
                    <Typography variant="body1" fontWeight={800}>
                        For enquiries and collaborations:
                    </Typography>
                    <Link className="aboutButton" href="mailto:MagnusSjostromMedia@gmail.com">MagnusSjostromMedia@gmail.com</Link>
                    <Link className="aboutButton" href="tel:+46707531599">+46(0)70-7531599</Link>
                    <div>
                        <Button className='button' variant='contained' href="https://www.linkedin.com/in/magnus-sj%C3%B6str%C3%B6m-18227659/?originalSubdomain=se">
                            <FontAwesomeIcon className='icon' icon={faLinkedinIn as IconProp} />
                        </Button>
                        <Button className='button' variant='contained' href="https://www.imdb.com/name/nm6912800/">
                            <FontAwesomeIcon className='icon' icon={faImdb as IconProp} />
                        </Button>
                    </div>
                </div>
                {contactForm}
            </div>
        </div>
    )
}