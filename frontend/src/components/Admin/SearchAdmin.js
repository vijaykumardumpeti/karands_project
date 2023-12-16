import React from 'react'
import Box from '@mui/material/Box';
import AdminDashboard from './AdminDashboard'

export default function SearchAdmin() {
  return (
    <div>
            <Box sx={{ display: 'flex' }}>
                <AdminDashboard />
                <Box component="main" sx={{ marginTop: 10 }}>
                    Search
                </Box>
            </Box>
        </div >
  )
}
