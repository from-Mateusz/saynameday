export interface NameMeaning {
    name: string,
    meaning: string
}

export default interface NameDay {
    country: any,
    date: any,
    name: string,
    meaning: NameMeaning
}