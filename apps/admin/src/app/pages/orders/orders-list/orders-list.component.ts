import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@markgabiana/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          (response) => {
            console.log(response);
            this.messageService.add({
              severity: 'success',
              summary: 'Order deleted!',
              detail: 'Via MessageService',
            });
            this._getOrders();
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error in deleting order!',
              detail: 'Via MessageService',
            });
          }
        );
      },
    });
  }
}
