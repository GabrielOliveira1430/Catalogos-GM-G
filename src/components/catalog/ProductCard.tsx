/* =========================
   src/components/catalog/ProductCard.tsx
========================= */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { openWhatsApp } from '../../services/whatsapp';
import { handleImageError } from '../../utils/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const hasDimensions = product.dimensions.width > 0;
  const hasPrice = product.price > 0;

  return (
    <>
      <article className="product-card">
        <div className="product-card__image">
          <img
            src={selectedImage}
            alt={product.name}
            onClick={() => setIsZoomOpen(true)}
            onError={handleImageError}
          />
        </div>

        {product.images.length > 1 && (
          <div className="product-card__gallery">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={
                  selectedImage === image
                    ? 'gallery-thumb gallery-thumb--active'
                    : 'gallery-thumb'
                }
                onClick={() => setSelectedImage(image)}
                aria-label={`Ver foto ${index + 1} de ${product.name}`}
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

        <div className="product-card__content">
          <span className="product-card__category">
            {product.category}
          </span>

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          {hasDimensions && (
            <strong className="product-card__dimensions">
              {product.dimensions.width} × {product.dimensions.depth} ×{' '}
              {product.dimensions.height} mm
            </strong>
          )}

          {hasPrice && (
            <strong className="product-card__price">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          )}

          <div className="product-card__actions">
            <Link
              to={`/catalogo/${product.slug}`}
              className="product-card__details"
            >
              Ver detalhes
            </Link>

            <button
              type="button"
              onClick={() => openWhatsApp(product.name)}
            >
              Tenho interesse
            </button>
          </div>
        </div>
      </article>

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