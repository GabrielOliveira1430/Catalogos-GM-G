/* =========================
   src/types/product.ts
========================= */

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  dimensions: ProductDimensions;
  images: string[];
  featured: boolean;
}