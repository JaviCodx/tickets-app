import React from 'react';
import Box from '@mui/material/Box';

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <Box sx={{ width: '100%', background: '#f9f9f9' }}>{children}</Box>
    </div>
  );
};

export default Layout;
