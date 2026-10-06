import AccordionItem from './AccordionItem.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Accordion',
  component: AccordionItem,
  ...contentfulStory('accordion'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { AccordionItem },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<AccordionItem :content="fields" />',
  }),
};
