import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/Category.model";

// export interface AuthResponseData {
//     idToken	:string
//     email:string
//     refreshToken:string
//     expiresIn:string	
//     localId: string
//     registered?: boolean
// }

@Injectable({providedIn: 'root'})

export class CategoryService {
    
    constructor(private http: HttpClient){}

    getAll(){
       return this.http.get('http://127.0.0.1:3000/api/categories')
    }
    getCategoryById(id:string){
        return this.http.get<Category>(`http://127.0.0.1:3000/api/categories/${id}`);
    }
    update(id: string, name: string) {
        console.log("id:", id);
        return this.http.put(`http://127.0.0.1:3000/api/categories/${id}`, 
            { name: name }
        );
    }
    

    save(name:string){
        return this.http.post<Category>('http://localhost:3000/api/categories' ,
            name
        );
    }
    delete(id:string){
        return this.http.delete(`http://localhost:3000/api/categories/${id}`
        );
    }

}

