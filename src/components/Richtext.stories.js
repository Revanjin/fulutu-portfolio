import RichText from './Richtext.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Text',
  component: RichText,
  ...contentfulStory('text'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { RichText },
    setup: () => ({ fields: loaded.entry.fields }),
    template:
      '<RichText :content="fields.content" :alignment="fields.alignment" />',
  }),
};
