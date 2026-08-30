interface UserTabNavigationProps {
    activeTab: 'user' | 'admin'
    userCount: number
    adminCount: number
    onSelectTab: (tab: 'user' | 'admin') => void
}

export default function UserTabNavigation({ activeTab, userCount, adminCount, onSelectTab }: UserTabNavigationProps) {
    return (
        <div className="flex border-b border-white/10 mb-6 font-mono text-sm">
            <button
                onClick={() => onSelectTab('user')}
                className={`pb-3 px-6 font-bold tracking-wider transition-all border-b-2 ${activeTab === 'user' ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
            >
                👥 USER ACCOUNTS ({userCount})
            </button>
            <button
                onClick={() => onSelectTab('admin')}
                className={`pb-3 px-6 font-bold tracking-wider transition-all border-b-2 ${activeTab === 'admin' ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
            >
                🛡️ ADMIN ACCOUNTS ({adminCount})
            </button>
        </div>
    )
}