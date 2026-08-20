/* =========================
   src/data/products.ts
========================= */

import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'mesa-01',
    name: 'Mesa de Jantar Verona',
    slug: 'mesa-de-jantar-verona',
    category: 'jantar',
    description:
      'Mesa de jantar moderna, elegante e resistente, ideal para ambientes residenciais.',
    price: 1890,
    dimensions: {
      width: 1800,
      depth: 900,
      height: 760,
    },
    images: [
      '/imagens/mesas/mesa-01/principal.jpg',
      '/imagens/mesas/mesa-01/detalhe-01.jpg',
      '/imagens/mesas/mesa-01/detalhe-02.jpg',
    ],
    featured: true,
  },

  {
    id: 'mesa-02',
    name: 'Mesa de Jantar Milano',
    slug: 'mesa-de-jantar-milano',
    category: 'jantar',
    description:
      'Mesa com design contemporâneo e acabamento sofisticado.',
    price: 2190,
    dimensions: {
      width: 2000,
      depth: 1000,
      height: 760,
    },
    images: [
      '/imagens/mesas/mesa-02/principal.jpg',
      '/imagens/mesas/mesa-02/detalhe-01.jpg',
      '/imagens/mesas/mesa-02/detalhe-02.jpg',
    ],
    featured: true,
  },

  {
    id: 'mesa-03',
    name: 'Mesa de Centro Roma',
    slug: 'mesa-de-centro-roma',
    category: 'centro',
    description:
      'Mesa de centro elegante e funcional, perfeita para salas modernas.',
    price: 890,
    dimensions: {
      width: 1200,
      depth: 600,
      height: 400,
    },
    images: [
      '/imagens/mesas/mesa-03/principal.jpg',
      '/imagens/mesas/mesa-03/detalhe-01.jpg',
      '/imagens/mesas/mesa-03/detalhe-02.jpg',
    ],
    featured: false,
  },

  {
    id: 'mesa-04',
    name: 'Mesa Celeste',
    slug: 'mesa-celeste',
    category: 'jantar',
    description:
      'Mesa de jantar redonda com 90 cm de diâmetro. Tampo em MDF de 25 mm totalmente laqueado na cor branca, com vidro de 4 mm sobre o tampo. Base em formato cone, totalmente laqueada na cor branca, com pés reguláveis. Altura ajustável entre 75 e 77 cm.',
    price: 1500,
    dimensions: {
      width: 900,
      depth: 900,
      height: 760,
    },
    images: [
      '/imagens/mesas/mesa-04/principal.jpg',
      '/imagens/mesas/mesa-04/detalhe-01.jpg',
    ],
    featured: true,
  },
];