const { QueryClient } = require('@tanstack/react-query')

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // staleTime: 4 * 1000,
            // refetchInterval: 4 * 1000,
            chacheTime: 1000 * 60 * 5,
        },
    },
})

export default queryClient
