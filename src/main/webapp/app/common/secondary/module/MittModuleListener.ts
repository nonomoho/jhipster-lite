import { AlertMessage } from '@/common/domain/alert/AlertMessage';
import { Unsubscribe } from '@/common/domain/bus/Unsubscribe';
import { Added } from '@/common/domain/module/Added';
import { ModuleListener } from '@/common/domain/module/ModuleListener';
import { ModuleEventType } from '@/common/secondary/module/ModuleEventType';
import { Emitter, Handler } from 'mitt';

export class MittModuleListener implements ModuleListener {
  constructor(private emitter: Emitter<any>) {}

  onAdded(added: Added): Unsubscribe {
    const handler: Handler<AlertMessage> = () => added();
    this.emitter.on(ModuleEventType.ADDED, handler);
    return () => {
      this.emitter.off(ModuleEventType.ADDED, handler);
    };
  }
}
