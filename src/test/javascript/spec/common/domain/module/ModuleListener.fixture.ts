import { ModuleListener } from '@/common/domain/module/ModuleListener';
import sinon, { SinonStub } from 'sinon';

export interface ModuleListenerFixture extends ModuleListener {
  onAdded: SinonStub;
}

export const stubModuleListener = (): ModuleListenerFixture => ({
  onAdded: sinon.stub(),
});
