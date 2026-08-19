/* =========================
   src/pages/Catalog/Catalog.tsx
========================= */

import { useMemo, useState } from 'react';

import { products } from '../../data/products';
import { ProductGrid } from '../../components/catalog/ProductGrid';
import { ProductSearch } from '../../components/catalog/ProductSearch';
import { ProductFilter } from '../../components/catalog/ProductFilter';

export function Catalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category
        ? product.category === category
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const resultLabel =
    filteredProducts.length === 1
      ? '1 mesa encontrada'
      : `${filteredProducts.length} mesas encontradas`;

  return (
    <main id="main-content">
      <section className="catalog">
        <div className="container">

          <header className="catalog__header">
            <span>Nosso catálogo</span>
            <h1>Encontre a mesa ideal</h1>
            <p>Confira nossos modelos de mesas.</p>
          </header>

          <div className="catalog__toolbar">
            <ProductSearch
              value={search}
              onChange={setSearch}
            />

            <ProductFilter
              value={category}
              categories={categories}
              onChange={setCategory}
            />
          </div>

          <p className="catalog__result-count" aria-live="polite">
            {resultLabel}
          </p>

          <ProductGrid products={filteredProducts} />

        </div>
      </section>
    </main>
  );
}