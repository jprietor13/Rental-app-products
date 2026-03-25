import { TextField } from "@mui/material";

type AppTextFieldProps = {
  calendarEnabled: boolean;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  today: string;
};

export const AppTextField = ({
  calendarEnabled,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  quantity,
  onQuantityChange,
  today,
}: AppTextFieldProps) => {
  return (
    <div className="grid gap-3">
      <TextField
        type="date"
        label="Fecha inicio"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        disabled={!calendarEnabled}
        inputProps={{ min: today }}
        className="w-full !rounded-lg !bg-white !shadow-sm transition-all duration-300 focus-within:!shadow-soft"
      />

      <TextField
        type="date"
        label="Fecha fin"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        disabled={!calendarEnabled || !startDate}
        inputProps={{ min: startDate || today }}
        className="w-full !rounded-lg !bg-white !shadow-sm transition-all duration-300 focus-within:!shadow-soft"
      />

      {calendarEnabled && startDate && endDate ? (
        <TextField
          type="number"
          label="Cantidad"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          inputProps={{ min: 1 }}
          className="w-full !rounded-lg !bg-white !shadow-sm transition-all duration-300 focus-within:!shadow-soft"
        />
      ) : null}
    </div>
  );
};
