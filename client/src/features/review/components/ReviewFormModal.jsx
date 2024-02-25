import {
    Box,
    Button,
    Modal,
    Rating,
    TextareaAutosize,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useCreateReview } from '../api'

const ReviewFormModal = ({ isOpen, onClose, mediaType, mediaId }) => {
    const [content, setContent] = useState('')

    const handleReviewChange = e => {
        setContent(e.target.value)
    }

    const [rating, setRating] = useState(0)

    const handleRatingChange = (e, rating) => {
        setRating(rating)
    }

    const isDisabled = !content.trim() || !rating

    const { mutate, isLoading } = useCreateReview()

    const handleSubmit = async () => {
        mutate({ content, rating, mediaType, mediaId })
        setContent('')
        setRating(0)
        onClose()
    }
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                <Typography variant="h6" component="h2">
                    レビューを書く
                </Typography>
                <Rating required value={rating} onChange={handleRatingChange} />
                <TextareaAutosize
                    required
                    minRows={5}
                    placeholder="レビュー内容"
                    style={{ width: '100%', marginTop: '10px' }}
                    value={content}
                    onChange={handleReviewChange}
                />
                <Button
                    variant="outlined"
                    disabled={isDisabled || isLoading}
                    onClick={handleSubmit}>
                    送信
                </Button>
            </Box>
        </Modal>
    )
}

export default ReviewFormModal
