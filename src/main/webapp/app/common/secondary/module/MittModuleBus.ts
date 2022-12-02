import { ModuleBus } from '@/common/domain/module/ModuleBus';
import { ModuleEventType } from '@/common/secondary/module/ModuleEventType';
import { Emitter } from 'mitt';

export class MittModuleBus implements ModuleBus {
  constructor(private emitter: Emitter<any>) {}

  added(): void {
    this.emitter.emit(ModuleEventType.ADDED);
  }
}
