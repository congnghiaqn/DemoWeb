import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
const baseUrl = 'http://localhost:5232/api/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  updateCategory(data: any): Observable<any> {
    return this.http.put(baseUrl, data);
  }

  getCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }
}
