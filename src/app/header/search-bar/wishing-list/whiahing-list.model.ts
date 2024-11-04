export interface WishlistItem {
  _id: string; // assuming product ID is a string
  name: string;
  description: string;
  price: number;
  discountPercentage?: number; // optional if not all products have it
  image: string; // add image property to store image URL
}
