import { Typography, Box } from '@mui/material';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};