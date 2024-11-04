// export class OrderItem {
//     product: string;
//     quantity: number;
//   }
  
//   export class Order {
//     items: OrderItem[];
//     totalPrice: number;
//     address: string;
//     email: string;
//     name: string;
//     status?: string; // Optional for tracking state
//   }
  
export class Order {
  items: { product: string, quantity: number }[];
  totalPrice: number;
  address: string;
  email: string;
  name: string;
}
