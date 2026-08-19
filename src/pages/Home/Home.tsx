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

      {/* HERO */}

      <section className="hero">
        <div className="container hero__content">
          <span className="hero__eyebrow">
            Móveis de qualidade
          </span>
          <h1>
            Mesas que transformam
            <br />
            seu ambiente
          </h1>
          <p>
            Encontre modelos modernos,
            elegantes e feitos para durar.
          </p>
          <Link
            to="/catalogo"
            className="hero__button"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* DIFERENCIAIS */}

      <section className="highlights">
        <div className="container highlights__grid">

          <div className="highlight">
            <span className="highlight__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.3 5 6 5c2 0 3.3 1 4 2 0.7-1 2-2 4-2 3.7 0 5.3 3.9 3.5 7.5C19 16.65 12 21 12 21Z" />
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