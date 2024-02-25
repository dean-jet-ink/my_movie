import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    Rating,
    TextareaAutosize,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDeleteReview } from '../api/queries/delete-review'
import { useAuth } from '@/hooks/auth'
import { useUpdateReview } from '../api/queries/update-review'
import Link from 'next/link'

const ReviewCard = ({ review }) => {
    const { id, user, rating, content, media_type, media_id } = review

    const { mutate: mutateDelete, isLoading } = useDeleteReview(
        id,
        media_type,
        media_id,
    )

    const handleDelete = () => {
        if (confirm('レビューを削除しますか？')) {
            mutateDelete()
        }
    }

    const auth = useAuth({ middleware: 'auth' })

    const [isEditMode, setIsEditMode] = useState(false)

    const handleEdit = () => {
        setIsEditMode(!isEditMode)
    }

    const [editRating, setEditRating] = useState(rating)

    const handleChangeRating = (e, rating) => {
        setEditRating(rating)
    }

    const [editContent, setEditContent] = useState(content)

    const handleChangeContent = e => {
        setEditContent(e.target.value)
    }

    const {
        mutate: mutateUpdate,
        isLoading: isLoadingUpdate,
    } = useUpdateReview(id, media_type, media_id)

    const handleUpdate = () => {
        mutateUpdate({ content: editContent, rating: editRating })
        handleEdit()
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {user.name}
                </Typography>
                {isEditMode ? (
                    <>
                        <Box sx={{ marginBottom: 2 }}>
                            <Box>
                                <Rating
                                    value={editRating}
                                    onChange={handleChangeRating}
                                />
                            </Box>
                            <TextareaAutosize
                                value={editContent}
                                onChange={handleChangeContent}
                                minRows={3}
                                style={{ width: '100%' }}
                            />
                        </Box>
                        <Grid
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                            <ButtonGroup>
                                <Button
                                    onClick={handleUpdate}
                                    disabled={
                                        !editContent.trim() ||
                                        !editRating ||
                                        isLoadingUpdate
                                    }>
                                    編集確定
                                </Button>
                                <Button color="warning" onClick={handleEdit}>
                                    キャンセル
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Rating value={rating} readOnly />
                        <Link
                            href={`/detail/${media_type}/${media_id}/review/${id}`}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                paragraph>
                                {content}
                            </Typography>
                        </Link>

                        {auth?.user.id === user.id && (
                            <Grid
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                <ButtonGroup>
                                    <Button onClick={handleEdit}>編集</Button>
                                    <Button
                                        color="error"
                                        onClick={handleDelete}
                                        isloading={isLoading}>
                                        削除
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default ReviewCard
