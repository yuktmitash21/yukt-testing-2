import React from 'react';
import { Product } from '../data/products';
import { formatCurrency, formatRating } from '../utils/formatting';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  inCartQuantity: number;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, inCartQuantity }) => {
  const isOutOfStock = product.stock === 0;
  const isAtStockLimit = inCartQuantity >= product.stock && product.stock > 0;
  const addToCartDisabled = isOutOfStock || isAtStockLimit;

  return (
    <article className={styles.card} data-testid="product-card">
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        {product.bestseller && <span className={styles.badge}>Bestseller</span>}
        {product.freeShipping && <span className={styles.badgeSecondary}>Free shipping</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title} data-testid="product-name">
            {product.name}
          </h3>
          <span className={styles.brand}>{product.brand}</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.meta}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          <span className={styles.rating} aria-label={`Rated ${formatRating(product.rating)} out of five`}>
            {formatRating(product.rating)} ★ ({product.ratingCount.toLocaleString()})
          </span>
        </div>
        <div className={styles.labels}>
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.inventory}>
          <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          {inCartQuantity > 0 && (
            <span className={styles.inCart}>In cart: {inCartQuantity}</span>
          )}
        </div>
        <button
          type="button"
          className={styles.cta}
          onClick={() => onAddToCart(product)}
          disabled={addToCartDisabled}
        >
          {isOutOfStock
            ? 'Sold out'
            : isAtStockLimit
            ? 'Max in cart'
            : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;