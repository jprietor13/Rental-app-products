import { calculateDays, calculateTotal } from "../utils/rentalUtils";

describe("rentalUtils", () => {
  describe("calculateDays", () => {
    it("debería calcular correctamente el número de días entre dos fechas", () => {
      expect(calculateDays("2026-01-01", "2026-01-10")).toBe(9);
    });

    it("debería retornar 1 para días consecutivos", () => {
      expect(calculateDays("2026-03-01", "2026-03-02")).toBe(1);
    });

    it("debería retornar 0 para la misma fecha", () => {
      expect(calculateDays("2026-06-15", "2026-06-15")).toBe(0);
    });

    it("debería retornar un valor negativo si la fecha final es anterior a la inicial", () => {
      expect(calculateDays("2026-01-10", "2026-01-01")).toBeLessThan(0);
    });

    it("debería manejar correctamente cambios de mes", () => {
      expect(calculateDays("2026-01-28", "2026-02-03")).toBe(6);
    });
  });

  describe("calculateTotal", () => {
    it("debería calcular días * cantidad * precio", () => {
      expect(calculateTotal(5, 2, 10000)).toBe(100000);
    });

    it("debería retornar 0 si los días son 0", () => {
      expect(calculateTotal(0, 2, 10000)).toBe(0);
    });

    it("debería retornar 0 si la cantidad es 0", () => {
      expect(calculateTotal(5, 0, 10000)).toBe(0);
    });

    it("debería retornar 0 si el precio es 0", () => {
      expect(calculateTotal(5, 2, 0)).toBe(0);
    });

    it("debería manejar correctamente un día y una unidad", () => {
      expect(calculateTotal(1, 1, 185900)).toBe(185900);
    });
  });
});
