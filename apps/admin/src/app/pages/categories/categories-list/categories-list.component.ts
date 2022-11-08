import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@markgabiana/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'markgabiana-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response) => {
            console.log(response);
            this.messageService.add({
              severity: 'success',
              summary: 'Category deleted!',
              detail: 'Via MessageService',
            });
            this._getCategories();
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error in deleting category!',
              detail: 'Via MessageService',
            });
          }
        );
      },
    });
  }

  editCategory(categoryId) {
    this.router.navigateByUrl(`categories/new-form/${categoryId}`);
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
