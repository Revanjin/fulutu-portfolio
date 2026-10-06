import TextImage from './TextImage.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Text Image',
  component: TextImage,
  ...contentfulStory('textImage'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { TextImage },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<TextImage :content="fields" />',
  }),
};
