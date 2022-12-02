import { Unsubscribe } from '@/common/domain/bus/Unsubscribe';
import { ModuleListener } from '@/common/domain/module/ModuleListener';
import { defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { IconVue } from '@/common/primary/icon';
import { Statistics } from '@/common/domain/Statistics';
import { Loader } from '@/loader/primary/Loader';
import { StatisticsRepository } from '@/common/domain/StatisticsRepository';

export default defineComponent({
  name: 'Header',

  components: {
    IconVue,
  },

  setup() {
    const selectorPrefix = 'header';
    const moduleListener = inject('moduleListener') as ModuleListener;
    const statisticsRepository = inject('statistics') as StatisticsRepository;
    const statistics = ref(Loader.loading<Statistics>());

    let unsubscribeAddedModuleBus!: Unsubscribe;

    onMounted(() => {
      loadStatistics();
      unsubscribeAddedModuleBus = moduleListener.onAdded(loadStatistics);
    });

    onBeforeUnmount(() => {
      unsubscribeAddedModuleBus();
    });

    const loadStatistics = (): void => {
      statisticsRepository.get().then(response => {
        statistics.value.loaded(response);
      });
    };

    const appliedModulesCount = (): number => {
      return statistics.value.value().get();
    };

    return {
      selectorPrefix,
      statistics,
      appliedModulesCount,
    };
  },
});
