
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  originalId?: string; // Store the original UUID for database operations
}

export interface CartItem extends Product {
  quantity: number;
}
