import React from 'react'
import MediaList from '@/features/media/components/MediaList'
import queryClient from '@/lib/query-client'
import useSearchMediaQuery from '@/features/media/api/queries/search-media'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import SideBarLayout from '@/layouts/SideBarLayout'
import SearchSideBar from '@/features/media/components/SearchSideBar'

const Search = async ({ searchParams }) => {
    const { query } = searchParams

    await queryClient.prefetchQuery(useSearchMediaQuery(query))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SideBarLayout sideBar={<SearchSideBar />}>
                <MediaList />
            </SideBarLayout>
        </HydrationBoundary>
    )
}

export default Search
