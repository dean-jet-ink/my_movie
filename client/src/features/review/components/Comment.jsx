import { useAuth } from '@/hooks/auth'
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    TextareaAutosize,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useUpdateComment } from '../api/queries/update-comment'
import { useDeleteComment } from '../api/queries/delete-comment'

const Comment = ({ reviewId, comment }) => {
    const auth = useAuth()

    const { id, user, content } = comment

    const [isEditMode, setIsEditMode] = useState(false)

    const handleEdit = () => {
        setIsEditMode(!isEditMode)
    }

    const {
        mutate: mutateUpdate,
        isLoading: isLoadingUpdate,
    } = useUpdateComment(reviewId, id)

    const [editContent, setEditContent] = useState(content)

    const handleChangeContent = e => {
        setEditContent(e.target.value)
    }

    const handleUpdate = () => {
        mutateUpdate({ content: editContent })
        handleEdit()
    }

    const {
        mutate: mutateDelete,
        isLoading: isLoadingDelete,
    } = useDeleteComment(reviewId, id)

    const handleDelete = () => {
        mutateDelete()
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
                                        !editContent.trim() || isLoadingUpdate
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
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            {content}
                        </Typography>

                        {auth.user.id === user.id && (
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
                                        disabled={isLoadingDelete}>
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

export default Comment
