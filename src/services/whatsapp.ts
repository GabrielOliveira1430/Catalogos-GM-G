/* =========================
   src/services/whatsapp.ts
========================= */

const PHONE = '5581986539622';

function openWhatsAppUrl(message: string) {
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openWhatsApp(productName?: string) {
  const message = productName
    ? `Olá! Tenho interesse na ${productName}. Gostaria de saber mais informações.`
    : 'Olá! Vim pelo site e gostaria de conhecer o catálogo de mesas da GM Oficina Mesas.';

  openWhatsAppUrl(message);
}