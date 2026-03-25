import { Drawer, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/cartContext";

export const CartDrawer = ({ open, onClose }: any) => {
  const { state, dispatch } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const total = state.items.reduce(
    (acc: number, item: any) => acc + item.price,
    0,
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Carrito</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {state.items.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <>
            {state.items.map((item: any) => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <p>{item.name}</p>
                <p>${item.price}</p>

                <Button color="error" onClick={() => handleRemove(item.id)}>
                  Eliminar
                </Button>
              </div>
            ))}

            <Typography variant="h6">Total: ${total}</Typography>
          </>
        )}
      </div>
    </Drawer>
  );
};
