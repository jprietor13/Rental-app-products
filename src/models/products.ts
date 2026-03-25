export interface Products {
  id: string;
  displayName: string;
  mediaUrls: string[];
  prices: {
    price: number;
  }[];
}
