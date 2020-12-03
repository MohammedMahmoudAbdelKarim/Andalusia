export interface OrderHistory {
  id?: number;
  user_id?: number;
  promo_id?: string;
  price_before?: string;
  price_after?: string;
  price_in_usd?: string;
  serials_created?: any;
  serial_group?: any;
  status?: string;
  created_at?: string;
}
