import ImageContainer from './ImageContainer.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Image',
  component: ImageContainer,
  ...contentfulStory('imageComponent'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { ImageContainer },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<ImageContainer :content="fields" />',
  }),
};
