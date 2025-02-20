export interface Product {
  productId: string;
  name: string;
  slug: string;
  categoryId: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  stock: number;
  attributes: Record<string, any>;
}
