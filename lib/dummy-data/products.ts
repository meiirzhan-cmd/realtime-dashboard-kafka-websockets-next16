export const dummyProducts = [
  {
    id: "prod_1",
    name: "Wireless Headphones",
    description:
      "Premium noise-canceling wireless headphones with 30-hour battery life",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    stock: 50,
  },
  {
    id: "prod_2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    stock: 35,
  },
  {
    id: "prod_3",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with cherry MX switches",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80",
    stock: 100,
  },
  {
    id: "prod_4",
    name: "Ultra-Wide Monitor",
    description: "34-inch curved ultra-wide monitor with 144Hz refresh rate",
    price: 699.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    stock: 20,
  },
  {
    id: "prod_5",
    name: "Laptop Stand",
    description: "Ergonomic aluminum laptop stand with adjustable height",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    stock: 200,
  },
  {
    id: "prod_6",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    stock: 150,
  },
];

export type Product = (typeof dummyProducts)[number];
