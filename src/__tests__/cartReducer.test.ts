import type { CartItem, CartState } from "../models/cart";
import { cartReducer, initialState } from "../context/cart/cartReducer";

const mockItem: CartItem = {
  id: "1",
  name: "Taladro",
  price: 185900,
  image: "taladro.jpg",
};

const mockItem2: CartItem = {
  id: "2",
  name: "Sierra",
  price: 250000,
  image: "sierra.jpg",
};

describe("cartReducer", () => {
  it("debería retornar el estado inicial", () => {
    expect(initialState).toEqual({ items: [] });
  });

  describe("ADD", () => {
    it("debería agregar un ítem al carrito", () => {
      const result = cartReducer(initialState, {
        type: "ADD",
        payload: mockItem,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual(mockItem);
    });

    it("no debería agregar un ítem duplicado", () => {
      const stateWithItem: CartState = { items: [mockItem] };

      const result = cartReducer(stateWithItem, {
        type: "ADD",
        payload: mockItem,
      });

      expect(result.items).toHaveLength(1);
      expect(result).toBe(stateWithItem);
    });

    it("debería agregar múltiples ítems diferentes", () => {
      const stateWithItem: CartState = { items: [mockItem] };

      const result = cartReducer(stateWithItem, {
        type: "ADD",
        payload: mockItem2,
      });

      expect(result.items).toHaveLength(2);
    });
  });

  describe("REMOVE", () => {
    it("debería eliminar un ítem por id", () => {
      const stateWithItems: CartState = { items: [mockItem, mockItem2] };

      const result = cartReducer(stateWithItems, {
        type: "REMOVE",
        payload: "1",
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe("2");
    });
  });

  describe("REMOVE_MANY", () => {
    it("debería eliminar múltiples ítems por ids", () => {
      const stateWithItems: CartState = { items: [mockItem, mockItem2] };

      const result = cartReducer(stateWithItems, {
        type: "REMOVE_MANY",
        payload: ["1", "2"],
      });

      expect(result.items).toHaveLength(0);
    });
  });

  describe("CLEAR", () => {
    it("debería vaciar el carrito", () => {
      const stateWithItems: CartState = { items: [mockItem, mockItem2] };

      const result = cartReducer(stateWithItems, { type: "CLEAR" });

      expect(result.items).toHaveLength(0);
    });
  });

  describe("SET_ITEMS", () => {
    it("debería reemplazar todos los ítems", () => {
      const result = cartReducer(initialState, {
        type: "SET_ITEMS",
        payload: [mockItem, mockItem2],
      });

      expect(result.items).toHaveLength(2);
      expect(result.items).toEqual([mockItem, mockItem2]);
    });
  });
});
