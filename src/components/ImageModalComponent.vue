<template>
  <div
    class="im"
    role="button"
    tabindex="0"
    :aria-label="content.title"
    @click="openModal"
    @keydown.enter="openModal"
  >
    <div class="im-img" :class="{ 'im-img--loading': !imgLoaded }">
      <img
        v-if="previewImageUrl"
        @contextmenu.prevent
        :src="previewImageUrl + '?q=20'"
        :class="{ 'im-img__el--loading': !imgLoaded }"
        @load="imgLoaded = true"
        @error="imgLoaded = true"
      />
      <img
        v-else
        @contextmenu.prevent
        :src="missingImg"
        :class="{ 'im-img__el--loading': !imgLoaded }"
        @load="imgLoaded = true"
        @error="imgLoaded = true"
      />
    </div>
    <div
      class="im-line"
      :style="
        content.backgroundColor
          ? { backgroundColor: content.backgroundColor }
          : {}
      "
    ></div>
    <div class="im-text">
      <div class="im-headline" v-html="content.title"></div>
      <div class="im-subheadline" v-html="content.subtitle"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import missingImg from '../assets/missing.png';

export default {
  name: 'image-modal-component',
  props: {
    content: [Array, Object],
  },
  data() {
    return { missingImg, imgLoaded: false };
  },
  computed: {
    ...mapGetters(['getModalState']),
    previewImageUrl() {
      return (
        this.content?.displayImage?.fields?.file?.url ??
        this.content.media[0]?.fields?.file?.url
      );
    },
  },
  methods: {
    ...mapMutations(['setModalContent', 'setModalState']),
    openModal() {
      this.setModalContent(this.content);
      this.setModalState(true);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.im {
  animation: appear 0.25s ease-in;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 120px;

  &-line {
    width: 8px;
    margin-left: 40%;
  }

  &-text {
    background-color: #fafafa;
    border-radius: 0 8px 8px 0;
    position: relative;
    z-index: 1;
    padding: 12px 16px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    transition: background 0.5s ease;

    &::after {
      content: '\203A';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 28px;
      color: rgba($fulutu-black, 0.25);

      @media (min-width: $md) {
        display: none;
      }
    }
  }

  &-headline {
    color: $fulutu-black;
    font-size: 18px;
    font-weight: 700;
    transition: letter-spacing 0.4s ease;
    margin-bottom: 8px;

    @media (min-width: $md) {
      font-size: 20px;
    }
  }

  &-subheadline {
    color: rgba($fulutu-black, 0.85);
    font-size: 13px;

    @media (min-width: $md) {
      font-size: 15px;
    }
  }

  &-img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40%;
    z-index: 2;
    overflow: hidden;
    transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);

    &--loading::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      background: linear-gradient(
        90deg,
        rgba($fulutu-black, 0.06) 25%,
        rgba($fulutu-black, 0.12) 37%,
        rgba($fulutu-black, 0.06) 63%
      );
      background-size: 400% 100%;
      animation: shimmer 2.4s ease-in-out infinite;
    }

    img {
      border-radius: 8px 0 0 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      position: relative;
      z-index: 1;
      transition:
        transform 0.55s ease,
        filter 0.35s ease,
        opacity 0.4s ease;
      display: block;

      &.im-img__el--loading {
        opacity: 0;
      }
    }
  }

  &:hover {
    @media (min-width: $md) {
      .im-img {
        width: 100%;

        img {
          transform: scale(1.04);
          filter: brightness(0.75);
        }
      }
    }
  }
}
</style>
