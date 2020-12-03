export interface Product {
  id: number;
  title: string;
  image: null;
  price: string;
  discount: number;
  discount_amount: number | null;
  discount_type: string;
  finalPrice: number;
  duration: number;
  features: any[];
  quantity: number;
  totalProductsPrice: number;
}
