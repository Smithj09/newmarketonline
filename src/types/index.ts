export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  total: number;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}
