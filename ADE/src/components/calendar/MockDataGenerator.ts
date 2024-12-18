import {CalendarEvent, TimeSlot} from './types'

export class MockDataGenerator {
    private static readonly COURSE_TITLES = [
        'Mathématiques', 'Physique', 'Développement Web',
        'Base de données', 'Intelligence Artificielle',
        'Architecture Logicielle', 'Algorithmes Avancés', 'Cybersécurité'
    ]

    private static readonly TEACHERS = [
        'Dr. Martin', 'Prof. Dubois', 'Mme. Garcia',
        'M. Chen', 'Dr. Wilson', 'Mme. Bernard'
    ]

    private static readonly ROOMS = [
        'Amphi A', 'Labo 101', 'Salle 201',
        'Salle Info 1', 'Labo Réseau', 'Salle 305'
    ]

    private static readonly GROUPS = [
        'L3 Info', 'M1 Data', 'M2 IA', 'L2 Math-Info'
    ]

    private static readonly TIME_SLOTS: TimeSlot[] = [
        { start: 8, duration: 2 },   // 8h-10h
        { start: 10, duration: 2 },  // 10h-12h
        { start: 13, duration: 3 },  // 13h-16h
        { start: 16, duration: 2 }   // 16h-18h
    ]

    private static getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)]
    }

    private static generateTimeSlot(date: Date): { start: Date; end: Date } {
        const slot = this.getRandomElement(this.TIME_SLOTS)
        const start = new Date(date)
        start.setHours(slot.start, 0, 0, 0)

        const end = new Date(start)
        end.setHours(start.getHours() + slot.duration, 0, 0, 0)

        return { start, end }
    }

    private static isWeekend(date: Date): boolean {
        const day = date.getDay()
        return day === 0 || day === 6
    }

    private static generateDayEvents(date: Date): CalendarEvent[] {
        if (this.isWeekend(date)) return []

        const numEvents = 2 + Math.floor(Math.random() * 3)
        const dayEvents: CalendarEvent[] = []
        const usedTimeSlots = new Set<number>()

        for (let i = 0; i < numEvents; i++) {
            const { start, end } = this.generateTimeSlot(date)
            const timeKey = start.getHours()

            if (!usedTimeSlots.has(timeKey)) {
                usedTimeSlots.add(timeKey)
                const group = this.getRandomElement(this.GROUPS)

                dayEvents.push({
                    id: `${start.toISOString()}-${group}`,
                    title: this.getRandomElement(this.COURSE_TITLES),
                    start: start.toISOString(),
                    end: end.toISOString(),
                    extendedProps: {
                        room: this.getRandomElement(this.ROOMS),
                        group,
                        teacher: this.getRandomElement(this.TEACHERS)
                    }
                })
            }
        }

        return dayEvents
    }

    static generateEvents(startDate: Date, endDate: Date): CalendarEvent[] {
        const events: CalendarEvent[] = []
        const currentDate = new Date(startDate)

        // Normalize dates to start/end of day for consistent comparison
        currentDate.setHours(0, 0, 0, 0)
        const endDateTime = new Date(endDate)
        endDateTime.setHours(23, 59, 59, 999)

        while (currentDate <= endDateTime) {
            events.push(...this.generateDayEvents(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return events
    }
}
