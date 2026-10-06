import { mapGetters } from 'vuex';
import ImageModalWrapperComponent from './ImageModalWrapperComponent.vue';
import Modal from './Modal.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Image Modal Wrapper',
  component: ImageModalWrapperComponent,
  ...contentfulStory('imageModalWrapper'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { ImageModalWrapperComponent, Modal },
    setup: () => ({ fields: loaded.entry.fields }),
    computed: mapGetters(['getModalState']),
    template: `
      <ImageModalWrapperComponent :items="fields.references" />
      <Modal v-if="getModalState" />
    `,
  }),
};
