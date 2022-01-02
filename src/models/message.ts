export interface IContactInfo {
    name: string | null
    email: string | null
    tel: number | null
    message: string | null
    id: string | null
    dateSent: string | null
    timeSent: string | null
    date: Date | null
}

export const defaultContactInfo: IContactInfo = {
    name: null,
    email: null,
    tel: null,
    message: null,
    id: null,
    dateSent: null,
    timeSent: null,
    date: null
}