/* =========================
   src/pages/Home/Home.tsx
========================= */

import { Link } from 'react-router-dom';

import { products } from '../../data/products';
import { ProductCard } from '../../components/catalog/ProductCard';

export function Home() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main id="main-content">

      {/* HERO — banner completo */}

      <section className="hero-banner">
        <Link to="/catalogo" aria-label="Ver catálogo completo">
          <img
            src="/imagens/banners/hero-banner.jpg"
            alt="GM Oficina de Mesas — Design que valoriza cada detalhe. Mesas sob medida para transformar seu ambiente."
          />
        </Link>
      </section>

      {/* DIFERENCIAIS */}

      <section className="highlights">
        <div className="container highlights__grid">

          <div className="highlight">
            <span className="highlight__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21C12 21 4 14.5 4 9.5C4 6.42 6.42 4 9.5 4C11 4 12 4.9 12 4.9C12 4.9 13 4 14.5 4C17.58 4 20 6.42 20 9.5C20 14.5 12 21 12 21Z" />
              </svg>
            </span>
            <h3>Design Exclusivo</h3>
            <p>Peças únicas que valorizam seu lar.</p>
          </div>

          <div className="highlight">
            <span className="highlight__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z" />
              </svg>
            </span>
            <h3>Produção Sob Medida</h3>
            <p>Medidas, cores e acabamentos de acordo com seu projeto.</p>
          </div>

          <div className="highlight">
            <span className="highlight__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-0.7 8-4 8-9V6l-8-3Z" />
              </svg>
            </span>
            <h3>Qualidade que se Vê</h3>
            <p>Materiais selecionados e acabamento impecável.</p>
          </div>

        </div>
      </section>

      {/* DESTAQUES */}

      {featuredProducts.length > 0 && (
        <section className="catalog">
          <div className="container">

            <header className="catalog__header">
              <span>Selecionados para você</span>
              <h2>Mesas em destaque</h2>
              <p>Os modelos mais procurados do nosso catálogo.</p>
            </header>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="catalog__cta">
              <Link to="/catalogo" className="hero__button">
                Ver catálogo completo
              </Link>
            </div>

          </div>
        </section>
      )}

    </main>
  );
}