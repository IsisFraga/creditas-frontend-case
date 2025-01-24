import Image from 'next/image';
import { Box } from '@mui/material';

export const IllustrationSection = () => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      aspectRatio: '7/6', 
      minHeight: 480, 
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 1,
      '@media (max-width: 600px)': {
        aspectRatio: '4/3',
      },
    }}
  >
    <Image
      src="/image.jpg"
      alt="Um homem e uma mulher sentados no sofá sorrindo com um Macbook no colo"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
  </Box>
);
