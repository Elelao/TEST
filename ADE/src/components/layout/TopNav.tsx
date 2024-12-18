import { Filter, Download, Sun, Moon } from 'lucide-react'

type TopNavProps = {
    onResourcesClick: () => void
    onThemeToggle: () => void
    theme: string
}

export const TopNav = ({
                           onResourcesClick,
                           onThemeToggle,
                           theme
                       }: TopNavProps) => (
    <header className="fixed top-0 left-20 right-0 bg-white dark:bg-gray-800 shadow-md py-4 px-6 z-10">
        <div className="flex items-center justify-between gap-6">
            {/* Bouton de sélection des ressources */}
            <button
                onClick={onResourcesClick}
                className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
            >
                <Filter className="w-4 h-4 mr-2" />
                <span>Sélectionner des groupes ou salles</span>
            </button>

            {/* Zone des actions */}
            <div className="flex items-center gap-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    <span>Télécharger</span>
                </button>

                <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {theme === 'light'
                        ? <Sun className="w-5 h-5 text-gray-600" />
                        : <Moon className="w-5 h-5 text-gray-400" />
                    }
                </button>
            </div>
        </div>
    </header>
)