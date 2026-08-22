/* =========================
   src/routes/AppRoutes.tsx
========================= */

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppButton } from '../components/layout/WhatsAppButton';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { MarqueeBar } from '../components/layout/MarqueeBar';
import { Home } from '../pages/Home/Home';
import { Catalog } from '../pages/Catalog/Catalog';
import { ProductDetails } from '../pages/Product/ProductDetails';
import { NotFound } from '../pages/NotFound/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />
      <MarqueeBar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/catalogo"
          element={<Catalog />}
        />

        <Route
          path="/catalogo/:slug"
          element={<ProductDetails />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />

      <WhatsAppButton />

    </BrowserRouter>
  );
}