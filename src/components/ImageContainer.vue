<template>
  <div class="image-wrapper">
    <swiper
      :effect="'coverflow'"
      :grabCursor="content.media?.length > 1"
      slideToClickedSlide
      centeredSlides
      :navigation="content.media?.length > 1"
      :pagination="content.media.length > 1 ? { type: 'fraction' } : false"
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
        v-for="image in content.media"
        :class="[
          'image-item',
          {
            'image-item--multi': content.media?.length > 1,
          },
        ]"
        :key="image.sys.id"
      >
        <img :src="image.fields?.file?.url" />
      </swiper-slide>
    </swiper>
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
    content: Array,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, EffectCoverflow],
    };
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.image-wrapper {
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;

  @media (min-width: $md) {
    flex-direction: row;
  }
}

.image-item {
  &--multi {
    max-width: 350px;

    @media (min-width: $md) {
      max-width: 100%;
    }
  }

  img {
    width: 100%;
  }
}
</style>
