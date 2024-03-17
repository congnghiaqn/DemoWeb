import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoryList: Category[] = [];
  private sub?: Subscription = new Subscription();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(): void {
    this.sub?.add(this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: (error) => {
        console.error(error);
      }
    }))
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
