class AmountPayment {
  value: string;
  currency: string;
}

class ObjectPayment {
  id: string;
  status: string;
  amount: AmountPayment;
  payload_method: {
    type: string;
    id: number;
    saved: boolean;
    title: string;
    card: object;
  };
  description: string;
  created_at: string;
  expires_at: string;
}

export class PaymentStatusDto {
  event:
    | 'payment_succeeded'
    | 'payment_waiting_for_capture'
    | 'payment_cancelled'
    | 'payment_failed';
  type: string;
  object: ObjectPayment;
}
