import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})

export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    if (this.id) {
      this.getCategory();
    }
  }

  category: Category = {
    id: '',
    name: '',
    urlHandle: ''
  };
  submitted: boolean = false;
  private sub?: Subscription = new Subscription();
  
  editCategory = this.formBuilder.group({
    Id: [''],
    Name: ['', Validators.required],
    UrlHandle: ['', Validators.required]
  });

  getCategory(): void {
    this.sub?.add(this.categoryService.getCategory(this.id).subscribe({
      next: (res) => {
        this.category = res;
        this.setCategory(this.category);
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  setCategory(category: Category): void {
    this.editCategory.controls.Id.setValue(category.id);
    this.editCategory.controls.Name.setValue(category.name);
    this.editCategory.controls.UrlHandle.setValue(category.urlHandle);
  }

  update(): void {
    this.submitted = true;
    if (this.editCategory.invalid) {
      return;
    }
    this.sub?.add(this.categoryService.updateCategory(this.editCategory.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('admin/categories');
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  delete(): void {
    this.sub?.add(this.categoryService.deleteCategory(this.editCategory.value.Id).subscribe({
      next: (res) => {
        this.router.navigateByUrl('admin/categories');
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editCategory.controls;
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
