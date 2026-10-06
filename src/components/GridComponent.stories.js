import GridComponent from './GridComponent.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Grid',
  component: GridComponent,
  ...contentfulStory('gridComponent'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { GridComponent },
    setup: () => ({ fields: loaded.entry.fields }),
    template: `
      <GridComponent
        :id="fields.title"
        :left-ratio="fields.leftRatio"
        :right-ratio="fields.rightRatio"
        :content-left="fields.contentLeft"
        :content-right="fields.contentRight"
      />
    `,
  }),
};
