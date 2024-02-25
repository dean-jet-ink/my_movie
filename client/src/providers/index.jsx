'use client'

import queryClient from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const AppProvider = ({ children }) => {
    const [client] = useState(queryClient)

    return (
        <QueryClientProvider client={client}>
            {/* <ReactQueryDevtools /> */}
            {children}
        </QueryClientProvider>
    )
}

export default AppProvider
