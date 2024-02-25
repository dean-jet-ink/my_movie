'use client'

import Loading from '@/app/(app)/Loading'
import { useCreateComment } from '@/features/review/api/queries/create-comment'
import { useGetReview } from '@/features/review/api/queries/get-review'
import CommentList from '@/features/review/components/CommentList'
import { useAuth } from '@/hooks/auth'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Rating,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'

const ReviewDetail = ({ params }) => {
    const { id: reviewId } = params

    const auth = useAuth()

    const { data: reviewDetail, isLoading } = useGetReview(reviewId)

    const [editContent, setEditContent] = useState('')

    const handleChangeContent = e => {
        setEditContent(e.target.value)
    }

    const {
        mutate: mutateCreate,
        isLoading: isLoadingCreate,
    } = useCreateComment(reviewId)

    const handleSubmit = e => {
        e.preventDefault()
        mutateCreate({ content: editContent })
        setEditContent('')
    }

    if (!reviewDetail || isLoading) {
        return <Loading />
    }

    const { user, content, rating, comments } = reviewDetail

    return (
        <Container sx={{ py: 2 }}>
            {/* レビュー内容 */}
            <Card sx={{ minHeight: '200px' }}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        {user.name}
                    </Typography>
                    <Rating name="read-only" readOnly value={rating} />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        {content}
                    </Typography>
                </CardContent>
            </Card>

            {/* コメント送信フォーム */}
            {auth.user.id !== user.id && (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                    p={2}
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                    }}>
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        error={editContent.length > 200}
                        helperText={
                            editContent.length > 200
                                ? '200文字を超えています'
                                : ''
                        }
                        fullWidth
                        label="comment"
                        variant="outlined"
                        value={editContent}
                        onChange={handleChangeContent}
                        sx={{ mr: 1, flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        style={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        }}
                        disabled={isLoadingCreate}>
                        送信
                    </Button>
                </Box>
            )}

            {/* コメント */}
            <CommentList reviewId={reviewId} comments={comments} />
        </Container>
    )
}

export default ReviewDetail
