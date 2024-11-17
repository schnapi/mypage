export interface Modal {
    title: string
    text: string
    visible: boolean
}

export interface Project {
    name: string
    description: string
    link: string
    dateFrom: string
    dateTo: string
    company: string
    jobPosition: string
    visible?: boolean
}