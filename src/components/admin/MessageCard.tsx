import { Avatar, Button, Fab, Typography } from "@mui/material"
import { DocumentData } from "firebase/firestore"

interface IMessageProps {
    key: number
    item: DocumentData
    deleteMessageFunction: () => void
    reply: () => void
}

export const MessageCard = (props: IMessageProps) => {

    return (
        <div className="cardContainer">
            <div className="topContent">
                <div className="subTopContent name">
                    <Avatar className="avatar">{props.item.name[0]}</Avatar>
                    <div>
                        <Typography variant="h6">{props.item.name}</Typography>
                        <Typography variant="body2">{props.item.email}</Typography>
                    </div>
                </div>
                <div className="subTopContent date">
                    <Typography variant="body2">{props.item.timeSent}</Typography>
                    <Typography variant="body2">{props.item.dateSent}</Typography>
                </div>
            </div>

            <div className="mainContent">
                <Typography className="message" variant="body1">{props.item.message}</Typography>
            </div>
            <div>
                <Button className="buttons" variant="outlined" onClick={() => props.reply()}> Reply</Button >
                <Button className="buttons" variant="outlined" color="warning" onClick={() => props.deleteMessageFunction()}>Delete</Button>
            </div>
        </div >
    )
}