import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <span
          className="product-grid__empty-icon"
          aria-hidden="true"
        >
          🔍
        </span>

        <p>Nenhuma mesa encontrada.</p>

        <span>
          Tente ajustar a busca ou o filtro selecionado.
        </span>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}