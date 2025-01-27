import { Card, PageContainer } from "@/components/ui";
import { Typography } from "@mui/material";

export default function Offline() {
  return (
    <PageContainer>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <Typography variant="h2">Você está offline</Typography>
        <Typography variant="h5">
          Para ter acesso a este recurso, verifique sua conexão e tente
          novamente.
        </Typography>
      </Card>
    </PageContainer>
  );
}
