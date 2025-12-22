import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './CartDrawer.module.css';
import { CartItem } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatting';
import { Coupon, CouponActionResult } from '../types/promo';

interface CartTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  totals: CartTotals;
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => CouponActionResult;
  onRemoveCoupon: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  totals,
  availableCoupons,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFeedbackPositive, setIsFeedbackPositive] = useState(false);

  useEffect(() => {
    if (appliedCoupon) {
      setCouponInput(appliedCoupon.code);
      setFeedback(`Coupon ${appliedCoupon.code} active.`);
      setIsFeedbackPositive(true);
    } else {
      setFeedback(null);
      setCouponInput('');
    }
  }, [appliedCoupon]);

  const subtotalLabel = useMemo(
    () => (cartItems.length > 0 ? formatCurrency(totals.subtotal) : '$0.00'),
    [cartItems.length, totals.subtotal]
  );

  const handleApply = () => {
    const result = onApplyCoupon(couponInput);
    setFeedback(result.message);
    setIsFeedbackPositive(result.success);
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setFeedback('Coupon removed.');
    setIsFeedbackPositive(false);
    setCouponInput('');
  };

  return (
    <>
      <div
        className={clsx(styles.overlay, { [styles.overlayVisible]: isOpen })}
        aria-hidden={!isOpen}
        onClick={onClose}
      />
      <aside
        className={clsx(styles.drawer, { [styles.drawerOpen]: isOpen })}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className={styles.header}>
          <h2>Shopping cart</h2>
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Close cart">
            ×
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is currently empty.</p>
            <p>Add products to review them here and checkout with confidence.</p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {cartItems.map((item) => (
                <li key={item.product.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <h3>{item.product.name}</h3>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className={styles.brand}>{item.product.brand}</p>
                  <div className={styles.itemDetails}>
                    <span>{formatCurrency(item.product.price)}</span>
                    <label htmlFor={`qty-${item.product.id}`} className={styles.quantityLabel}>
                      Quantity
                    </label>
                    <input
                      id={`qty-${item.product.id}`}
                      type="number"
                      min={0}
                      max={item.product.stock}
                      value={item.quantity}
                      aria-label={`${item.product.name} quantity`}
                      onChange={(event) => onUpdateQuantity(item.product.id, Number(event.target.value))}
                    />
                    <span className={styles.stockNote}>{item.product.stock} in stock</span>
                  </div>
                </li>
              ))}
            </ul>

            <button type="button" className={styles.clearButton} onClick={onClearCart}>
              Clear cart
            </button>
          </>
        )}

        <section className={styles.couponSection}>
          <label htmlFor="coupon-input">Coupon code</label>
          <div className={styles.couponForm}>
            <input
              id="coupon-input"
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
            />
            <button type="button" onClick={handleApply} disabled={cartItems.length === 0}>
              Apply
            </button>
            {appliedCoupon && (
              <button type="button" className={styles.removeCouponButton} onClick={handleRemoveCoupon}>
                Remove
              </button>
            )}
          </div>
          {feedback && (
            <p className={clsx(styles.feedback, isFeedbackPositive ? styles.feedbackPositive : styles.feedbackNegative)}>
              {feedback}
            </p>
          )}
          <div className={styles.couponHints}>
            <p>Try one of these:</p>
            <ul>
              {availableCoupons.map((coupon) => (
                <li key={coupon.code}>
                  <strong>{coupon.code}</strong> — {coupon.description}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span data-testid="cart-subtotal">{subtotalLabel}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span data-testid="cart-shipping">{totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Tax (7%)</span>
            <span data-testid="cart-tax">{formatCurrency(totals.tax)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Discount</span>
            <span data-testid="cart-discount">
              {totals.discount > 0 ? `–${formatCurrency(totals.discount)}` : formatCurrency(0)}
            </span>
          </div>
          <div className={clsx(styles.totalRow, styles.totalRowEmphasis)}>
            <span>Total</span>
            <span data-testid="cart-total">{formatCurrency(totals.total)}</span>
          </div>
        </section>
      </aside>
    </>
  );
};

export default CartDrawer;