import { AlertType } from '@/common/secondary/alert/AlertType';
import { MittAlertBus } from '@/common/secondary/alert/MittAlertBus';
import { describe, expect, it } from 'vitest';
import { stubEmitter } from '../bus/Emitter.fixture';

describe('MittAlertBus', () => {
  it('should emit success', () => {
    const emitterStub = stubEmitter();
    const mittAlertBus = new MittAlertBus(emitterStub);

    mittAlertBus.success('A message');

    const [type, message] = emitterStub.emit.getCall(0).args;
    expect(type).toBe(AlertType.SUCCESS);
    expect(message).toBe('A message');
  });

  it('should emit error', () => {
    const emitterStub = stubEmitter();
    const mittAlertBus = new MittAlertBus(emitterStub);

    mittAlertBus.error('A message');

    const [type, message] = emitterStub.emit.getCall(0).args;
    expect(type).toBe(AlertType.ERROR);
    expect(message).toBe('A message');
  });
});
