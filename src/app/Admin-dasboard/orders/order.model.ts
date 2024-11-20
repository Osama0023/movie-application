export interface Order {
  _id?: string;
  name: string;
  email: string;
  address: string;
  totalPrice: number;
  status: string;
  items: Array<{
    product: string;
    quantity: number;
  }>;
  createdAt?: Date;
}
