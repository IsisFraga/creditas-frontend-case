import { Box } from "@mui/material";
import { SimulatorCard } from "./SimulatorCard";

export const SimulatorSection: React.FC = () => (
  <Box
    component="section"
    sx={{
      height: 480,
      width: "100%",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "4px",
      },
    }}
  >
    <SimulatorCard />
  </Box>
);
