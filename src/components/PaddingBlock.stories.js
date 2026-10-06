import PaddingBlock from './PaddingBlock.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Padding',
  component: PaddingBlock,
  ...contentfulStory('paddingComponent'),
};

// The block itself is invisible, the outline shows how much space it takes.
export const Default = {
  render: (args, { loaded }) => ({
    components: { PaddingBlock },
    setup: () => ({ fields: loaded.entry.fields }),
    template:
      '<div class="sb-outline"><PaddingBlock :content="fields" /></div>',
  }),
};
