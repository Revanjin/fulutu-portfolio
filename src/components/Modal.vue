<template>
  <div class="overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-toggle" @click="closeModal" />
      <div class="modal-content">
        <Richtext :content="getModalContent?.mediaContent" />
      </div>
      <div v-if="previewImageUrl" class="modal-image-box">
        <div
          v-for="(item, index) in getModalContent?.media"
          :key="index"
          class="modal-image"
          :class="{ 'modal-image--loading': !loadedThumbs[index] }"
          :style="
            loadedThumbs[index]
              ? 'background-image: url(' + item.fields?.file?.url + '?q=20)'
              : ''
          "
          @click="openLightbox(index)"
          @contextmenu.prevent
        />
      </div>
    </div>

    <Transition name="lightbox-fade">
      <div
        v-if="lightboxIndex !== null"
        class="lightbox"
        @click.self="closeLightbox"
      >
        <div class="modal-toggle" @click="closeLightbox" />
        <button
          v-if="mediaList.length > 1"
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
          v-if="mediaList.length > 1"
          class="lightbox-arrow lightbox-arrow--next"
          @click="nextImage"
          aria-label="Next"
        >
          &#8250;
        </button>
        <div class="lightbox-counter" v-if="mediaList.length > 1">
          {{ lightboxIndex + 1 }} / {{ mediaList.length }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Richtext from './Richtext';
import LdsRoller from './LdsRoller.vue';

export default {
  name: 'modal-component',
  components: {
    Richtext,
    LdsRoller,
  },
  data() {
    return {
      lightboxIndex: null,
      lightboxLoading: false,
      loadedThumbs: {},
    };
  },
  watch: {
    getModalContent: {
      immediate: true,
      handler() {
        this.loadedThumbs = {};
        this.preloadThumbs();
      },
    },
  },
  computed: {
    ...mapGetters(['getModalContent']),

    previewImageUrl() {
      return (
        this.getModalContent?.displayImage?.fields?.file?.url ??
        this.getModalContent?.media[0]?.fields?.file?.url
      );
    },
    mediaList() {
      return this.getModalContent?.media ?? [];
    },
    lightboxUrl() {
      return this.mediaList[this.lightboxIndex]?.fields?.file?.url ?? null;
    },
  },
  methods: {
    ...mapMutations(['setModalState']),

    preloadThumbs() {
      (this.getModalContent?.media ?? []).forEach((item, index) => {
        const url = item.fields?.file?.url;
        const markLoaded = () => {
          this.loadedThumbs = { ...this.loadedThumbs, [index]: true };
        };
        if (!url) {
          markLoaded();
          return;
        }
        const img = new Image();
        img.onload = markLoaded;
        img.onerror = markLoaded;
        img.src = url + '?q=20';
      });
    },
    closeModal() {
      this.setModalState(false);
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
        (this.lightboxIndex - 1 + this.mediaList.length) %
        this.mediaList.length;
    },
    nextImage() {
      this.lightboxLoading = true;
      this.lightboxIndex = (this.lightboxIndex + 1) % this.mediaList.length;
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
  },
  unmounted() {
    window.removeEventListener('keydown', this.onKeydown);
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.modal {
  animation: appear 0.25s ease-in;
  background: $fulutu-white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  padding: 16px 16px 24px;
  left: 50%;
  top: 94px;
  transform: translateX(-50%);
  max-height: calc(100% - 94px - 66px - 24px - 16px);
  width: calc(100% - 32px);
  overflow: auto;
  border-radius: 5px;

  @media (min-width: $md) {
    flex-direction: row;
    gap: 8px;
    padding: 16px 32px 24px;
    height: fit-content;
    max-height: 50%;
    width: 70%;
    overflow: hidden;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media (min-width: $lg) {
    width: 1040px;
  }

  &-content {
    height: auto;

    @media (min-width: $md) {
      flex: 1;
      overflow: auto;
    }
  }

  &-image-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    flex: 1;
    min-height: 0;

    @media (min-width: $sm) {
      justify-content: flex-start;
    }

    @media (min-width: $md) {
      transform: translateX(0);
      max-width: 50%;
      overflow-y: auto;
    }

    img {
      cursor: pointer;
      width: 100%;
    }

    .modal-image {
      border-radius: 5px;
      cursor: pointer;
      background-size: cover;
      background-position: center;
      filter: brightness(0.8);
      height: 0;
      width: 100%;
      padding-top: 100%;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;

      &--loading {
        cursor: default;
        pointer-events: none;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba($fulutu-black, 0.06) 25%,
            rgba($fulutu-black, 0.12) 37%,
            rgba($fulutu-black, 0.06) 63%
          );
          background-size: 400% 100%;
          animation: shimmer 2.4s ease-in-out infinite;
        }
      }

      &:hover {
        filter: brightness(1);
      }
    }
  }

  &-link {
    color: $fulutu-black;
    font-weight: 600;
    text-decoration: underline;
    transition: $transition-all-ease-fast;

    &:hover {
      color: $fulutu-rose;
    }
  }

  &-toggle {
    border-radius: 5px;
    background: #fafafaaa;
    cursor: pointer;
    position: absolute;
    top: 24px;
    right: 24px;
    height: 24px;
    width: 24px;
    z-index: 1;

    &:before,
    &:after {
      content: '';
      cursor: pointer;
      background: $fulutu-black;
      position: absolute;
      left: 50%;
      top: 50%;
      transition: all 0.3s ease;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:before {
      width: 20px;
      height: 4px;
    }
    &:after {
      height: 20px;
      width: 4px;
      right: 12px;
    }

    &:hover {
      &:before {
        left: 2px;
      }
      &:after {
        left: 10px;
      }

      &:before,
      &:after {
        background: rgba($fulutu-black, 1);
        transform: translateY(-50%) rotate(225deg);
      }
    }
  }
}

.overlay {
  animation: appear 0.5s ease-in;
  background: rgba($fulutu-black, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 110;
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
    top: 0 !important;
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
