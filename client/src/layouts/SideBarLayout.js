import SearchBar from '@/features/media/components/SearchBar'
import { Container, Grid } from '@mui/material'
import React from 'react'

const SideBarLayout = ({ children, sideBar }) => {
    return (
        <>
            <Container sx={{ padding: '40px 0' }}>
                <div className="mb-10">
                    <SearchBar />
                </div>
                <Grid container spacing={3} py={4}>
                    <Grid item xs={12} md={3}>
                        {sideBar}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SideBarLayout
