export interface IContactInfo {
    name: string
    email: string
    message: string
    id: string
    dateSent: string
    timeSent: string
    date: Date | undefined
}

export const defaultContactInfo: IContactInfo = {
    name: "",
    email: "",
    message: "",
    id: "",
    dateSent: "",
    timeSent: "",
    date: undefined
}