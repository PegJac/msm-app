import { width } from "@mui/system"
import { IContactInfo } from "../../models/message"

interface IMessageProps {
    key: number
    item: IContactInfo
    deleteMessage: () => void
}

export const MessageCard = (props: IMessageProps) => {

    const messageCard =
        <div>
            <h3>{props.item.name}</h3>
            <p>{props.item.email}</p>
            <p>{props.item.tel}</p>
            <p>{props.item.message}</p>
            <p>{props.item.dateSent}</p>
            <p>{props.item.timeSent}</p>
        </div>
    return (
        <div className="messageContainer" style={{ border: "1px solid red" }}>
            {messageCard}
            <button type="button" onClick={() => props.deleteMessage()}>Delete</button>
        </div>
    )
}