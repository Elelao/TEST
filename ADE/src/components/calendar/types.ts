import { EventInput } from '@fullcalendar/core'

export interface CalendarFilters {
    startDate: string
    endDate: string
    groups?: string[]
    rooms?: string[]
    searchQuery?: string
}

export interface CalendarEvent extends EventInput {
    extendedProps: {
        room: string
        group: string
        teacher: string
    }
}

export interface TimeSlot {
    start: number
    duration: number
}