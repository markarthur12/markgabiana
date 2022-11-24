import { User } from "@markgabiana/users";
import { OrderItem } from "./order-item";

export class Order {
    id?: string;
    orderItems?: OrderItem;
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}