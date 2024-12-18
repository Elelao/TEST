import { useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { DatesSetArg } from '@fullcalendar/core'
import { CalendarAdapter } from './CalendarAdapter'
import { useState, MutableRefObject } from 'react'
import { CalendarEvent } from './types'

interface CalendarProps {
    calendarRef: MutableRefObject<FullCalendar | null>
    isDark: boolean
}

export const Calendar = ({ calendarRef, isDark }: CalendarProps) => {
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDatesSet = useCallback(async (dateInfo: DatesSetArg) => {
        setLoading(true)
        setError(null)

        try {
            const { events: newEvents, error: fetchError } = await CalendarAdapter.fetchEvents({
                startDate: dateInfo.start.toISOString(),
                endDate: dateInfo.end.toISOString()
            })

            if (fetchError) {
                setError(fetchError)
            } else {
                setEvents(newEvents)
            }
        } catch (error: unknown) {
            setError('Erreur lors du chargement des événements')
            console.error('Erreur calendrier:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    if (error) {
        return (
            <main className="ml-20 mt-16 p-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
            </main>
        )
    }

    return (
        <main className="ml-20 mt-16 p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className={`relative h-[800px]
          ${isDark ? '[&_.fc-theme-standard]:!bg-gray-800' : ''}
          [&_.fc-theme-standard_.fc-scrollgrid]:!border-gray-700
          [&_.fc-theme-standard_.fc-scrollgrid_td]:!border-gray-700
          [&_.fc-theme-standard_.fc-scrollgrid_th]:!border-gray-700
          [&_.fc-col-header-cell]:dark:text-gray-300
          [&_.fc-timegrid-slot-label]:dark:text-gray-400
          [&_.fc-daygrid-day-number]:dark:text-gray-300
          [&_.fc-day-today]:dark:bg-gray-700
          [&_.fc-event]:dark:bg-blue-600
          [&_.fc-event]:dark:border-blue-700
          [&_.fc-event]:dark:text-white
          [&_.fc-timegrid-slot]:!border-gray-700
          [&_.fc-timegrid-slot-label-cushion]:dark:text-gray-400
          [&_.fc-timegrid-axis]:dark:text-gray-400
          [&_.fc-list-day-cushion]:dark:bg-gray-700
          [&_.fc-event]:rounded
          [&_.fc-event]:px-2
          [&_.fc-event]:shadow-sm
          [&_.fc]:font-sans
          [&_.fc-toolbar-title]:dark:text-white
          [&_.fc-button]:dark:bg-gray-700
          [&_.fc-button]:dark:text-gray-300
          [&_.fc-button]:dark:border-gray-600
          [&_.fc-button-active]:dark:!bg-gray-600
          [&_.fc-button]:dark:hover:bg-gray-600
          [&_.fc-day]:dark:bg-gray-800
        `}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="timeGridWeek"
                        events={events}
                        locale={frLocale}
                        firstDay={1}
                        headerToolbar={{
                            left: 'prev,today,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        buttonText={{
                            today: "Aujourd'hui",
                            month: 'Mois',
                            week: 'Semaine',
                            day: 'Jour'
                        }}
                        height="100%"
                        allDaySlot={false}
                        slotMinTime="08:00:00"
                        slotMaxTime="20:00:00"
                        slotDuration="00:30:00"
                        slotLabelInterval="01:00"
                        slotLabelFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }}
                        eventTimeFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }}
                        nowIndicator={true}
                        eventDisplay="block"
                        eventOverlap={false}
                        eventColor="#3B82F6"
                        eventTextColor="#FFFFFF"
                        datesSet={handleDatesSet}
                        eventContent={(eventInfo) => (
                            <>
                                <div className="font-medium">{eventInfo.event.title}</div>
                                {eventInfo.event.extendedProps.room && (
                                    <div className="text-sm opacity-90">
                                        {eventInfo.event.extendedProps.room}
                                    </div>
                                )}
                            </>
                        )}
                    />
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}