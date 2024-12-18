'use client'

import { useState } from 'react'
import {
    Calendar,
    Clock,
    Search,
    Filter,
    Download,
    FolderOpen,
    X,
    Sun,
    Moon
} from 'lucide-react'

// Types
type SidebarProps = {
    activeTab: string
    setActiveTab: (tab: string) => void
}

type TopNavProps = {
    view: string
    setView: (view: string) => void
    onResourcesClick: () => void
    onThemeToggle: () => void
    theme: string
}

type ResourcesPanelProps = {
    isOpen: boolean
    onClose: () => void
}

// Composant panneau des ressources
const ResourcesPanel = ({ isOpen, onClose }: ResourcesPanelProps) => (
    <div className={`fixed left-20 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold dark:text-white">Ressources</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
        </div>
        <div className="p-4">
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Rechercher des ressources..."
                    className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Groupes d'étudiants</h3>
                    <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Groupe A</button>
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Groupe B</button>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Salles</h3>
                    <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Salle 101</button>
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Salle 102</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

// Sidebar component
const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => (
    <aside className="fixed left-0 top-0 h-full w-20 bg-gray-800 flex flex-col items-center py-4 space-y-8 z-20">
        <div className="text-white text-center">
            <div className="w-12 h-12 mx-auto border-4 border-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <span className="text-xs mt-1 block">Lyon 1</span>
        </div>
        <nav className="flex flex-col space-y-4">
            <button
                onClick={() => setActiveTab('planning')}
                className={`p-2 rounded-md transition-colors ${
                    activeTab === 'planning' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                aria-label="Planning"
            >
                <Calendar className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={() => setActiveTab('timeline')}
                className={`p-2 rounded-md transition-colors ${
                    activeTab === 'timeline' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                aria-label="Timeline"
            >
                <Clock className="w-6 h-6 text-white" />
            </button>
        </nav>
    </aside>
)

// TopNav component reorganisé
const TopNav = ({ view, setView, onResourcesClick, onThemeToggle, theme }: TopNavProps) => (
    <header className="fixed top-0 left-20 right-0 bg-white dark:bg-gray-800 shadow-md py-4 px-6 z-10">
        <div className="flex items-center justify-between gap-6">
            {/* Zone de recherche */}
            <div className="flex-grow max-w-xl relative">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-12 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Zone des actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onResourcesClick}
                    className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    <span>Ressources</span>
                </button>

                <button
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" />
                    <span>Télécharger</span>
                </button>
            </div>

            {/* Navigation temporelle et thème */}
            <div className="flex items-center gap-4">
                <div className="flex rounded-md bg-gray-100 dark:bg-gray-700 p-1">
                    {['Mois', 'Semaine', 'Journée'].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                                view === v
                                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {theme === 'light'
                        ? <Moon className="w-5 h-5 text-gray-600" />
                        : <Sun className="w-5 h-5 text-gray-400" />
                    }
                </button>
            </div>
        </div>
    </header>
)

// Main content area
const MainContent = ({ view }: { view: string }) => (
    <main className="ml-20 mt-16 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Vue {view}</h1>
            <p className="text-gray-600 dark:text-gray-300">Contenu de l'agenda à implémenter ici.</p>
        </div>
    </main>
)

// Main App component
export default function CalendarApp() {
    const [activeTab, setActiveTab] = useState('planning')
    const [view, setView] = useState('Semaine')
    const [theme, setTheme] = useState('light')
    const [isResourcesOpen, setIsResourcesOpen] = useState(false)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex-1">
                    <TopNav
                        view={view}
                        setView={setView}
                        onResourcesClick={() => setIsResourcesOpen(true)}
                        onThemeToggle={toggleTheme}
                        theme={theme}
                    />
                    <MainContent view={view} />
                </div>
                <ResourcesPanel
                    isOpen={isResourcesOpen}
                    onClose={() => setIsResourcesOpen(false)}
                />
            </div>
        </div>
    )
}