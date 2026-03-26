import type { CartItem } from "../models/cart";
import { generateRentalJSON } from "../utils/jsonUtils";

const mockItems: CartItem[] = [
  { id: "1", name: "Taladro", price: 185900, image: "taladro.jpg" },
];

const mockMultipleItems: CartItem[] = [
  { id: "1", name: "Taladro", price: 185900, image: "taladro.jpg" },
  { id: "2", name: "Sierra", price: 250000, image: "sierra.jpg" },
];

describe("generateRentalJSON", () => {
  it("debería generar la estructura JSON correcta", () => {
    const result = generateRentalJSON(mockItems, "2026-01-01", "2026-01-06", 5, 2);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("fechaInicio", "2026-01-01");
    expect(result[0]).toHaveProperty("fechaFinal", "2026-01-06");
    expect(result[0]).toHaveProperty("diasAlquiler", 5);
    expect(result[0]).toHaveProperty("cantidad", 2);
    expect(result[0]).toHaveProperty("producto", "1");
    expect(result[0]).toHaveProperty("descripcionProducto", "Taladro");
    expect(result[0]).toHaveProperty("precioDia");
    expect(result[0]).toHaveProperty("precioTotal");
  });

  it("debería interpretar correctamente los precios numéricos", () => {
    const result = generateRentalJSON(mockItems, "2026-01-01", "2026-01-06", 5, 1);

    expect(result[0].precioDia).toBe(185900);
    expect(result[0].precioTotal).toBe(5 * 1 * 185900);
  });

  it("debería manejar múltiples productos", () => {
    const result = generateRentalJSON(mockMultipleItems, "2026-01-01", "2026-01-06", 5, 2);

    expect(result).toHaveLength(2);
    expect(result[0].producto).toBe("1");
    expect(result[1].producto).toBe("2");
  });

  it("debería calcular precio total como días * cantidad * precio dia", () => {
    const result = generateRentalJSON(mockItems, "2026-01-01", "2026-01-11", 10, 3);

    expect(result[0].precioTotal).toBe(10 * 3 * result[0].precioDia);
  });

});
