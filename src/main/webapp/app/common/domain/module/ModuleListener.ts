import { Unsubscribe } from '@/common/domain/bus/Unsubscribe';
import { Added } from '@/common/domain/module/Added';

export interface ModuleListener {
  onAdded(added: Added): Unsubscribe;
}
