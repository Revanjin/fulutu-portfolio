import { setup } from '@storybook/vue3-vite';
import store from '@/store';
import './preview.scss';

setup((app) => {
  app.use(store);
});

export default {
  globalTypes: {
    locale: {
      description: 'Contentful locale',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en-US', title: 'English' },
          { value: 'de', title: 'Deutsch' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'en-US',
  },
};
