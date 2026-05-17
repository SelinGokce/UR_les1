"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'guest' | 'user' | 'admin'

interface UserProfile {
    name: string
    email: string
    role: UserRole
}

interface AuthContextType {
    user: UserProfile | null
    currentRole: UserRole
    switchRole: (role: UserRole) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [currentRole, setCurrentRole] = useState<UserRole>('guest')

    const switchRole = (role: UserRole) => {
        setCurrentRole(role)
        if (role === 'guest') {
            setUser(null)
        } else if (role === 'user') {
            setUser({ name: 'Selin TestUser', email: 'user@selindot.com', role: 'user' })
        } else if (role === 'admin') {
            setUser({ name: 'Selin Admin', email: 'admin@selindot.com', role: 'admin' })
        }
    }

    const logout = () => switchRole('guest')

    return (
        <AuthContext.Provider value={{ user, currentRole, switchRole, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within a MockAuthProvider')
    return context
}