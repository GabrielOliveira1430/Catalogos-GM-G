/* =========================
   src/pages/NotFound/NotFound.tsx
========================= */

import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="container not-found__content">

        <span className="not-found__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21 16 16" />
            <path d="M8.5 11h5" />
          </svg>
        </span>

        <span className="not-found__code">404</span>

        <h1>Página não encontrada</h1>

        <p>
          O endereço que você acessou não existe ou pode ter sido movido.
          Que tal voltar para o início ou conferir nosso catálogo de mesas?
        </p>

        <div className="not-found__actions">
          <Link to="/" className="hero__button">
            Voltar ao início
          </Link>

          <Link to="/catalogo" className="not-found__secondary-link">
            Ver catálogo
          </Link>
        </div>

      </div>
    </main>
  );
}