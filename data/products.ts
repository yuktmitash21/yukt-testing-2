export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  ratingCount: number;
  stock: number;
  brand: string;
  sku: string;
  imageUrl: string;
  freeShipping: boolean;
  tags: string[];
  releaseDate: string;
  colors: string[];
  bestseller?: boolean;
  popularity: number;
}

export const products: Product[] = [
  {
    id: 'product-aurora-headphones',
    name: 'Aurora Noise-Cancelling Headphones',
    description:
      'Immersive, high-fidelity wireless headphones with adaptive ANC and 30-hour battery life. Includes a vegan leather carrying case.',
    category: 'Electronics',
    price: 199.99,
    rating: 4.7,
    ratingCount: 1264,
    stock: 24,
    brand: 'Aurora Audio',
    sku: 'AA-H1-2024',
    imageUrl: 'https://images.unsplash.com/photo-1519055548599-6e1e2c55a3ed?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['audio', 'wireless', 'bluetooth', 'travel'],
    releaseDate: '2024-03-05',
    colors: ['Graphite', 'Pearl', 'Sage'],
    bestseller: true,
    popularity: 97
  },
  {
    id: 'product-solace-pillow',
    name: 'Solace Memory Foam Pillow',
    description:
      'Ergonomic cervical support pillow with cooling gel channels and bamboo charcoal infusion for fresher sleep.',
    category: 'Home',
    price: 79.5,
    rating: 4.4,
    ratingCount: 782,
    stock: 0,
    brand: 'Solace Living',
    sku: 'SL-PILLOW-02',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    freeShipping: false,
    tags: ['sleep', 'wellness', 'bedroom'],
    releaseDate: '2023-12-12',
    colors: ['Ice Blue'],
    bestseller: false,
    popularity: 63
  },
  {
    id: 'product-momentum-smartwatch',
    name: 'Momentum Smartwatch Pro',
    description:
      'Fitness-forward smartwatch with ECG monitoring, GPS, dual-band Wi-Fi, and 10-day battery. Includes 6-month coaching app subscription.',
    category: 'Electronics',
    price: 249.0,
    rating: 4.6,
    ratingCount: 2035,
    stock: 18,
    brand: 'Momentum Labs',
    sku: 'ML-SM-08',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['fitness', 'wearable', 'health', 'smart'],
    releaseDate: '2024-02-05',
    colors: ['Obsidian', 'Sandstone'],
    bestseller: true,
    popularity: 92
  },
  {
    id: 'product-cascade-bottle',
    name: 'Cascade Insulated Water Bottle',
    description:
      'Triple-layer vacuum insulated 32oz bottle that keeps drinks cold for 48 hours. Includes straw and sip lids.',
    category: 'Outdoor',
    price: 39.5,
    rating: 4.3,
    ratingCount: 538,
    stock: 56,
    brand: 'Cascade Gear',
    sku: 'CG-BTL-32',
    imageUrl: 'https://images.unsplash.com/photo-1581579186983-74d6cc214e1b?auto=format&fit=crop&w=600&q=80',
    freeShipping: false,
    tags: ['hydration', 'travel', 'camping'],
    releaseDate: '2023-09-18',
    colors: ['Forest', 'Lagoon', 'Sunset'],
    bestseller: false,
    popularity: 74
  },
  {
    id: 'product-lumen-diffuser',
    name: 'Lumen Ceramic Diffuser',
    description:
      'Ultra-quiet aromatherapy diffuser with ambient lighting, four mist settings, and auto shut-off safety.',
    category: 'Home',
    price: 98.9,
    rating: 4.5,
    ratingCount: 612,
    stock: 32,
    brand: 'Lumen Studio',
    sku: 'LS-DIFF-04',
    imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80',
    freeShipping: false,
    tags: ['wellness', 'aromatherapy', 'minimal'],
    releaseDate: '2024-01-20',
    colors: ['Alabaster', 'Terracotta'],
    bestseller: false,
    popularity: 68
  },
  {
    id: 'product-vertex-keyboard',
    name: 'Vertex Mechanical Keyboard',
    description:
      'Hot-swappable mechanical keyboard with per-key RGB, gasket mounting, and premium PBT keycaps.',
    category: 'Electronics',
    price: 169.0,
    rating: 4.8,
    ratingCount: 987,
    stock: 15,
    brand: 'Vertex Computing',
    sku: 'VC-KB-87P',
    imageUrl: 'https://images.unsplash.com/photo-1517519014922-8fc06b814a0e?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['productivity', 'gaming', 'workspace'],
    releaseDate: '2023-11-30',
    colors: ['Midnight', 'Frost'],
    bestseller: true,
    popularity: 95
  },
  {
    id: 'product-horizon-drone',
    name: 'Horizon 4K Explorer Drone',
    description:
      'Foldable drone with 3-axis gimbal, 34-minute flight time, 4K HDR camera, and obstacle avoidance.',
    category: 'Outdoor',
    price: 529.99,
    rating: 4.6,
    ratingCount: 342,
    stock: 8,
    brand: 'Horizon Flight',
    sku: 'HF-DR-4K',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['photography', 'adventure', 'tech'],
    releaseDate: '2024-02-28',
    colors: ['Slate Grey'],
    bestseller: true,
    popularity: 88
  },
  {
    id: 'product-ember-skillet',
    name: 'Ember Cast Iron Skillet Set',
    description:
      'Pre-seasoned cast iron skillets (8, 10, 12 inch) with ergonomic handles and drip-free spouts.',
    category: 'Kitchen',
    price: 119.49,
    rating: 4.9,
    ratingCount: 1498,
    stock: 40,
    brand: 'Ember Forge',
    sku: 'EF-SK-SET3',
    imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4aa02d8d?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['cooking', 'cast iron', 'kitchen'],
    releaseDate: '2023-10-07',
    colors: ['Matte Black'],
    bestseller: true,
    popularity: 90
  },
  {
    id: 'product-pulse-charger',
    name: 'Pulse MagSafe Wireless Charger',
    description:
      '15W fast wireless charger with magnetic alignment and LED charging indicator. Includes braided USB-C cable.',
    category: 'Electronics',
    price: 59.99,
    rating: 4.2,
    ratingCount: 421,
    stock: 62,
    brand: 'Pulse Labs',
    sku: 'PL-CH-15W',
    imageUrl: 'https://images.unsplash.com/photo-1612010167100-6fff0e47f0cf?auto=format&fit=crop&w=600&q=80',
    freeShipping: false,
    tags: ['charging', 'accessory', 'mobile'],
    releaseDate: '2023-08-14',
    colors: ['Storm', 'Ivory'],
    bestseller: false,
    popularity: 71
  },
  {
    id: 'product-nimbus-purifier',
    name: 'Nimbus HEPA Air Purifier',
    description:
      'Smart HEPA filtration with air quality sensors, whisper-quiet sleep mode, and app-based scheduling.',
    category: 'Home',
    price: 299.5,
    rating: 4.7,
    ratingCount: 823,
    stock: 19,
    brand: 'Nimbus Home',
    sku: 'NH-AP-900',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['air quality', 'smart home', 'wellness'],
    releaseDate: '2024-01-05',
    colors: ['Polar White'],
    bestseller: false,
    popularity: 85
  },
  {
    id: 'product-serenity-mat',
    name: 'Serenity Cushioned Yoga Mat',
    description:
      'Eco-friendly 6mm yoga mat with slip-resistant texture, alignment markers, and carrying strap.',
    category: 'Wellness',
    price: 89.0,
    rating: 4.5,
    ratingCount: 564,
    stock: 37,
    brand: 'Serenity Studio',
    sku: 'SS-YM-06',
    imageUrl: 'https://images.unsplash.com/photo-1540202404-4d29c4a162c6?auto=format&fit=crop&w=600&q=80',
    freeShipping: false,
    tags: ['fitness', 'mindfulness', 'studio'],
    releaseDate: '2023-09-28',
    colors: ['Rose Clay', 'Deep Sea'],
    bestseller: false,
    popularity: 66
  },
  {
    id: 'product-trailblazer-backpack',
    name: 'Trailblazer 45L Hiking Backpack',
    description:
      'Lightweight hiking pack with adjustable suspension, hydration sleeve, and weatherproof ripstop exterior.',
    category: 'Outdoor',
    price: 189.95,
    rating: 4.4,
    ratingCount: 678,
    stock: 21,
    brand: 'Trailblazer',
    sku: 'TB-PK-45',
    imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
    freeShipping: true,
    tags: ['hiking', 'backpacking', 'gear'],
    releaseDate: '2023-07-22',
    colors: ['Summit Green', 'Nightfall'],
    bestseller: false,
    popularity: 82
  }
];