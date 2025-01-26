import { TextField, Button, Box, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useLoanCalculator } from "@/hooks/useLoanCalculator";
import { NumericFormat } from "react-number-format";
import { format, parse } from "date-fns";

export const LoanForm: React.FC = () => {
  const { formData, errors, handleFormChange, handleSubmit, handleClearError } =
    useLoanCalculator();
  const parsedBirthDate = formData.birthDate
    ? parse(formData.birthDate, "dd/MM/yyyy", new Date())
    : null;

  return (
    <Box
      component="form"
      noValidate
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NumericFormat
        fullWidth
        label="Valor do empréstimo (R$)"
        value={formData.loanAmount}
        onValueChange={(values) => {
          handleFormChange("loanAmount", values.value);
          handleClearError("loanAmount");
        }}
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={false}
        allowNegative={false}
        prefix="R$ "
        error={!!errors.loanAmount}
        helperText={errors.loanAmount}
      />

      <TextField
        fullWidth
        label="Prazo"
        value={formData.months}
        onChange={(e) => {
          handleFormChange("months", e.target.value);
          handleClearError("months");
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">meses</InputAdornment>,
        }}
        error={!!errors.months}
        helperText={errors.months}
      />

      <DatePicker
        label="Data de Nascimento"
        value={parsedBirthDate}
        onChange={(newValue) => {
          if (newValue) {
            const formattedDate = format(newValue, "dd/MM/yyyy");
            handleFormChange("birthDate", formattedDate);
            handleClearError("birthDate");
          } else {
            handleFormChange("birthDate", "");
          }
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.birthDate,
            helperText: errors.birthDate,
          },
        }}
      />

      <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>
        Calcular
      </Button>
    </Box>
  );
};