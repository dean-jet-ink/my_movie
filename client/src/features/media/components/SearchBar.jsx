'use client'

import Button from '@/components/Button'
import { Search } from '@mui/icons-material'
import { Box, TextField } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function SearchBar() {
    const router = useRouter()

    const q = useSearchParams().get('query')

    const [query, setQuery] = useState(q)

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (query.trim() === '') {
            return
        }

        router.push(`search?query=${encodeURIComponent(query)}`)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                margin: '0 auto',
            }}
            component="form"
            onSubmit={handleSubmit}>
            <TextField
                fullWidth
                placeholder="作品を検索する"
                value={query}
                sx={{ marginRight: '10px', bgcolor: 'white' }}
                onChange={handleChange}
            />
            <Button type="submit" className="h-14">
                <Search />
            </Button>
        </Box>
    )
}

export default SearchBar
