import React from 'react';
import PostFeeds from './PostFeeds';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';

export default function PostfeedAdmin() {
  return (
    <div>

      <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <PostFeeds />
        </Box>
      </Box>

    </div>
  )
}
