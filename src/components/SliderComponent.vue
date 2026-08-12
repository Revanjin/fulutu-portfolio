<template>
  <div class="slider">
    <button
      class="slider-arrow slider-arrow--prev"
      :class="{ 'slider-arrow--hidden': atStart }"
      @click="scrollByPage(-1)"
      aria-label="Previous"
    >
      &#8249;
    </button>

    <div class="slider-track" ref="track" @scroll.passive="updateArrows">
      <div
        v-for="(item, index) in media"
        :key="item?.sys?.id ?? index"
        class="slider-card"
        :class="{ 'slider-card--loading': !loadedItems[index] }"
        :style="{ aspectRatio: aspectRatio }"
        @click="openLightbox(index)"
      >
        <img
          v-if="item?.fields?.file?.url"
          :src="thumbUrl(item)"
          :alt="item?.fields?.title ?? ''"
          loading="lazy"
          draggable="false"
          @load="markLoaded(index)"
          @error="markLoaded(index)"
        />
      </div>
    </div>

    <button
      class="slider-arrow slider-arrow--next"
      :class="{ 'slider-arrow--hidden': atEnd }"
      @click="scrollByPage(1)"
      aria-label="Next"
    >
      &#8250;
    </button>

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
import LdsRoller from './LdsRoller.vue';

export default {
  name: 'Slider-Component',
  components: {
    LdsRoller,
  },
  props: {
    content: [Array, Object],
  },
  data() {
    return {
      lightboxIndex: null,
      lightboxLoading: false,
      loadedItems: {},
      atStart: true,
      atEnd: false,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 576;
    },
    media() {
      return this.isMobile && this.content?.mobileMedia?.length
        ? this.content?.mobileMedia
        : (this.content?.media ?? []);
    },
    lightboxUrl() {
      return this.media[this.lightboxIndex]?.fields?.file?.url ?? null;
    },
    aspectRatio() {
      const ratio = this.content?.ratio;
      if (!ratio) return '3 / 4';
      const match = String(ratio).match(
        /^\s*(\d+(?:\.\d+)?)\s*[:/xX]\s*(\d+(?:\.\d+)?)\s*$/,
      );
      if (!match) return '3 / 4';
      return `${match[1]} / ${match[2]}`;
    },
  },
  methods: {
    thumbUrl(item) {
      return item?.fields?.file?.url + '?w=800&q=60&fm=webp';
    },
    markLoaded(index) {
      this.loadedItems = { ...this.loadedItems, [index]: true };
    },
    scrollByPage(direction) {
      const track = this.$refs.track;
      if (!track) return;
      track.scrollBy({
        left: direction * track.clientWidth * 0.9,
        behavior: 'smooth',
      });
    },
    updateArrows() {
      const track = this.$refs.track;
      if (!track) return;
      this.atStart = track.scrollLeft <= 4;
      this.atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
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
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
    window.addEventListener('resize', this.updateArrows);
    this.$nextTick(this.updateArrows);
  },
  unmounted() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateArrows);
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.slider {
  position: relative;

  &-track {
    display: flex;
    gap: $spacing-md;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-card {
    flex: 0 0 80%;
    scroll-snap-align: start;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    @include skeleton-shimmer;

    @media (min-width: $sm) {
      flex-basis: calc((100% - #{$spacing-md}) / 2);
    }

    @media (min-width: $lg) {
      flex-basis: calc((100% - #{$spacing-md * 2}) / 3);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: appear 0.5s ease-in;
      transition: all 0.33s ease;
      user-select: none;
    }

    &:hover img {
      transform: scale(1.1);
      filter: brightness(0.6);
    }
  }

  &-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: $fulutu-black;
    color: white;
    font-size: 28px;
    line-height: 1;
    // Font hat oben eingebauten Abstand, Glyphe optisch mittig schieben
    padding: 0 0 0.18em 0;
    cursor: pointer;
    transition: $transition-all-ease;
    user-select: none;

    &:hover {
      background: $fulutu-grey;
    }

    &--prev {
      left: 4px;

      @media (min-width: $md) {
        left: -12px;
      }
    }

    &--next {
      right: 4px;

      @media (min-width: $md) {
        right: -12px;
      }
    }

    &--hidden {
      opacity: 0;
      pointer-events: none;
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
