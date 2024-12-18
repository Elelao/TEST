import { CalendarFilters, CalendarEvent } from './types'
import { MockDataGenerator } from './MockDataGenerator'

export class CalendarAdapter {
    static async fetchEvents(filters: CalendarFilters): Promise<{
        events: CalendarEvent[]
        error?: string
    }> {
        try {
            const events = MockDataGenerator.generateEvents(
                new Date(filters.startDate),
                new Date(filters.endDate)
            )

            return { events }
        } catch (error: unknown) {
            console.error('Erreur génération événements:', error)
            return {
                events: [],
                error: "Erreur lors de la génération des événements"
            }
        }
    }
}