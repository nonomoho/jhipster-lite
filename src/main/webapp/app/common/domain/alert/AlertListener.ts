import { Alerted } from '@/common/domain/alert/Alerted';
import { Unsubscribe } from '@/common/domain/bus/Unsubscribe';

export interface AlertListener {
  onSuccess(alerted: Alerted): Unsubscribe;
  onError(alerted: Alerted): Unsubscribe;
}
