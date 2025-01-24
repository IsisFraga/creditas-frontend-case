import { Box, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const Logo = () => (
  <Box 
    component="div"
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      flexGrow: { xs: 1, sm: 0 },
      gap: 2
    }}
  >
    <AccountBalanceIcon 
      sx={{ 
        display: 'flex', 
        color: 'primary.main'
      }} 
    />
    <Typography 
      variant="h6" 
      component="div" 
      sx={{ 
        color: 'text.primary',
        fontWeight: 600,
        fontSize: { xs: '1rem', sm: '1.25rem' }
      }}
    >
      Dinheiro já
    </Typography>
  </Box>
);