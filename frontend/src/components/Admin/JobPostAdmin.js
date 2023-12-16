import React from 'react'
import Box from '@mui/material/Box';
import AdminDashboard from './AdminDashboard';

export default function JobPostAdmin() {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminDashboard />
                <Box component="main" sx={{ marginTop: 10 }}>
                    Jobposts
                </Box>
            </Box>
        </div >
    )
}
