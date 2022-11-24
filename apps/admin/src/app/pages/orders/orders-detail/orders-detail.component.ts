import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@markgabiana/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrders();
  }

  _getOrders() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.ordersService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  onStatusChange(event) {
    this.ordersService
      .updateOrder({ status: event.value.id }, this.order.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        }
      );
  }
}
