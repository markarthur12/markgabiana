import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  postProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(
      this.apiUrl,
      productData
    );
  }

  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(
      `${this.apiUrl}/${productId}`
    );
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${productId}`,
      productData
    );
  }
}
