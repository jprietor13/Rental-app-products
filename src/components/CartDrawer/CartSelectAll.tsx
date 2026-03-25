import { Checkbox } from "@mui/material";

interface CartSelectAllProps {
  isChecked: boolean;
  onChange: () => void;
}

export const CartSelectAll = ({ isChecked, onChange }: CartSelectAllProps) => {
  return (
    <div className="flex items-center gap-2 px-1 py-2">
      <Checkbox
        checked={isChecked}
        onChange={onChange}
        size="small"
        className="!text-brand-600"
      />
      <span className="text-sm font-medium text-gray-800">
        Seleccionar todos
      </span>
    </div>
  );
};
