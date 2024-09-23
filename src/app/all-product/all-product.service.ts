import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// export interface AuthResponseData {
//     idToken	:string
//     email:string
//     refreshToken:string
//     expiresIn:string	
//     localId: string
//     registered?: boolean
// }

@Injectable({providedIn: 'root'})

export class AllProductService {
    
    constructor(private http: HttpClient){}

    getAll(){
       return this.http.get('http://localhost:3000/api/v1/categories')
    }
}

