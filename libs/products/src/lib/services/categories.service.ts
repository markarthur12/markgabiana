import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrlCategories = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategories);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.apiUrlCategories,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(
      `${this.apiUrlCategories}/${categoryId}`
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiUrlCategories}/${category.id}`,
      category
    );
  }
}
