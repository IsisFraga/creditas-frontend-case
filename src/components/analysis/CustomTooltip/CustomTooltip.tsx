import { Card } from '@/components/ui';
import { Typography, useTheme } from '@mui/material';
import { TooltipProps as RechartsTooltipProps } from 'recharts';

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
} & Omit<RechartsTooltipProps<number, string>, 'payload'>;

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const theme = useTheme();
  
  if (!active || !payload) return null;

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 1.5,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2" color="text.primary">
        {`Mês: ${label}`}
      </Typography>
      {payload.map((entry, index) => (
        <Typography 
          key={index} 
          variant="body2" 
          color="text.secondary"
          sx={{ color: entry.color }}
        >
          {`${entry.name}: R$ ${entry.value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </Typography>
      ))}
    </Card>
  );
};