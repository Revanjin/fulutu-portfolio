import SocialsComponent from './SocialsComponent.vue';
import { contentfulStory, loadSocialMedia } from '../../.storybook/contentful';

const socialsStory = contentfulStory('socialsComponent');

export default {
  title: 'Contentful/Socials',
  component: SocialsComponent,
  ...socialsStory,
  loaders: [loadSocialMedia, ...socialsStory.loaders],
};

export const Default = {
  args: { variant: 'row', compact: false },
  argTypes: {
    variant: { control: 'select', options: ['row', 'floating', 'inline'] },
  },
  render: (args, { loaded }) => ({
    components: { SocialsComponent },
    setup: () => ({ args, fields: loaded.entry.fields }),
    template:
      '<SocialsComponent :content="fields" :variant="args.variant" :compact="args.compact" />',
  }),
};
