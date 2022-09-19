<template>
  <div class="ti">
    <div class="ti-image">
      <img :src="content.media.fields?.file?.url" @click="openModal" />
    </div>
    <div class="ti-content">
      <RichTextRenderer :document="content.content" />
    </div>
  </div>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'text-image',
  components: {
    RichTextRenderer,
  },
  props: {
    content: [Array, Object],
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.ti {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 260px;

  @media (min-width: $sm) {
    flex-direction: row;
  }

  .ti-image {
    flex: 0 0 236px;
    position: relative;

    &:after {
      content: '';
      background: white;
      position: absolute;
      height: 220px;
      width: 220px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 0;

      @media (min-width: $sm) {
        transform: none;
        left: 0;
        height: 260px;
        width: 220px;
      }
    }
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 10px;
      height: 200px;
      width: 200px;
      z-index: 1;

      @media (min-width: $sm) {
        left: 10px;
        transform: none;
      }
    }
  }

  .ti-content {
  }
}
</style>
