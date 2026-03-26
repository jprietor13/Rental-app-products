import { TextField } from "@mui/material";
import type { AppTextFieldProps } from "../../models/ui";

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
        className="w-full rounded-lg! bg-white! shadow-sm! transition-all duration-300 focus-within:shadow-soft!"
      />

      <TextField
        type="date"
        label="Fecha fin"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        disabled={!calendarEnabled || !startDate}
        inputProps={{ min: startDate || today }}
        className="w-full rounded-lg! bg-white! shadow-sm! transition-all duration-300 focus-within:shadow-soft!"
      />

      {calendarEnabled && startDate && endDate ? (
        <TextField
          type="number"
          label="Cantidad"
          value={quantity || ""}
          onChange={(e) => onQuantityChange(Number(e.target.value) || 0)}
          inputProps={{ min: 1 }}
          className="w-full rounded-lg! bg-white! shadow-sm! transition-all duration-300 focus-within:shadow-soft!"
        />
      ) : null}
    </div>
  );
};
