export interface Product {
  productId: string;
  displayName: string;
  mediaUrls: string[];
  prices: {
    price: number;
  }[];
}
