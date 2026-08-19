
/* =========================
   src/components/layout/Footer.tsx
========================= */

import { Link } from 'react-router-dom';
import { openWhatsApp } from '../../services/whatsapp';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">

        <div className="footer__brand">
          <span className="footer__logo">Móveis & Mesas</span>
          <p className="footer__tagline">
            Seu estilo, nossa criação.
          </p>
        </div>

        <nav
          className="footer__links"
          aria-label="Links do rodapé"
        >
          <Link to="/">Início</Link>

          <Link to="/catalogo">Catálogo</Link>

          <button
            type="button"
            onClick={() => openWhatsApp()}
          >
            WhatsApp
          </button>
        </nav>

        <div className="footer__contact">

          <a
            href="https://instagram.com/gm_oficinamesas"
            target="_blank"
            rel="noopener noreferrer"
          >
            @gm_oficinamesas
          </a>

          <a
            href="https://wa.me/5581986539622"
            target="_blank"
            rel="noopener noreferrer"
          >
            (81) 98653-9622
          </a>

          <span>
            Atendemos toda região metropolitana
          </span>

        </div>

        <p className="footer__copyright">
          © {new Date().getFullYear()} GM Oficina Mesas.
          Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}

