<template>
  <div class="hero-image-container" :style="`height: ${setContainerHeight}`">
    <div class="hero-image-content">
      {{ content.headline }}
    </div>
    <div
      class="hero-slider"
      v-for="(heroItem, index) in currentContent"
      :key="index"
    >
      <div :class="['hero-image', { shifted: shifted }]">
        <img :src="heroItem.fields?.file?.url" @load="mediaIsLoaded" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HeroImage',
  props: {
    content: [Array, Object],
    shifted: Boolean,
  },
  data() {
    return {
      currentIndex: 0,
      isLoaded: false,
    };
  },
  mounted() {
    var sliderItems = document.getElementsByClassName('hero-slider');
    if (sliderItems) {
      var sliderArray = Array.from(sliderItems);

      if (sliderArray.length > 1) {
        this.intiallySetBackground(sliderArray);
        this.handleIntervalSlider = setInterval(this.autoSlide, 6000);
      }
    }
  },
  computed: {
    currentContent() {
      return this.isMobile ? this.content.mediaMobile : this.content.media;
    },
    isMobile() {
      const windowWidth = ref(window.innerWidth);

      if (windowWidth.value < 576 && !!this.content.mediaMobile) return true;
      return false;
    },
    setContainerHeight() {
      const body = document.body;
      const height = body.offsetHeight;
      const heightWithoutHeader = height - 98 + 'px';

      return heightWithoutHeader;
    },
  },
  methods: {
    mediaIsLoaded() {
      this.isLoaded = true;
    },
    autoSlide() {
      var sliderItems = document.getElementsByClassName('hero-slider');
      var sliderArray = Array.from(sliderItems);
      console.log(sliderArray);

      if (sliderArray.length > 0) {
        // reset if last item is reached
        if (this.currentIndex >= sliderArray.length) {
          sliderArray[this.currentIndex - 1].style.opacity = 0;
          this.currentIndex = 0;
        }

        if (this.currentIndex == 0 && !this.backgroundSetInitially) {
          sliderArray[this.currentIndex].style.opacity = 1;
        } else {
          sliderArray[this.currentIndex - 1]
            ? (sliderArray[this.currentIndex - 1].style.opacity = 0)
            : this.currentIndex++;

          sliderArray[this.currentIndex].style.opacity = 1;
        }

        if (this.backgroundSetInitially) this.backgroundSetInitially = false;

        this.currentIndex++;
      }
    },
    intiallySetBackground(sliderArray) {
      sliderArray[this.currentIndex].style.opacity = 1;
      this.backgroundSetInitially = true;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.hero-image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
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
    margin-bottom: 32px;
    width: 100%;
    transform: translateY(94px);
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
</style>
