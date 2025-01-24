import { Grid, GridProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

interface PageGridProps extends Omit<GridProps, 'container' | 'spacing'> {
  sx?: SxProps<Theme>;
}

export const PageGrid: React.FC<PageGridProps> = ({
  children,
  sx,
  ...props
}) => {

  return (
    <Grid
      container
      rowGap={{xs: 2}}
      sx={{
        ...sx,
      }}
      {...props}
    >
      {children}
    </Grid>
  );
};
