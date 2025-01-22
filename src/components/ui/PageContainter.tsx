import { Container, ContainerProps } from '@mui/material';

export interface PageContainerProps extends ContainerProps {
  narrow?: boolean;
}

export const PageContainer = ({ 
  children, 
  narrow = false,
  ...props 
}: PageContainerProps) => {
  return (
    <Container
      maxWidth={narrow ? "md" : "lg"}
      {...props}
      sx={{
        py: 4,
        ...props.sx
      }}
    >
      {children}
    </Container>
  );
};