/* =========================
   src/pages/Product/ProductDetails.tsx
========================= */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { products } from '../../data/products';
import { openWhatsApp } from '../../services/whatsapp';
import { handleImageError } from '../../utils/image';
import { ProductCard } from '../../components/catalog/ProductCard';

const TRUST_BADGES = [
  {
    label: 'Alto Padrão',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-0.7 8-4 8-9V6l-8-3Z" />
      </svg>
    ),
  },
  {
    label: 'Loja Especializada',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9 12 3l9 6" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    label: 'Compra Segura',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();

  const product = products.find((item) => item.slug === slug);

  const [selectedImage, setSelectedImage] = useState(
    product?.images[0] ?? ''
  );

  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (!isZoomOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsZoomOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  if (!product) {
    return (
      <main id="main-content" className="product-details">
        <div className="container">
          <h1>Produto não encontrado</h1>
          <p>Não encontramos a mesa que você está procurando.</p>
          <Link to="/catalogo" className="hero__button" style={{ display: 'inline-block', marginTop: '25px' }}>
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 3);

  return (
    <>
      <main id="main-content" className="product-details">
        <div className="container">

          <nav className="breadcrumb" aria-label="Caminho de navegação">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/catalogo">Catálogo</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-details__grid">

            <div className="product-details__gallery">

              <div className="product-details__main-image">
                <img
                  src={selectedImage}
                  alt={product.name}
                  onClick={() => setIsZoomOpen(true)}
                  onError={handleImageError}
                />
              </div>

              {product.images.length > 1 && (
                <div className="product-details__thumbnails">

                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      className={
                        selectedImage === image
                          ? 'product-details__thumbnail product-details__thumbnail--active'
                          : 'product-details__thumbnail'
                      }
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - foto ${index + 1}`}
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            <div className="product-details__info">

              <span className="product-details__category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <p className="product-details__description">
                {product.description}
              </p>

              <div className="product-details__dimensions">
                <span>Dimensões</span>

                <strong>
                  {product.dimensions.width} ×{' '}
                  {product.dimensions.depth} ×{' '}
                  {product.dimensions.height} mm
                </strong>
              </div>

              <div className="product-details__price">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </div>

              <button
                type="button"
                className="product-details__button"
                onClick={() => openWhatsApp(product.name)}
              >
                Tenho interesse no WhatsApp
              </button>

              <ul className="trust-badges">
                {TRUST_BADGES.map((badge) => (
                  <li key={badge.label} className="trust-badges__item">
                    <span className="trust-badges__icon" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <span>{badge.label}</span>
                  </li>
                ))}
              </ul>

              <Link to="/catalogo" className="product-details__back">
                ← Voltar ao catálogo
              </Link>

            </div>

          </div>

          {relatedProducts.length > 0 && (
            <section className="related-products">
              <h2>Você também pode gostar</h2>

              <div className="product-grid">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      {isZoomOpen && (
        <div
          className="image-modal"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            type="button"
            className="image-modal__close"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Fechar imagem"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt={product.name}
            onClick={(event) => event.stopPropagation()}
            onError={handleImageError}
          />
        </div>
      )}
    </>
  );
}