import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Product,
  ProductsService,
} from '@markgabiana/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'markgabiana-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  color: string;
  categories = [];
  imageDisplay: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      countInStock: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.postProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'New product added!',
          detail: `Product ${product.name} is created!`,
        });

        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back;
          });
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Product not added!',
          detail: 'Via MessageService',
        });
      },
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }

  private _updateProduct(productData: FormData) {
    this.productsService.updateProduct(productData, this.currentProductId).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Product successfully updated!',
          detail: 'Via MessageService',
        });

        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back;
          });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Product not updated!',
          detail: 'Via MessageService',
        });
      }
    );
  }

  get productForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData)
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    return this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
  }
}
