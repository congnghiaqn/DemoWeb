import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})

export class AddCategoryComponent implements OnInit, OnDestroy {
  ngOnInit(): void {}

  submitted: boolean = false;
  private sub?: Subscription = new Subscription();
  
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) {}
  
  addCategory = this.formBuilder.group({
    Name: ['', Validators.required],
    UrlHandle: ['', Validators.required]
  });
  
  get f(): { [key: string]: AbstractControl } {
    return this.addCategory.controls;
  }

  create(): void {
    this.submitted = true;
    if (this.addCategory.invalid) {
      return;
    }
    this.sub?.add(this.categoryService.addCategory(this.addCategory.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('admin/categories');
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
