import MasonryComponent from './MasonryComponent.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Masonry',
  component: MasonryComponent,
  ...contentfulStory('masonryComponent'),
};

export const Default = {
  args: { isMini: false },
  render: (args, { loaded }) => ({
    components: { MasonryComponent },
    setup: () => ({ args, fields: loaded.entry.fields }),
    template: '<MasonryComponent :content="fields" :is-mini="args.isMini" />',
  }),
};
