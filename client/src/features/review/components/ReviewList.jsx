'use client'

import { Container, Typography, Grid } from '@mui/material'
import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewList = ({ reviews }) => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                レビュー一覧
            </Typography>

            <Grid container spacing={3}>
                {reviews?.map(review => (
                    <Grid key={review.id} item xs={12}>
                        <ReviewCard review={review} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ReviewList
