'use client'

import { useCategorySotre } from '@/stores/category'
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material'
import React from 'react'

function SearchSideBar() {
    const { category, setCategory } = useCategorySotre()

    const handleChangeCategory = category => {
        setCategory(category)
    }

    return (
        <Box sx={{ bgcolor: 'white', borderRadius: '4px' }}>
            <Typography
                sx={{
                    bgcolor: '#3c3c3c88',
                    color: 'white',
                    padding: 1,
                    borderRadius: '4px 4px 0 0',
                }}>
                カテゴリ
            </Typography>
            <List>
                <ListItemButton
                    onClick={() => handleChangeCategory('all')}
                    sx={
                        category === 'all'
                            ? { bgcolor: '#afc8d5' }
                            : { bgcolor: 'inherit' }
                    }>
                    <ListItemText>すべて</ListItemText>
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleChangeCategory('movie')}
                    sx={
                        category === 'movie'
                            ? { bgcolor: '#afc8d5' }
                            : { bgcolor: 'inherit' }
                    }>
                    <ListItemText>映画</ListItemText>
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleChangeCategory('tv')}
                    sx={
                        category === 'tv'
                            ? { bgcolor: '#afc8d5' }
                            : { bgcolor: 'inherit' }
                    }>
                    <ListItemText>TV</ListItemText>
                </ListItemButton>
            </List>
        </Box>
    )
}

export default SearchSideBar
