import React from 'react';
import styles from './Filters.module.css';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  freeShippingOnly: boolean;
  sortBy: SortOption;
}

interface FiltersProps {
  categories: string[];
  filters: FilterState;
  minPrice: number;
  maxPrice: number;
  onFiltersChange: (partial: Partial<FilterState>) => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, filters, minPrice, maxPrice, onFiltersChange, onReset }) => {
  return (
    <section className={styles.filters} aria-label="Product filters">
      <div className={styles.field}>
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={filters.category}
          onChange={(event) => onFiltersChange({ category: event.target.value })}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="price-min">Price range</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            id="price-min"
            aria-label="Minimum price"
            min={minPrice}
            max={filters.maxPrice}
            value={filters.minPrice}
            onChange={(event) => onFiltersChange({ minPrice: Number(event.target.value) })}
          />
          <span className={styles.priceDivider}>–</span>
          <input
            type="number"
            id="price-max"
            aria-label="Maximum price"
            min={filters.minPrice}
            max={maxPrice}
            value={filters.maxPrice}
            onChange={(event) => onFiltersChange({ maxPrice: Number(event.target.value) })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="rating-select">Minimum rating</label>
        <select
          id="rating-select"
          value={filters.rating}
          onChange={(event) => onFiltersChange({ rating: Number(event.target.value) })}
        >
          <option value={0}>All ratings</option>
          <option value={3}>3.0+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </div>

      <div className={styles.fieldCheckbox}>
        <input
          id="stock-only"
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(event) => onFiltersChange({ inStockOnly: event.target.checked })}
        />
        <label htmlFor="stock-only">In stock only</label>
      </div>

      <div className={styles.fieldCheckbox}>
        <input
          id="free-shipping-only"
          type="checkbox"
          checked={filters.freeShippingOnly}
          onChange={(event) => onFiltersChange({ freeShippingOnly: event.target.checked })}
        />
        <label htmlFor="free-shipping-only">Free shipping</label>
      </div>

      <div className={styles.field}>
        <label htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(event) => onFiltersChange({ sortBy: event.target.value as SortOption })}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="rating-desc">Best rated</option>
          <option value="newest">Newest arrivals</option>
        </select>
      </div>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </section>
  );
};

export default Filters;