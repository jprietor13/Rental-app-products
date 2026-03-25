import type { CartItem } from "../models/cart";

export const generateRentalJSON = (
  items: CartItem[],
  startDate: string,
  endDate: string,
  days: number,
  quantity: number,
) => {
  return items.map((item) => ({
    fechaInicio: startDate,
    fechaFinal: endDate,
    diasAlquiler: days,
    cantidad: quantity,
    producto: item.id,
    descripcionProducto: item.name,
    precioDia: item.price,
    precioTotal: days * quantity * item.price,
  }));
};

export const downloadJSON = <T,>(data: T) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "alquiler.json";
  a.click();
};
