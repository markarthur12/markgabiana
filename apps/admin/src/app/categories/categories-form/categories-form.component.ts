import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@markgabiana/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'markgabiana-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    };

    this.categoryService.postCategory(category).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'New category added!',
          detail: 'Via MessageService',
        });

        timer(2000).toPromise().then(done => {
          this.back;
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Category not added!',
          detail: 'Via MessageService',
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }

  get back() {
    return this.location.back();
  }
}
