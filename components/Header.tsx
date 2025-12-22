import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  totalItems: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalItems, onCartToggle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <span className={styles.logo} aria-label="Lumina Market">
          Lumina Market
        </span>
        <nav className={styles.nav}>
          <a href="#top">Home</a>
          <a href="#featured-products">Featured</a>
          <a href="#filters">Filters</a>
          <a href="#footer">Support</a>
        </nav>
      </div>

      <div className={styles.actions}>
        <a className={styles.supportLink} href="mailto:support@luminamarket.com">
          Concierge Support
        </a>
        <button
          type="button"
          className={styles.cartButton}
          onClick={onCartToggle}
          aria-label={`Open shopping cart with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
        >
          Cart ({totalItems})
        </button>
      </div>
    </header>
  );
};

export default Header;