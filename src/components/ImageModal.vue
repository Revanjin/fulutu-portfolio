<template>
  <div class="im">
    <div class="im-image" @click="openModal">
      <template v-if="previewImageUrl">
        <img :src="previewImageUrl" />
      </template>
      <template v-else>
        <img src="../assets/missing.png" />
      </template>
      <div class="im-content">
        <div class="im-headline">{{ content.title }}</div>
        <div class="im-subheadline">{{ content.subtitle }}</div>
      </div>
    </div>
    <div class="im-overlay" @click.self="closeModal">
      <div class="im-modal">
        <div class="im-modal-toggle" @click="closeModal" />
        <div class="im-modal-content">
          <Richtext :content="content.mediaContent" />
        </div>
        <div v-if="previewImageUrl" class="im-modal-image">
          <swiper
            :effect="'coverflow'"
            grabCursor
            slideToClickedSlide
            centeredSlides
            :navigation="true"
            :pagination="
              content.media.length > 1 ? { type: 'fraction' } : false
            "
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
            <swiper-slide v-for="(item, index) in content.media" :key="index">
              <img :src="item.fields?.file?.url" />
              <a
                class="im-modal-link"
                :href="item.fields?.file?.url"
                target="_blank"
                >Original</a
              >
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Richtext from './Richtext';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default {
  name: 'text-image',
  components: {
    Swiper,
    SwiperSlide,
    Richtext,
  },
  props: {
    content: [Array, Object],
  },
  setup() {
    return {
      modules: [Navigation, Pagination, EffectCoverflow],
    };
  },
  computed: {
    previewImageUrl() {
      return this.content?.media
        ? this.content.media[0]?.fields?.file?.url
        : null;
    },
  },
  methods: {
    closeModal() {
      var overlay = this.$el.querySelector('.im-overlay');
      overlay.style.display = 'none';
    },
    openModal() {
      var overlay = this.$el.querySelector('.im-overlay');
      overlay.style.display = 'block';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.im {
  margin-bottom: 24px;

  &-image {
    cursor: pointer;
    position: relative;
    overflow: hidden;

    img {
      width: calc(100% - 16px);
      max-height: 250px;
      object-fit: cover;
      transition: all 0.5s ease;

      @media (min-width: $md) {
        width: 100%;
      }
    }

    .im-content {
      background: rgba(255, 255, 255, 0.5);
      padding: 4px 8px;
      position: absolute;
      top: 16px;
      left: 16px;
      transition: left 0.6s, top 0.2s ease, font-size 0.6s ease,
        letter-spacing 0.6s;
    }

    .im-headline,
    .im-subheadline {
      color: $fulutu-white;
      letter-spacing: 0px;
      text-shadow: 2px 2px $fulutu-black;
      transition: font-size 0.25s ease, letter-spacing 0.5s;
    }

    .im-headline {
      font-size: 36px;
    }

    .im-subheadline {
      font-size: 30px;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
      .im-headline {
        font-size: 28px;
        letter-spacing: 4px;
      }
      .im-subheadline {
        font-size: 22px;
        letter-spacing: 3px;
      }
    }
  }

  &-modal {
    background: $fulutu-white;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: absolute;
    padding: 16px 16px 24px;
    left: 50%;
    top: 94px;
    transform: translateX(-50%);
    height: calc(100% - 64px);
    width: calc(100% - 32px);
    overflow: auto;

    @media (min-width: $md) {
      flex-direction: row;
      gap: 8px;
      padding: 16px 32px 24px;
      height: 450px;
      width: 850px;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    @media (min-width: $lg) {
      height: 450px;
      width: 1040px;
    }

    &-content {
      flex: 1;
      overflow: auto;
    }

    &-image {
      flex: 1;
      max-height: 100%;
      max-width: 80%;

      @media (min-width: $sm) {
        max-width: 65%;
      }

      @media (min-width: $md) {
        transform: translateX(0);
        max-width: 50%;
      }

      img {
        width: 100%;
      }

      .swiper {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &-link {
      color: $fulutu-black;
      transition: $transition-all-ease-fast;

      &:hover {
        color: $fulutu-rose;
      }
    }

    &-toggle {
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
        top: 50%;
        transition: all 0.3s ease;
        transform: translateY(-50%) rotate(45deg);
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
        &:before,
        &:after {
          background: rgba($fulutu-black, 1);
          transform: translateY(-50%) rotate(225deg);
        }
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: $fulutu-white;
      text-shadow: 4px 0px $fulutu-black;
    }
  }

  &-overlay {
    background: rgba($fulutu-black, 0.5);
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 22;
  }
}
</style>
