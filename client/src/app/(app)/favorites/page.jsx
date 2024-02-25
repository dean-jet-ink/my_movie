'use client'

import { useGetFavorites } from '@/features/favorite/api/queries/get-favorites'
import MediaCard from '@/features/media/components/MediaCard'
import { useAuth } from '@/hooks/auth'
import { Container, Grid } from '@mui/material'
import React from 'react'
import Loading from '../Loading'

const Favorites = () => {
    const auth = useAuth()

    const { data: favorites, isLoading, error } = useGetFavorites(auth.user.id)

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <Container>
            {favorites.length === 0 ? (
                <div className="fixed inset-0 flex justify-center items-center">
                    お気に入り登録作品が見つかりませんでした
                </div>
            ) : (
                <Grid container spacing={3} py={3}>
                    {favorites?.map(favorite => (
                        <Grid key={favorite.id} item xs={12} sm={6} md={4}>
                            <MediaCard
                                media={favorite}
                                mediaType={favorite.media_type}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default Favorites
