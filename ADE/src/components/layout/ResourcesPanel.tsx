import { Search, X, Users, DoorOpen } from 'lucide-react'
import { useState, useMemo } from 'react'

const GROUPS = ['L3 Info', 'M1 Data', 'M2 IA', 'L2 Math-Info']
const ROOMS = ['Amphi A', 'Labo 101', 'Salle 201', 'Salle Info 1', 'Labo Réseau', 'Salle 305']

type ResourcesPanelProps = {
    isOpen: boolean
    onClose: () => void
}

export const ResourcesPanel = ({ isOpen, onClose }: ResourcesPanelProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    // Filtrer les groupes et salles en fonction de la recherche
    const filteredGroups = useMemo(() => {
        return GROUPS.filter(group =>
            group.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const filteredRooms = useMemo(() => {
        return ROOMS.filter(room =>
            room.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    return (
        <aside
            className={`fixed left-20 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-[15] ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* Header inchangé */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Fermer le panneau"
                >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                </button>
            </div>

            {/* Content avec recherche fonctionnelle */}
            <div className="p-4 space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                </div>

                {/* Groupes filtrés */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-gray-400"/>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Promotions ({filteredGroups.length})
                        </h3>
                    </div>
                    <div className="space-y-1">
                        {filteredGroups.map((group) => (
                            <button
                                key={group}
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                {group}
                            </button>
                        ))}
                        {filteredGroups.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                                Aucune promotion trouvée
                            </p>
                        )}
                    </div>
                </section>

                {/* Salles filtrées */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <DoorOpen className="w-5 h-5 text-gray-400"/>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Salles ({filteredRooms.length})
                        </h3>
                    </div>
                    <div className="space-y-1">
                        {filteredRooms.map((room) => (
                            <button
                                key={room}
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                {room}
                            </button>
                        ))}
                        {filteredRooms.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                                Aucune salle trouvée
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </aside>
    )
}