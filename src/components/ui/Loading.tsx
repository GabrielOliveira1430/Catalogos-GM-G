/* =========================
   src/components/ui/Loading.tsx
========================= */

export function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" />
      <p>Carregando...</p>
    </div>
  );
}