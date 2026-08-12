<template>
  <div class="ti" :class="{ 'ti--right': content.imageRight }">
    <div class="ti-image" :class="{ 'ti-image--loading': !imgLoaded }">
      <img
        @contextmenu.prevent
        :src="activeMedia?.fields?.file?.url"
        @click="openModal"
        @load="imgLoaded = true"
        @error="imgLoaded = true"
      />
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
  data() {
    return {
      imgLoaded: false,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 576;
    },
    activeMedia() {
      return this.isMobile && this.content.mediaMobile
        ? this.content.mediaMobile
        : this.content.media;
    },
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

    &--right {
      flex-direction: row-reverse;
    }
  }

  .ti-image {
    animation: appear 0.25s ease-in;
    flex: 0 0 236px;
    position: relative;
    @include skeleton-shimmer;

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
    flex: 1;
  }
}
</style>
