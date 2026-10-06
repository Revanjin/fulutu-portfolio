import SliderComponent from './SliderComponent.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Slider',
  component: SliderComponent,
  ...contentfulStory('sliderComponent'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { SliderComponent },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<SliderComponent :content="fields" />',
  }),
};
