export interface CustomerType {
  CustomerName: string,
  CustomerEmail: string,
  CustomerPhone: number | null,
  CustomerPayment: number | null
}

export interface OrderType {
  OrderCategory: string,
  OrderWeight: number | null,
  OrderPetentionPeriod: number | null,
  OrderIsTransporting: boolean,
  OrderDate: string,
  OrderAddress: string
}
