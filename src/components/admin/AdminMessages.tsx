import { send } from "@emailjs/browser"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Typography } from "@mui/material"
import { collection, deleteDoc, doc, DocumentData, getFirestore } from "firebase/firestore"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { db, firebaseApp } from "../../firebase"
import { MessageCard } from "./MessageCard"

export const AdminMessages = () => {
    const [snapshot, loading, error] = useCollectionData(collection(getFirestore(firebaseApp), "messages"),
        { idField: "id" }
    )

    const [deleteMessage, setDeleteMessage] = useState<DocumentData | undefined>()
    const [deleteForm, setDeleteForm] = useState<string>("")
    const [replyMessage, setReplyMessage] = useState<DocumentData | undefined>()
    const [replyForm, setReplyForm] = useState<string>("")

    const [deleteError, setDeleteError] = useState<boolean>(false)


    const deleteMessageFunction = (item: DocumentData) => {
        if (deleteForm !== item.name) {
            return setDeleteError(true)
        }
        deleteDoc(doc(db, "messages", item.id))
        setDeleteForm("")
        setDeleteError(false)
        setDeleteMessage(undefined)
    }

    const replyMessageFunction = () => {
        send(
            `${process.env.REACT_APP_EMAIL_SERVICE}`,
            `${process.env.REACT_APP_EMAIL_TEMPLATE_RESPONSE}`,
            {
                email: replyMessage!.email,
                message: replyForm,
                reply_to: "testmsm25@gmail.com",
                original_message: replyMessage!.message
            },
            `${process.env.REACT_APP_EMAIL_USER}`
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setReplyForm("")
            setReplyMessage(undefined)
            return deleteDoc(doc(db, "messages", replyMessage!.id))
        }).catch((err) => {
            console.log(err)
            alert('FAILED...' + err.text);
        });
    }

    return (
        <div className="adminCardContainer">
            {/* Message Cards */}
            {snapshot?.map((item, key: number) => {
                return (
                    <div key={key} >
                        <MessageCard key={key} item={item} reply={() => setReplyMessage(item)} deleteMessageFunction={() => setDeleteMessage(item)} />
                    </div>
                )
            })}

            {/* Reply Dialog */}
            {replyMessage ? <Dialog fullWidth open={replyMessage ? true : false} onClose={() => { setReplyMessage(undefined); }}>
                <DialogTitle>Reply to {replyMessage.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {replyMessage.message}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        multiline
                        variant="standard"
                        value={replyForm}
                        placeholder="Reply..."
                        onChange={(e) => setReplyForm(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReplyMessage(undefined)}>Cancel</Button>
                    <Button color="warning" variant="contained" onClick={replyMessageFunction}>Send</Button>
                </DialogActions>
            </Dialog> : null}

            {/* Delete Dialog */}
            {deleteMessage ? <Dialog open={deleteMessage ? true : false} onClose={() => { setDeleteMessage(undefined); }}>
                <DialogTitle>Delete message from {deleteMessage.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this message?
                        This action can't be un-done.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        error={deleteError}
                        helperText={deleteError ? "Input does not match name" : null}
                        placeholder="Type name of sender to confirm"
                        variant="standard"
                        value={deleteForm}
                        onChange={(e) => setDeleteForm(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteMessage(undefined)}>Cancel</Button>
                    <Button color="warning" variant="contained" onClick={() => deleteMessageFunction(deleteMessage)}>Delete</Button>
                </DialogActions>
            </Dialog> : null}
        </div>
    )
}