import { Button, Checkbox } from "@mui/material";

interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  price,
  image,
  isSelected,
  onSelect,
  onRemove,
}: CartItemProps) => {
  return (
    <div>
      <div>
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(String(id))}
          size="small"
        />
      </div>

      <img src={image} alt={name} />

      <div>
        <p>{name}</p>
        <p>${price}</p>
      </div>

      <Button
        color="error"
        onClick={() => onRemove(String(id))}
        variant="outlined"
        size="small"
        fullWidth
      >
        Eliminar
      </Button>
    </div>
  );
};
