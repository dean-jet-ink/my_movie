'use client'

import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MediaCard from './MediaCard'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import useSearchMediaQuery from '../api/queries/search-media'
import Loading from '@/app/(app)/Loading'
import { useCategorySotre } from '@/stores/category'

function MediaList() {
    const { category } = useCategorySotre()

    const query = useSearchParams().get('query')

    const { data: mediaList, isLoading } = useQuery(useSearchMediaQuery(query))

    const [filteredList, setFilteredList] = useState(mediaList)

    useEffect(() => {
        if (category === 'all') {
            setFilteredList(mediaList)
        } else if (category === 'movie') {
            setFilteredList(() => {
                return mediaList?.filter(media => media.media_type === 'movie')
            })
        } else if (category === 'tv') {
            setFilteredList(() => {
                return mediaList?.filter(media => media.media_type === 'tv')
            })
        }
    }, [mediaList, category])

    if (isLoading) <Loading />

    return (
        <Grid container spacing={3}>
            {filteredList?.map(media => (
                <Grid key={media.id} item xs={12} sm={6} md={4}>
                    <MediaCard media={media} mediaType={media.media_type} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MediaList
