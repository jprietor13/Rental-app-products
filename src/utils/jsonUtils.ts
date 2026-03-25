export const generateRentalJSON = (
  items: any[],
  startDate: string,
  endDate: string,
  days: number,
) => {
  return items.map((item) => ({
    fechaInicio: startDate,
    fechaFinal: endDate,
    diasAlquiler: days,
    producto: item.id,
    descripcionProducto: item.name,
    precioDia: item.price,
  }));
};

export const downloadJSON = (data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "alquiler.json";
  a.click();
};
