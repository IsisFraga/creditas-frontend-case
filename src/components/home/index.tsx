"use client";

import { PageContainer } from "@/components/ui";
import { PageGrid } from "@/components/layout/PageGrid";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { SimulatorSection } from "@/components/home/SimulatorSection";
import { IllustrationSection } from "@/components/home/IllustrationSection";
import { useLoanCalculator } from "@/hooks/useLoanCalculator";
import { PageTitle } from "@/components/home/PageTitle";
import { LoanResultCard } from "@/components/loan";
import { Box } from "@mui/material";

export default function Home() {
  const {
    result
  } = useLoanCalculator();

  return (
      <PageContainer>
        <PageTitle />
        <PageGrid>
          <SplitLayout
            left={<IllustrationSection />}
            right={
              <SimulatorSection />
            }
          />
          {result.available && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <LoanResultCard {...result} />
            </Box>
          )}
        </PageGrid>
      </PageContainer>
  );
}
