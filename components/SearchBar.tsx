import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="product-search" className={styles.label}>
        Search products
      </label>
      <input
        id="product-search"
        className={styles.input}
        type="search"
        role="searchbox"
        placeholder="Search by name, brand, or keyword…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        data-testid="product-search-input"
      />
    </div>
  );
};

export default SearchBar;