export const calculateDays = (start: string, end: string) => {
  const d1 = new Date(start);
  const d2 = new Date(end);

  const diff = d2.getTime() - d1.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const calculateTotal = (
  days: number,
  quantity: number,
  price: number,
) => {
  return days * quantity * price;
};
