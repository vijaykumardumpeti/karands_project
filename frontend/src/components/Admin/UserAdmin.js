import React from 'react'
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';

export default function UserAdmin() {
  return (
    <div>
            <Box sx={{ display: 'flex' }}>
                <AdminDashboard />
                <Box component="main" sx={{ marginTop: 10 }}>
                    User
                </Box>
            </Box>
        </div >
  )
}
