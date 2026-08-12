<template>
  <div
    class="image-wrapper"
    :class="{
      'image-wrapper--blueish': content.borderType === 'Blueish',
    }"
  >
    <swiper
      v-if="activeMedia?.length > 1"
      :effect="'coverflow'"
      :grabCursor="activeMedia?.length > 1"
      slideToClickedSlide
      centeredSlides
      :navigation="activeMedia?.length > 1"
      :pagination="activeMedia.length > 1 ? { type: 'fraction' } : false"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
      }"
      :modules="modules"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      }"
    >
      <swiper-slide
        v-for="image in activeMedia"
        :class="[
          'image-item',
          {
            'image-item--multi': activeMedia?.length > 1,
            'image-item--loading': !loadedSlides[image.sys.id],
          },
        ]"
        :key="image.sys.id"
      >
        <img
          @contextmenu.prevent
          :src="image.fields?.file?.url + '?q=30'"
          @load="markSlideLoaded(image.sys.id)"
          @error="markSlideLoaded(image.sys.id)"
        />
      </swiper-slide>
    </swiper>
    <span
      v-else
      class="image-single-wrap"
      :class="{
        'image-smol': content.isSmol,
        'image-single-wrap--loading': !singleLoaded,
      }"
    >
      <img
        @contextmenu.prevent
        class="image-single"
        :class="{
          'with-url': activeMedia[0]?.fields?.file?.url,
          'image-wrapper--clickable': content.redirectLink,
        }"
        :src="activeMedia[0]?.fields?.file?.url + '?q=30'"
        @click="clickHandler"
        @load="singleLoaded = true"
        @error="singleLoaded = true"
      />
    </span>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default {
  name: 'Image-Container',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    content: [Array, Object],
  },
  data() {
    return {
      loadedSlides: {},
      singleLoaded: false,
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, EffectCoverflow],
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 576;
    },
    activeMedia() {
      return this.isMobile && this.content.mediaMobile?.length
        ? this.content.mediaMobile
        : this.content.media;
    },
  },
  methods: {
    markSlideLoaded(id) {
      this.loadedSlides = { ...this.loadedSlides, [id]: true };
    },
    clickHandler() {
      if (this.content.redirectLink) {
        window.location.href = this.content.redirectLink;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.image-wrapper {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: $spacing-md;
  overflow: hidden;
  border-radius: 5px;

  @media (min-width: $md) {
    flex-direction: row;
  }

  img {
    border-radius: 5px;
  }

  &--clickable {
    cursor: pointer;
  }

  &--blueish {
    border: 8px solid #6e7ae7;
    border-radius: 20px;
    outline: 8px solid white;
    transition: all 0.3s ease;

    &:hover {
      border-color: $fulutu-blue-grey;
    }
  }

  .image-smol {
    width: 100%;

    @media (min-width: $sm) {
      width: 75%;
    }

    @media (min-width: $md) {
      width: 50%;
    }
  }
}

.image-item {
  &--multi {
    max-width: 350px;

    @media (min-width: $md) {
      max-width: 100%;
    }
  }

  @include skeleton-shimmer;

  img {
    width: 100%;
  }
}

.image-single-wrap {
  display: block;
  width: 100%;
  @include skeleton-shimmer;
}

.image-single {
  width: 100%;

  &.image-wrapper--clickable {
    transition: all 0.33s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
