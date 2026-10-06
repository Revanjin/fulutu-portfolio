import { mapGetters } from 'vuex';
import ImageModalComponent from './ImageModalComponent.vue';
import Modal from './Modal.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Image Modal',
  component: ImageModalComponent,
  ...contentfulStory('imageModal'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { ImageModalComponent, Modal },
    setup: () => ({ fields: loaded.entry.fields }),
    computed: mapGetters(['getModalState']),
    template: `
      <ImageModalComponent :content="fields" />
      <Modal v-if="getModalState" />
    `,
  }),
};
