export interface IContactInfo {
    name: string
    email: string
    // tel: number | null
    message: string
    id: string
    dateSent: string
    timeSent: string
    date: Date | undefined
}

export const defaultContactInfo: IContactInfo = {
    name: "",
    email: "",
    // tel: null,
    message: "",
    id: "",
    dateSent: "",
    timeSent: "",
    date: undefined
}