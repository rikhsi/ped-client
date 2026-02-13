/**
 * Информация о платеже.
 */
export interface PaymentInfo {
  /** Уникальный идентификатор платежа (UUID) */
  id: string;

  /** Сумма платежа */
  amount: number;

  /** Флаг, указывающий, что платеж отменен */
  isCancelled: boolean;

  /** Флаг, указывающий, что платеж оплачен */
  isPayed: boolean;

  /** Идентификатор сервиса, через который произведен платеж */
  fromService: number;

  /** Список транзакций, связанных с платежом */
  transactions: PaymentTransaction[];

  /** Детали биллинга, связанные с платежом */
  billingDetail: BillingDetail;
}

/**
 * Информация о транзакции платежа.
 */
export interface PaymentTransaction {
  /** Уникальный идентификатор транзакции (UUID) */
  id: string;

  /** Сумма, оплаченная в рамках этой транзакции */
  payedAmount: number;

  /** Дата и время оплаты в формате ISO 8601 */
  payedAt: string;
}

/**
 * Детали биллинга платежа.
 */
export interface BillingDetail {
  /** Серия документа биллинга */
  serial: string;
}
