import HorizontalLine from './HorizontalLine.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Horizontal Line',
  component: HorizontalLine,
  ...contentfulStory('horizontalLine'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { HorizontalLine },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<HorizontalLine :content="fields" />',
  }),
};
