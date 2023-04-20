import { IPaymentResponse } from '@/types/payment.interface';

import { getContentType } from '@/api/api.helper';
import { instance } from '@/api/api.interceptor';

const PAYMENT = 'payments';

export const PaymentService = {
  async update(amount: number) {
    return instance.post<IPaymentResponse>(PAYMENT, {
      amount,
    });
  },
};
