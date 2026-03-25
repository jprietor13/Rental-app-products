import { TextField } from "@mui/material";

type AppTextFieldProps = {
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  today: string;
};

export const AppTextField = ({
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  quantity,
  onQuantityChange,
  today,
}: AppTextFieldProps) => {
  return (
    <>
      <TextField
        type="date"
        label="Fecha inicio"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        inputProps={{ min: today }}
      />

      <TextField
        type="date"
        label="Fecha fin"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        disabled={!startDate}
        inputProps={{ min: startDate || today }}
      />

      {startDate && endDate && (
        <TextField
          type="number"
          label="Cantidad"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          inputProps={{ min: 1 }}
        />
      )}
    </>
  );
};
