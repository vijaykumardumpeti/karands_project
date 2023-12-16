import React from 'react'
import AdminDashboard from './AdminDashboard'
import Box from '@mui/material/Box';

export default function PaymentAdmin() {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminDashboard />
                <Box component="main" sx={{ marginTop: 10 }}>
                    Payment
                </Box>
            </Box>
        </div >
    )
}
