import { Grid } from "@mui/material";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const SplitLayout = ({ left, right }: SplitLayoutProps) => {
  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          order: { xs: 1, md: 2 },
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {right}
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          order: { xs: 2, md: 1 },
        }}
      >
        {left}
      </Grid>
    </Grid>
  );
};
