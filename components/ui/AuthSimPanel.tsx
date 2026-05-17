"use client"

import { useAuth, UserRole } from "../context/MockAuthContext"

export default function AuthSimPanel() {
    const { currentRole, switchRole, user } = useAuth()

    // Don't show in production environments
    if (process.env.NODE_ENV === 'production') return null

    const roles: UserRole[] = ['guest', 'user', 'admin']

    return (
        <div className="fixed bottom-6 right-6 z-[200] bg-[#000752]/80 border border-white/20 backdrop-blur-xl p-4 rounded-3xl shadow-2xl max-w-xs font-sans">
            <div className="text-xs uppercase tracking-wider text-white/40 font-bold mb-3">
                🛠️ Auth Simulator
            </div>

            <div className="flex gap-2 mb-3">
                {roles.map((role) => (
                    <button
                        key={role}
                        onClick={() => switchRole(role)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-tight transition-all duration-300 ${currentRole === role
                                ? "bg-white text-[#000752] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                            }`}
                    >
                        {role}
                    </button>
                ))}
            </div>

            <div className="text-[11px] text-white/60 font-mono bg-black/20 p-2 rounded-xl border border-white/5">
                <div>Active Path: <span className="text-white font-bold">{currentRole}</span></div>
                {user && <div className="truncate mt-0.5">User: {user.email}</div>}
            </div>
        </div>
    )
}