import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@markgabiana/products'

@Component({
  selector: 'markgabiana-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

}
