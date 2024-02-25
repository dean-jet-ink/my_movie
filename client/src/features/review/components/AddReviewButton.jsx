import { Add } from '@mui/icons-material'
import { Box, Fab, Tooltip } from '@mui/material'
import React from 'react'

const AddReviewButton = ({ onClick }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '16px',
                right: '16px',
                zIndex: 5,
            }}>
            <Tooltip title="レビュー追加">
                <Fab
                    style={{ background: '#1976d2', color: 'white' }}
                    onClick={onClick}>
                    <Add />
                </Fab>
            </Tooltip>
        </Box>
    )
}

export default AddReviewButton
