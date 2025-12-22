import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/index';

beforeEach(() => {
  window.localStorage.clear();
});

describe('Lumina Market e-commerce page', () => {
  it('renders hero heading and supporting content', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { level: 1, name: /discover curated products for intentional living/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Concierge support/)).toBeInTheDocument();
  });

  it('shows the total number of products available', () => {
    render(<Home />);
    expect(screen.getByTestId('product-count')).toHaveTextContent(/Showing 12 of 12 products/);
  });

  it('filters products by search term', async () => {
    render(<Home />);
    const searchInput = screen.getByTestId('product-search-input');
    await userEvent.type(searchInput, 'drone');
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(1);
    expect(productCards[0]).toHaveTextContent(/Horizon 4K Explorer Drone/);
  });

  it('filters products by category', () => {
    render(<Home />);
    const categorySelect = screen.getByLabelText(/Category/);
    fireEvent.change(categorySelect, { target: { value: 'Home' } });
    const productNames = screen.getAllByTestId('product-name').map((node) => node.textContent);
    expect(productNames).toEqual(
      expect.arrayContaining(['Solace Memory Foam Pillow', 'Lumen Ceramic Diffuser', 'Nimbus HEPA Air Purifier'])
    );
    expect(productNames.length).toBeGreaterThanOrEqual(3);
  });

  it('filters by price range', () => {
    render(<Home />);
    const minInput = screen.getByLabelText(/Minimum price/);
    fireEvent.change(minInput, { target: { value: '200' } });
    const productNames = screen.getAllByTestId('product-name').map((node) => node.textContent?.trim());
    expect(productNames).toEqual(
      expect.arrayContaining(['Horizon 4K Explorer Drone', 'Nimbus HEPA Air Purifier', 'Momentum Smartwatch Pro'])
    );
    expect(productNames).not.toContain('Cascade Insulated Water Bottle');
  });

  it('applies rating filter correctly', () => {
    render(<Home />);
    const ratingSelect = screen.getByLabelText(/Minimum rating/);
    fireEvent.change(ratingSelect, { target: { value: '4.5' } });
    const cards = screen.getAllByTestId('product-card');
    cards.forEach((card) => {
      expect(card).toHaveTextContent(/4\.[5-9]/);
    });
  });

  it('add to cart updates cart count and drawer contents', async () => {
    render(<Home />);
    const addButtons = screen.getAllByRole('button', { name: /Add to cart/i });
    await userEvent.click(addButtons[0]);
    const cartButton = screen.getByRole('button', { name: /cart \(1\)/i });
    expect(cartButton).toBeInTheDocument();
    await userEvent.click(cartButton);
    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeVisible();
    expect(screen.getByText(/Aurora Noise-Cancelling Headphones/)).toBeInTheDocument();
  });

  it('updates item quantity inside the cart', async () => {
    render(<Home />);
    const productButton = screen.getAllByRole('button', { name: /Add to cart/i })[0];
    await userEvent.click(productButton);
    await userEvent.click(screen.getByRole('button', { name: /cart \(1\)/i }));
    const quantityInput = screen.getByLabelText(/Aurora Noise-Cancelling Headphones quantity/i);
    fireEvent.change(quantityInput, { target: { value: '2' } });
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByRole('button', { name: /cart \(2\)/i })).toBeInTheDocument();
  });

  it('removes an item from the cart', async () => {
    render(<Home />);
    const productButton = screen.getAllByRole('button', { name: /Add to cart/i })[0];
    await userEvent.click(productButton);
    await userEvent.click(screen.getByRole('button', { name: /cart \(1\)/i }));
    await userEvent.click(screen.getByRole('button', { name: /Remove/i }));
    expect(screen.getByText(/Your cart is currently empty/i)).toBeInTheDocument();
  });

  it('applies coupon code and displays discount', async () => {
    render(<Home />);
    const smartwatchButton = screen.getByText(/Momentum Smartwatch Pro/).closest('article')?.querySelector('button');
    expect(smartwatchButton).not.toBeNull();
    await userEvent.click(smartwatchButton!);
    await userEvent.click(screen.getByRole('button', { name: /cart \(1\)/i }));
    await userEvent.type(screen.getByLabelText(/Coupon code/i), 'SAVE10');
    await userEvent.click(screen.getByRole('button', { name: /Apply/i }));
    expect(screen.getByText(/Coupon SAVE10 applied successfully./i)).toBeInTheDocument();
    expect(screen.getByTestId('cart-discount')).toHaveTextContent(/-\$/);
  });

  it('grants free shipping for orders above threshold', async () => {
    render(<Home />);
    const droneButton = screen.getByText(/Horizon 4K Explorer Drone/).closest('article')?.querySelector('button');
    expect(droneButton).not.toBeNull();
    await userEvent.click(droneButton!);
    await userEvent.click(screen.getByRole('button', { name: /cart \(1\)/i }));
    expect(screen.getByTestId('cart-shipping')).toHaveTextContent(/Free/i);
  });

  it('sorts products by price high to low', () => {
    render(<Home />);
    const sortSelect = screen.getByLabelText(/Sort by/);
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });
    const cards = screen.getAllByTestId('product-card');
    const topProduct = cards[0].querySelector('[data-testid="product-name"]');
    expect(topProduct?.textContent).toMatch(/Horizon 4K Explorer Drone/);
  });

  it('filters out-of-stock items when toggle enabled', () => {
    render(<Home />);
    const inStockCheckbox = screen.getByLabelText(/In stock only/);
    fireEvent.click(inStockCheckbox);
    const productNames = screen.getAllByTestId('product-name').map((node) => node.textContent);
    expect(productNames).not.toContain('Solace Memory Foam Pillow');
  });

  it('shows empty state when no products match filters', () => {
    render(<Home />);
    fireEvent.change(screen.getByLabelText(/Minimum price/), { target: { value: '600' } });
    expect(screen.getByRole('heading', { level: 2, name: /No products match your filters yet/i })).toBeInTheDocument();
  });
});