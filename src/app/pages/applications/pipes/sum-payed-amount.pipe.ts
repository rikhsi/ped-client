import { Pipe } from '@angular/core';

@Pipe({
  name: 'sumPayedAmount',
  standalone: true,
})
export class SumPayedAmountPipe {
  transform(
    transactions: { payedAmount: number }[] | null | undefined,
  ): number {
    if (!Array.isArray(transactions)) {
      return 0;
    }

    return transactions.reduce((sum, t) => sum + Number(t.payedAmount || 0), 0);
  }
}
