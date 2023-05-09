import { CartItem } from "./cart-item";

export interface Order {
    orderId: string;
    userId: string;
    items: CartItem[];
    totalCost: number;
    date: string;
}