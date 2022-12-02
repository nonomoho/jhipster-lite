import { ModuleListener } from '@/common/domain/module/ModuleListener';
import { Statistics } from '@/common/domain/Statistics';
import { StatisticsRepository } from '@/common/domain/StatisticsRepository';
import { HeaderVue } from '@/common/primary/header';
import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import sinon, { SinonStub } from 'sinon';
import { describe, expect, it } from 'vitest';
import { wrappedElement } from '../../../WrappedElement';
import { ModuleListenerFixture, stubModuleListener } from '../../domain/module/ModuleListener.fixture';

let wrapper: VueWrapper;

export interface StatisticsRepositoryStub extends StatisticsRepository {
  get: SinonStub;
}

export const stubStatisticsRepository = (): StatisticsRepositoryStub => ({ get: sinon.stub() } as StatisticsRepositoryStub);

interface WrapperOptions {
  statistics: StatisticsRepository;
  moduleListener: ModuleListener;
}

const wrap = (options?: Partial<WrapperOptions>): void => {
  const { statistics, moduleListener }: WrapperOptions = {
    statistics: repositoryWithStatistics(),
    moduleListener: stubModuleListener(),
    ...options,
  };

  wrapper = shallowMount(HeaderVue, {
    global: {
      stubs: ['router-link'],
      provide: {
        statistics,
        moduleListener,
      },
    },
  });
};

describe('Header', () => {
  it('should exist', () => {
    wrap();

    expect(wrapper.exists()).toBe(true);
  });

  it('should load statistics', async () => {
    wrap();
    await flushPromises();

    expect(wrapper.find(wrappedElement('statistics')).exists()).toBe(true);
  });

  it('should load statistics on module added', async () => {
    const statistics = stubStatisticsRepository();
    statistics.get.onFirstCall().resolves(new Statistics(1));
    statistics.get.onSecondCall().resolves(new Statistics(2));
    await addModule(moduleListener => moduleListener.onAdded)({ statistics });

    expect(wrapper.find(wrappedElement('statistics-applied-modules-count')).text()).toBe('2');
  });

  it('should unsubscribe on before unmount', () => {
    const moduleListener = stubModuleListener();
    const unsubscribeAdded = sinon.stub();
    moduleListener.onAdded.returns(unsubscribeAdded);
    wrap({ moduleListener });

    wrapper.unmount();

    expect(unsubscribeAdded.calledOnce).toBe(true);
  });
});

const addModule =
  (listen: (moduleListener: ModuleListenerFixture) => SinonStub) =>
  async (options: Partial<WrapperOptions> = {}): Promise<void> => {
    const moduleListener = stubModuleListener();

    wrap({ moduleListener, ...options });
    await flushPromises();

    const [callback] = listen(moduleListener).getCall(0).args;
    callback();

    await wrapper.vm.$nextTick();
  };

const repositoryWithStatistics = (): StatisticsRepositoryStub => {
  const statistics = stubStatisticsRepository();
  statistics.get.resolves(new Statistics(10000));

  return statistics;
};
