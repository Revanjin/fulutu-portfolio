<template>
  <div ref="masonryRoot" class="masonry-wall">
    <MasonryWall
      :items="media"
      :ssr-columns="effectiveColumns"
      :column-width="columnWidth"
      :gap="8"
    >
      <template #default="{ item, index }">
        <div
          v-if="item?.fields?.file?.url"
          class="masonry-card flex items-center justify-center"
          :class="{ 'masonry-card--loading': !loadedItems[index] }"
        >
          <img
            :src="item?.fields?.file?.url"
            @load="markLoaded(index)"
            @error="markLoaded(index)"
            @click="openLightbox(index)"
          />
        </div>
      </template>
    </MasonryWall>

    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="lightboxIndex !== null"
          class="lightbox"
          @click.self="closeLightbox"
        >
          <div class="modal-toggle" @click="closeLightbox" />
          <button
            v-if="media.length > 1"
            class="lightbox-arrow lightbox-arrow--prev"
            @click="prevImage"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <LdsRoller v-if="lightboxLoading" class="lightbox-spinner" />
          <img
            @contextmenu.prevent
            :src="lightboxUrl + '?q=60'"
            class="lightbox-img"
            :class="{ 'lightbox-img--loading': lightboxLoading }"
            :key="lightboxIndex"
            @load="lightboxLoading = false"
          />
          <button
            v-if="media.length > 1"
            class="lightbox-arrow lightbox-arrow--next"
            @click="nextImage"
            aria-label="Next"
          >
            &#8250;
          </button>
          <div class="lightbox-counter" v-if="media.length > 1">
            {{ lightboxIndex + 1 }} / {{ media.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import MasonryWall from '@yeger/vue-masonry-wall';
import LdsRoller from './LdsRoller.vue';

export default {
  name: 'text-image',
  components: {
    MasonryWall,
    LdsRoller,
  },
  props: {
    content: [Array, Object],
    isMini: Boolean,
  },
  data() {
    return {
      lightboxIndex: null,
      lightboxLoading: false,
      loadedItems: {},
      containerWidth: 0,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 576;
    },
    configuredColumns() {
      const parsed = Number.parseInt(this.content?.columns, 10);
      return [1, 2, 3].includes(parsed) ? parsed : 3;
    },
    effectiveColumns() {
      if (this.isMobile) {
        return 1;
      }

      return this.configuredColumns;
    },
    columnWidth() {
      if (this.isMini) return 140;

      const fallback = this.isMobile ? 250 : 320;
      if (!this.containerWidth) {
        return fallback;
      }

      const gap = 8;
      const totalGap = gap * (this.effectiveColumns - 1);
      const computedWidth = Math.floor(
        (this.containerWidth - totalGap) / this.effectiveColumns,
      );

      return Math.max(170, computedWidth);
    },
    media() {
      return this.isMobile && this.content?.mobileMedia
        ? this.content?.mobileMedia
        : this.content?.media;
    },
    lightboxUrl() {
      return this.media[this.lightboxIndex]?.fields?.file?.url ?? null;
    },
  },
  methods: {
    markLoaded(index) {
      this.loadedItems = { ...this.loadedItems, [index]: true };
    },
    openLightbox(index) {
      this.lightboxLoading = true;
      this.lightboxIndex = index;
    },
    closeLightbox() {
      this.lightboxIndex = null;
      this.lightboxLoading = false;
    },
    prevImage() {
      this.lightboxLoading = true;
      this.lightboxIndex =
        (this.lightboxIndex - 1 + this.media.length) % this.media.length;
    },
    nextImage() {
      this.lightboxLoading = true;
      this.lightboxIndex = (this.lightboxIndex + 1) % this.media.length;
    },
    onKeydown(e) {
      if (this.lightboxIndex === null) return;
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'Escape') this.closeLightbox();
    },
    updateContainerWidth() {
      const width = this.$refs.masonryRoot?.clientWidth ?? 0;
      this.containerWidth = width;
    },
  },
  mounted() {
    this.$nextTick(() => this.updateContainerWidth());
    window.addEventListener('resize', this.updateContainerWidth);
    window.addEventListener('keydown', this.onKeydown);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateContainerWidth);
    window.removeEventListener('keydown', this.onKeydown);
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';
.masonry-item {
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.1);
      filter: brightness(0.6);
    }
  }

  .masonry-card {
    overflow: hidden;
    border-radius: 5px;
    @include skeleton-shimmer;

    img {
      animation: appear 0.5s ease-in;
      border-radius: 5px;
      width: 100%;
      transition: all 0.33s ease;
    }
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-toggle {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;

    &:before,
    &:after {
      background-color: white;
    }
  }

  &-spinner {
    position: absolute;
    z-index: 0;
  }

  &-img {
    max-height: calc(100% - 80px);
    max-width: calc(100% - 120px);
    object-fit: contain;
    border-radius: 4px;
    animation: modalContentFadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
      forwards;
    user-select: none;
    position: relative;
    z-index: 1;

    &--loading {
      opacity: 0;
    }
  }

  &-arrow {
    background: rgba(255, 255, 255, 0.12);
    border: none;
    color: white;
    font-size: 48px;
    line-height: 1;
    cursor: pointer;
    padding: 8px 18px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: background 0.2s ease;
    z-index: 2;
    user-select: none;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    &--prev {
      left: 16px;
    }
    &--next {
      right: 16px;
    }
  }

  &-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    letter-spacing: 0.05em;
  }
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
