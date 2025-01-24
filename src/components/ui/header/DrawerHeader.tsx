import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerHeaderProps {
  onClose: () => void;
}

export const DrawerHeader = ({ onClose }: DrawerHeaderProps) => (
  <Box 
    component="div"
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      p: 2,
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}
  >
    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      Menu
    </Typography>
    <IconButton onClick={onClose} edge="end">
      <CloseIcon />
    </IconButton>
  </Box>
);