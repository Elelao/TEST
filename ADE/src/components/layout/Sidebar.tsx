export const Sidebar = () => (
    <aside className="fixed left-0 top-0 h-full w-20 bg-gray-800 flex flex-col items-center py-4 z-20">
        <div className="text-white text-center">
            <div className="w-12 h-12 mx-auto relative">
                <img
                    src="/logo_lyon1.png"
                    alt="Logo Université Lyon 1"
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="text-xs mt-1 block">ADE</span>
        </div>
    </aside>
)