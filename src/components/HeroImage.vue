<template>
  <div
    :class="[
      'hero-image-container',
      { 'hero-image-container--video': mediaIsVideo },
    ]"
    :style="{ height: setContainerHeight }"
  >
    <div ref="headline" class="hero-image-content"></div>
    <template v-if="currentContent.length > 1">
      <div
        v-for="(heroItem, index) in currentContent"
        :key="index"
        class="hero-slider"
      >
        <div :class="['hero-image', { shifted: shifted }]">
          <img
            @contextmenu.prevent
            :src="heroItem.fields?.file?.url"
            @load="mediaIsLoaded"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="mediaIsVideo">
        <video
          @contextmenu.prevent
          :style="`width:${responsiveWidth}px`"
          class="hero-video"
          :src="currentContent[0]?.fields?.file?.url"
          :type="mediaContentType"
          autoplay
          loop
          muted
          @load="mediaIsLoaded"
        ></video>
      </div>
      <div v-else :class="['hero-image', { shifted: shifted }]">
        <img
          @contextmenu.prevent
          :src="currentContent[0]?.fields?.file?.url"
          @load="mediaIsLoaded"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'HeroImage',
  props: {
    content: {
      type: [Array, Object],
      required: true,
    },
    shifted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
      isLoaded: false,
      handleIntervalSlider: null,
      backgroundSetInitially: false,
      clientWidth: document.body.clientWidth,
    };
  },
  computed: {
    mediaContentType() {
      return this.currentContent[0]?.fields?.file?.contentType;
    },
    mediaIsVideo() {
      return this.mediaContentType?.includes('video');
    },
    currentContent() {
      return this.isMobile ? this.content.mediaMobile : this.content.media;
    },
    isMobile() {
      return window.innerWidth < 576 && !!this.content.mediaMobile;
    },
    setContainerHeight() {
      return `${document.body.offsetHeight - 66}px`;
    },
    responsiveWidth() {
      if (this.clientWidth < 1920) return 1920;

      return this.clientWidth;
    },
  },
  methods: {
    mediaIsLoaded() {
      this.isLoaded = true;
    },
    autoSlide() {
      const sliderCount = this.currentContent.length;

      if (this.currentIndex >= sliderCount - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    animateHeadline() {
      const el = this.$refs.headline;
      if (!el || !this.content.headline) return;
      el.innerHTML = this.content.headline
        .split(' ')
        .map((word) => {
          const chars = word
            .split('')
            .map((char) => `<span style="display:inline-block">${char}</span>`)
            .join('');
          return `<span style="display:inline-block;white-space:nowrap">${chars}</span>`;
        })
        .join('<span style="display:inline-block;white-space:pre"> </span>');
      gsap.from(el.querySelectorAll('span > span'), {
        opacity: 0,
        y: 24,
        rotateX: -80,
        transformOrigin: '50% 100%',
        stagger: 0.045,
        duration: 0.65,
        ease: 'back.out(1.4)',
        delay: 0.4,
      });
    },
    initBackground() {
      this.backgroundSetInitially = true;
    },
    updateWidth() {
      this.clientWidth = document.body.clientWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth);
    this.animateHeadline();
    if (this.currentContent && this.currentContent.length > 1) {
      this.initBackground();
      this.handleIntervalSlider = setInterval(this.autoSlide, 6000);
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.updateWidth);
    clearInterval(this.handleIntervalSlider);
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.hero-video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.hero-image {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  user-select: none;

  &.shifted:after {
    content: '';
    height: 50%;
    width: 100%;
    position: absolute;
    background: $fulutu-white;
    left: 0;
    top: 50%;
  }

  img,
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center 0;
    z-index: 0;
    animation: appear 1s ease;
  }

  &-container {
    position: relative;
    height: calc(100vh - 96px);
    width: 100%;
    transform: translateY(94px);

    &--video {
      overflow: hidden;
    }
  }

  &-content {
    background: rgba($fulutu-white, 0.8);
    color: black;
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    height: fit-content;
    width: 230px;
    text-align: center;
    padding: 16px 8px;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}

.hero-slider {
  transition: all 0.3s ease;
}
</style>
