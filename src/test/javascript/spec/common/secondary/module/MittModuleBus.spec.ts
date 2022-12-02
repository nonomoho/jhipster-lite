import { MittModuleBus } from '@/common/secondary/module/MittModuleBus';
import { ModuleEventType } from '@/common/secondary/module/ModuleEventType';
import { describe, expect, it } from 'vitest';
import { stubEmitter } from '../bus/Emitter.fixture';

describe('MittModuleBus', () => {
  it('should emit added', () => {
    const emitterStub = stubEmitter();
    const mittModuleBus = new MittModuleBus(emitterStub);

    mittModuleBus.added();

    const [type] = emitterStub.emit.getCall(0).args;
    expect(type).toBe(ModuleEventType.ADDED);
  });
});
