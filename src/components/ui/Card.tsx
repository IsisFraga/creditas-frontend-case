import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  noPadding?: boolean;
}

export const Card = ({ children, noPadding = false, ...props }: CardProps) => {
  return (
    <MuiCard
      elevation={0}
      {...props}
      sx={{
        borderRadius: 2,
        p: noPadding ? 0 : 3,
        ...props.sx
      }}
    >
      {children}
    </MuiCard>
  );
};