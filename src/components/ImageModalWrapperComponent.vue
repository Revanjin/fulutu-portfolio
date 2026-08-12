<template>
  <div class="im-wrapper">
    <ImageModalComponent
      v-for="(item, index) in items"
      :key="index"
      :content="item.fields"
    />
  </div>
</template>

<script>
import ImageModalComponent from './ImageModalComponent.vue';

export default {
  name: 'image-modal-wrapper',
  components: {
    ImageModalComponent,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.im-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 16px;

  @media (min-width: $md) {
    grid-template-columns: repeat(2, 1fr);
  }

  .im {
    margin-bottom: 16px;

    &-image {
      max-height: 180px;

      img {
        max-height: 180px;
      }
    }

    &-headline {
      font-size: 16px !important;

      @media (min-width: $md) {
        font-size: 20px !important;
      }
    }

    &-subheadline {
      font-size: 13px !important;

      @media (min-width: $md) {
        font-size: 17px !important;
      }
    }

    .im-image:hover {
      .im-headline {
        font-size: 18px !important;
        letter-spacing: 3px;
      }

      .im-subheadline {
        font-size: 14px !important;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
