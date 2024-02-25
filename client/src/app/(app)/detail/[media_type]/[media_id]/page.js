'use client'

import Loading from '@/app/(app)/Loading'
import { useGetMediaDetailQuery } from '@/features/media/api'
import AddReviewButton from '@/features/review/components/AddReviewButton'
import ReviewFormModal from '@/features/review/components/ReviewFormModal'
import ReviewList from '@/features/review/components/ReviewList'
import {
    Box,
    Container,
    Grid,
    IconButton,
    Rating,
    Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import { useGetReviews } from '@/features/review/api'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useToggleFavorite } from '@/features/favorite/api/queries/toggle-favorite'
import { useGetFavoriteStatus } from '@/features/favorite/api/queries/get-favorite-status'
import { useAuth } from '@/hooks/auth'

function Detail({ params }) {
    const { media_type, media_id } = params

    const auth = useAuth()

    const { data: detail, isLoading } = useQuery(
        useGetMediaDetailQuery({ mediaType: media_type, mediaId: media_id }),
    )

    const { data: reviews } = useQuery(
        useGetReviews({ mediaType: media_type, mediaId: media_id }),
    )

    const { data: isFavorite } = useGetFavoriteStatus(
        media_type,
        media_id,
        auth.user.id,
    )

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const [avgRating, setAvgRating] = useState(0)

    const calcAvarageRating = reviews => {
        if (!reviews || reviews.length === 0) {
            setAvgRating(null)
            return
        }

        const sum = reviews.reduce((total, review) => total + review.rating, 0)

        return (sum / reviews.length).toFixed(1)
    }

    const { mutate: mutateFavorite } = useToggleFavorite(
        media_type,
        media_id,
        auth.user.id,
    )

    const handleToggleFavorite = () => {
        mutateFavorite()
    }

    useEffect(() => {
        setAvgRating(calcAvarageRating(reviews))
    }, [reviews])

    if (isLoading) <Loading />

    return (
        <Box>
            <Box
                sx={{
                    height: {
                        xs: 'auto',
                        md: '70vh',
                    },
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Box
                    sx={{
                        background: `url(https://image.tmdb.org/t/p/original${detail?.poster_path}) no-repeat center/cover`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(2px)',
                        },
                    }}
                />
                <Container sx={{ zIndex: 1 }}>
                    <Grid container>
                        <Grid
                            item
                            md={4}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <img
                                src={`https://image.tmdb.org/t/p/original${detail?.poster_path}`}
                                className="aspect-[2/3] w-[70%]"
                            />
                        </Grid>
                        <Grid
                            item
                            md={8}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '2vw',
                                color: 'white',
                            }}>
                            {/* 映画詳細 */}
                            <Typography variant="h4">
                                {detail?.title || detail?.name}
                            </Typography>
                            <Typography>{detail?.overview}</Typography>

                            {/* お気に入りボタン */}
                            <IconButton
                                sx={{
                                    color: isFavorite ? 'red' : 'white',
                                    width: 'fit-content',
                                }}
                                onClick={handleToggleFavorite}>
                                <FavoriteIcon />
                            </IconButton>

                            {/* レビューレーティング */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                gap={2}>
                                <Rating
                                    readOnly
                                    value={parseFloat(avgRating)}
                                    precision={0.5}
                                    emptyIcon={
                                        <StarIcon style={{ color: 'white' }} />
                                    }
                                />
                                <Typography sx={{ fontSize: '1.2rem' }}>
                                    {avgRating}
                                </Typography>
                            </Box>
                            <Typography>
                                {media_type === 'movie'
                                    ? `公開日: ${detail?.release_date}`
                                    : `初回放送日: ${detail?.first_air_date}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <ReviewList reviews={reviews} />
            <AddReviewButton onClick={handleOpen} />
            <ReviewFormModal
                isOpen={isOpen}
                onClose={handleClose}
                mediaId={media_id}
                mediaType={media_type}
            />
        </Box>
    )
}

export default Detail
