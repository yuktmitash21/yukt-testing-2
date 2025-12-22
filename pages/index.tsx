import Head from 'next/head';
import { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Filters, { FilterState } from '../components/Filters';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import styles from '../styles/Home.module.css';
import { products, Product } from '../data/products';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/formatting';
import { Coupon, CouponActionResult } from '../types/promo';

const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SAVE10',
    description: 'Save 10% when you spend $100 or more.',
    discountRate: 0.1,
    minimumSubtotal: 100
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping on orders over $75.',
    discountRate: 0.0,
    minimumSubtotal: 75
  },
  {
    code: 'WELCOME15',
    description: '15% off for new customers on $200+ orders.',
    discountRate: 0.15,
    minimumSubtotal: 200
  }
];

const CATEGORY_OPTIONS = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
const MIN_PRICE = Math.floor(Math.min(...products.map((product) => product.price)));
const MAX_PRICE = Math.ceil(Math.max(...products.map((product) => product.price)));

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  rating: 0,
  inStockOnly: false,
  freeShippingOnly: false,
  sortBy: 'featured'
};

const Home: NextPage = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const subtotal = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0),
    [items]
  );

  const shipping = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }
    if (subtotal >= 200) {
      return 0;
    }
    return 12.99;
  }, [items.length, subtotal]);

  const tax = useMemo(() => subtotal * 0.07, [subtotal]);

  const discount = useMemo(() => {
    if (!appliedCoupon) {
      return 0;
    }
    if (appliedCoupon.code === 'FREESHIP') {
      return subtotal >= appliedCoupon.minimumSubtotal && shipping > 0 ? shipping : 0;
    }
    if (subtotal < appliedCoupon.minimumSubtotal) {
      return 0;
    }
    return subtotal * appliedCoupon.discountRate;
  }, [appliedCoupon, shipping, subtotal]);

  const total = useMemo(() => Math.max(0, subtotal + shipping + tax - discount), [discount, shipping, subtotal, tax]);

  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minimumSubtotal) {
      setAppliedCoupon(null);
    }
  }, [appliedCoupon, subtotal]);

  const totalItemsInCart = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.quantity, 0),
    [items]
  );

  const updateFilters = useCallback((partial: Partial<FilterState>) => {
    setFilters((previous) => {
      const merged: FilterState = { ...previous, ...partial };
      merged.minPrice = Math.max(MIN_PRICE, merged.minPrice);
      merged.maxPrice = Math.min(MAX_PRICE, merged.maxPrice);
      if (merged.minPrice > merged.maxPrice) {
        if (partial.minPrice !== undefined) {
          merged.maxPrice = merged.minPrice;
        } else if (partial.maxPrice !== undefined) {
          merged.minPrice = merged.maxPrice;
        }
      }
      return merged;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchTerm('');
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product, 1);
      setIsCartOpen(true);
    },
    [addItem]
  );

  const handleApplyCoupon = useCallback(
    (code: string): CouponActionResult => {
      const normalized = code.trim().toUpperCase();
      if (!normalized) {
        return { success: false, message: 'Please enter a coupon code.' };
      }
      const coupon = AVAILABLE_COUPONS.find((candidate) => candidate.code === normalized);
      if (!coupon) {
        return { success: false, message: 'Coupon not recognized. Try SAVE10, FREESHIP, or WELCOME15.' };
      }
      if (normalized === 'FREESHIP') {
        if (subtotal < coupon.minimumSubtotal) {
          return {
            success: false,
            message: `Spend ${formatCurrency(coupon.minimumSubtotal)} or more to unlock free shipping.`
          };
        }
        setAppliedCoupon(coupon);
        return { success: true, message: 'Free shipping will be applied to your order.' };
      }
      if (subtotal < coupon.minimumSubtotal) {
        return {
          success: false,
          message: `Spend at least ${formatCurrency(coupon.minimumSubtotal)} to use this coupon.`
        };
      }
      setAppliedCoupon(coupon);
      return { success: true, message: `Coupon ${coupon.code} applied successfully.` };
    },
    [subtotal]
  );

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStockOnly || product.stock > 0;
      const matchesShipping = !filters.freeShippingOnly || product.freeShipping;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      return matchesCategory && matchesPrice && matchesRating && matchesStock && matchesShipping && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'featured':
        default:
          if (a.bestseller !== b.bestseller) {
            return Number(b.bestseller ?? false) - Number(a.bestseller ?? false);
          }
          return b.popularity - a.popularity;
      }
    });
    return sorted;
  }, [filters, searchTerm]);

  const averageRating = useMemo(() => {
    if (filteredProducts.length === 0) {
      return 0;
    }
    const totalRating = filteredProducts.reduce((accumulator, product) => accumulator + product.rating, 0);
    return totalRating / filteredProducts.length;
  }, [filteredProducts]);

  const totalInventory = useMemo(
    () => filteredProducts.reduce((accumulator, product) => accumulator + product.stock, 0),
    [filteredProducts]
  );

  return (
    <>
      <Head>
        <title>Lumina Market – Premium E-commerce Experience</title>
        <meta
          name="description"
          content="Shop curated electronics, home, beauty, and outdoor essentials with an intuitive, modern e-commerce experience."
        />
      </Head>

      <Header totalItems={totalItemsInCart} onCartToggle={() => setIsCartOpen(true)} />

      <main className={styles.main}>
        <section className={styles.hero} id="top">
          <div className={styles.heroContent}>
            <p className={styles.tagline}>New arrivals weekly · Concierge support · 2-year warranty</p>
            <h1 className={styles.heroTitle}>Discover curated products for intentional living</h1>
            <p className={styles.heroSubtitle}>
              Lumina Market brings together beautifully designed products from emerging brands with exceptional
              customer care. Explore smart tech, home essentials, wellness upgrades, and outdoor gear—all in one place.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#featured-products">
                Shop featured collections
              </a>
              <a className={styles.secondaryButton} href="#filters">
                Refine your search
              </a>
            </div>
          </div>
          <div className={styles.heroStats}>
            <div>
              <span className={styles.statValue}>{products.length}</span>
              <span className={styles.statLabel}>Curated products</span>
            </div>
            <div>
              <span className={styles.statValue}>{CATEGORY_OPTIONS.length - 1}</span>
              <span className={styles.statLabel}>Lifestyle categories</span>
            </div>
            <div>
              <span className={styles.statValue}>{formatCurrency(200)}</span>
              <span className={styles.statLabel}>Free shipping threshold</span>
            </div>
          </div>
        </section>

        <section className={styles.controls} id="filters">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filters
            categories={CATEGORY_OPTIONS}
            filters={filters}
            minPrice={MIN_PRICE}
            maxPrice={MAX_PRICE}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
          />
        </section>

        <section className={styles.statsBar} aria-live="polite">
          <p data-testid="product-count">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          </p>
          <p>
            Avg. rating: <strong>{averageRating > 0 ? averageRating.toFixed(1) : '—'}</strong> · Inventory:{' '}
            <strong>{totalInventory}</strong> units
          </p>
        </section>

        <section className={styles.productsSection} id="featured-products" aria-live="polite">
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No products match your filters yet</h2>
              <p>
                Try broadening your search, removing filters, or exploring another category to reveal more curated
                items.
              </p>
              <button className={styles.secondaryButton} type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => {
                const existingItem = items.find((item) => item.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inCartQuantity={existingItem?.quantity ?? 0}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        totals={{
          subtotal,
          shipping,
          tax,
          discount,
          total
        }}
        availableCoupons={AVAILABLE_COUPONS}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </>
  );
};

export default Home;