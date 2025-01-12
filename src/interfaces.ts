
export interface ResponseWithData extends Response {
    data: any
    error: any
}
export interface Aborter {
    aborter?: AbortController
}
export interface Modal {
    title: string
    text: string
    visible: boolean
}

export interface Company {
    name: string
}

export interface ProjectData {
    name: string
    description: string
    url: string
    date_start: string
    date_end: string
    job_position: string
    date_start_display: string
    date_end_display: string
}
export interface Project {
    project: ProjectData
    company: Company
}

export interface ProjectLabel {
    value: Project
    label: string
    visible?: boolean
}