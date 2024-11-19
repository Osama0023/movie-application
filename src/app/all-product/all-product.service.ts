import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./all-product.module";
import { Observable } from "rxjs";

// export interface AuthResponseData {
//     idToken	:string
//     email:string
//     refreshToken:string
//     expiresIn:string	
//     localId: string
//     registered?: boolean
// }

@Injectable({providedIn: 'root'})

export class ProductService {
    
    constructor(private http: HttpClient){}

    getAllCategories(){
        return this.http.get('http://127.0.0.1:3000/api/categories')
     }
    //  getCategoryById(id:string){
    //      return this.http.get<Category>(`http://127.0.0.1:3000/api/categories/${id}`);
    //  }
    getAllProducts(){
        return this.http.get('http://localhost:3000/api/products')
     }


    getProductsByCategory(id: string){
        return this.http.get(`http://localhost:3000/api/products/category/${id}`)
     }
     save(categoryID: string ,category:Product){
         return this.http.post<Product>(`http://localhost:3000/api/products/${categoryID}` ,
             category
         );
     }
     delete(categoryID: string,productID:string){
         return this.http.delete(`http://localhost:3000/api/products/${productID}/${categoryID}`
         );
     }
     getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`http://yourapi.com/products/${id}`);
      }

      
            

}

