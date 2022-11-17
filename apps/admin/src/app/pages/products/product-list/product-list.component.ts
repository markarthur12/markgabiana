import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@markgabiana/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'markgabiana-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  editProduct(productId) {
    this.router.navigateByUrl(`products/new-form/${productId}`);
  }

  deleteProduct(productId) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          (response) => {
            console.log(response);
            this.messageService.add({
              severity: 'success',
              summary: 'Product deleted!',
              detail: 'Via MessageService',
            });
            this._getProducts();
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error in deleting product!',
              detail: 'Via MessageService',
            });
          }
        );
      },
    });
  }

}
