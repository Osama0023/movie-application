export class Product {
  colors:Color[];
  thumbnails:string[];
    category:Category;
    name:string;
    description:string ;
    price: number;
    _id: string; 
    // image :"/uploads/17270907147115.jpg" ;
    sale:Sale;
    // quantity:string
  }
  export class Color {
    colorName:string;
    quantity: number ;  // Either a Date object or ISO string
  }

  export class Sale {
    discountPercentage:number;
    saleEndDate: Date | string;  // Either a Date object or ISO string
  }
  export class Category {
    _id:string;
    name: string ;  // Either a Date object or ISO string
  }