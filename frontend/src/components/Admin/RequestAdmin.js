import React from 'react'
import Box from '@mui/material/Box';
import AdminDashboard from './AdminDashboard';

export default function RequestAdmin() {
  return (
    <div>
         <Box sx={{ display: 'flex' }}>
                <AdminDashboard />
                <Box component="main" sx={{ marginTop: 10 }}>
                    <div className='card'>
                    <h2>Request</h2>
                    
                    </div>
                </Box>
            </Box>
      
    </div>
  )
}
