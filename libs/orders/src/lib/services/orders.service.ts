import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.apiUrl,
      order
    );
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(
      `${this.apiUrl}/${orderId}`
    );
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(
      `${this.apiUrl}/${orderId}`,
      orderStatus
    );
  }
}
