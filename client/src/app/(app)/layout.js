'use client'

import Loading from '@/app/(app)/Loading'
import Navigation from '@/app/(app)/Navigation'
import { useAuth } from '@/hooks/auth'
import AppProvider from '@/providers'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />
            <AppProvider>
                <main>{children}</main>
            </AppProvider>
        </div>
    )
}

export default AppLayout
