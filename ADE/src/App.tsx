import { useState, useRef } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { TopNav } from './components/layout/TopNav'
import { ResourcesPanel } from './components/layout/ResourcesPanel'
import { Calendar } from './components/calendar/Calendar'
import FullCalendar from '@fullcalendar/react'

export default function App() {
    const [theme, setTheme] = useState('light')
    const [isResourcesOpen, setIsResourcesOpen] = useState(false)
    const calendarRef = useRef<FullCalendar | null>(null)

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Sidebar />

                <div className="flex-1">
                    <TopNav
                        onResourcesClick={() => setIsResourcesOpen(!isResourcesOpen)}
                        onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        theme={theme}
                    />
                    <Calendar
                        calendarRef={calendarRef}
                        isDark={theme === 'dark'}
                    />
                </div>

                <ResourcesPanel
                    isOpen={isResourcesOpen}
                    onClose={() => setIsResourcesOpen(false)}
                />
            </div>
        </div>
    )
}