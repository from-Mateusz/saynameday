export interface NameMeaning {
    name: string,
    meaning: string
}

export default interface NameDay {
    country: string,
    date: {},
    name: string,
    meaning: NameMeaning
}