import { Checkbox } from "@mui/material";

interface CartSelectAllProps {
  isChecked: boolean;
  onChange: () => void;
}

export const CartSelectAll = ({ isChecked, onChange }: CartSelectAllProps) => {
  return (
    <div>
      <Checkbox checked={isChecked} onChange={onChange} size="small" />
      <span style={{ fontWeight: 500 }}>Seleccionar todos</span>
    </div>
  );
};
