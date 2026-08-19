interface ProductFilterProps {
  value: string;
  categories: string[];
  onChange: (category: string) => void;
}

export function ProductFilter({
  value,
  categories,
  onChange,
}: ProductFilterProps) {
  return (
    <div className="product-filter">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filtrar por categoria"
      >
        <option value="">
          Todas as categorias
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}