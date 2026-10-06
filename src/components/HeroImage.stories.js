import HeroImage from './HeroImage.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Hero Image',
  component: HeroImage,
  ...contentfulStory('heroImage'),
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: { shifted: false },
  render: (args, { loaded }) => ({
    components: { HeroImage },
    setup: () => ({ args, fields: loaded.entry.fields }),
    template: '<HeroImage :content="fields" :shifted="args.shifted" />',
  }),
};
