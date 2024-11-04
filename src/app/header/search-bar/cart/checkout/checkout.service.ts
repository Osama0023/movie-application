import { HttpClient } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { Order } from "../../../../Admin-dasboard/orders/order.model";


@Injectable({providedIn: 'root'})

export class CheckoutService {
    private orderData: any = null;

    constructor(private http: HttpClient){}

    createOrder(order: Order){
        return this.http.post<any>('http://localhost:3000/api/orders',order);
    }
    setOrder(order: any) {
        this.orderData = order;
      }
    
      getOrder() {
        return this.orderData;
      }
    
      clearOrder() {
        this.orderData = null;
      }
    
}
