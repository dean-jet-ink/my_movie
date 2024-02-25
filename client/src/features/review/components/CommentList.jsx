import { Grid } from '@mui/material'
import React from 'react'
import Comment from './Comment'

const CommentList = ({ reviewId, comments }) => {
    return (
        <Grid container spacing={2} mt={4}>
            {comments.map(comment => (
                <Grid key={comment.id} item xs={12}>
                    <Comment reviewId={reviewId} comment={comment} />
                </Grid>
            ))}
        </Grid>
    )
}

export default CommentList
