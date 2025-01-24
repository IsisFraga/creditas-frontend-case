'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AnimatedIllustration } from '../IllustrationSection/AnimatedIllustration';

const MotionTypography = motion(Typography);

export const PageTitle = () => (
  <Box
    component="section"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      mb: 4
    }}
  >
    <Box sx={{ width: 60, height: 60 }}>
      <AnimatedIllustration />
    </Box>
    <Box>
      <MotionTypography
        variant="h4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ fontWeight: 600 }}
      >
        Crédito simples e transparente
      </MotionTypography>
      <MotionTypography
        variant="subtitle1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        color="text.secondary"
      >
        Simule agora e descubra as melhores condições para seu empréstimo
      </MotionTypography>
    </Box>
    <Box sx={{ width: 60, height: 60 }}>
      <AnimatedIllustration />
    </Box>
  </Box>
);