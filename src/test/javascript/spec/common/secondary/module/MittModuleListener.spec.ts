import { MittModuleListener } from '@/common/secondary/module/MittModuleListener';
import { ModuleEventType } from '@/common/secondary/module/ModuleEventType';
import mitt from 'mitt';
import sinon from 'sinon';
import { describe, expect, it } from 'vitest';

describe('MittModuleListener', () => {
  it('should listen module added event', () => {
    const spyAdded = sinon.spy();
    const emitter = mitt();
    const mittModuleListener = new MittModuleListener(emitter);
    mittModuleListener.onAdded(spyAdded);

    emitter.emit(ModuleEventType.ADDED);

    expect(spyAdded.called).toBe(true);
  });

  it('should unsubscribe added', () => {
    const spyAdded = sinon.spy();
    const emitter = mitt();
    const mittModuleListener = new MittModuleListener(emitter);
    const unsubscribe = mittModuleListener.onAdded(spyAdded);

    emitter.emit(ModuleEventType.ADDED);
    emitter.emit(ModuleEventType.ADDED);
    unsubscribe();
    emitter.emit(ModuleEventType.ADDED);
    emitter.emit(ModuleEventType.ADDED);

    expect(spyAdded.callCount).toBe(2);
  });
});
