import type { CartItem } from "../models/cart";

export const generateRentalJSON = (
  items: CartItem[],
  startDate: string,
  endDate: string,
  days: number,
  quantity: number,
) => {
  return items.map((item) => {
    const raw = String(item.price);
    const precioDia = Number(raw.replace(/\./g, "").replace(",", ".")) || 0;
    return {
      fechaInicio: startDate,
      fechaFinal: endDate,
      diasAlquiler: days,
      cantidad: quantity,
      producto: item.id,
      descripcionProducto: item.name,
      precioDia,
      precioTotal: days * quantity * precioDia,
    };
  });
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
