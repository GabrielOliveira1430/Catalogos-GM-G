/* =========================
   src/components/layout/MarqueeBar.tsx
========================= */

const ITEMS = [
  'PRODUÇÃO SOB MEDIDA',
  'ACABAMENTO IMPECÁVEL',
  'ENTREGA SEGURA',
  'PAGAMENTO NO ATO DA ENTREGA',
];

// Repete a lista várias vezes para garantir que cada
// "grupo" seja mais largo que qualquer tela, evitando
// espaço vazio antes do loop reiniciar.
const REPEATED_ITEMS = Array.from({ length: 4 }, () => ITEMS).flat();

export function MarqueeBar() {
  const content = (
    <>
      {REPEATED_ITEMS.map((item, index) => (
        <span key={`${item}-${index}`} className="marquee-bar__item">
          {item}
          <span className="marquee-bar__dot" aria-hidden="true">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="marquee-bar" role="presentation" aria-hidden="true">
      <div className="marquee-bar__track">
        <div className="marquee-bar__group">{content}</div>
        <div className="marquee-bar__group">{content}</div>
      </div>
    </div>
  );
}