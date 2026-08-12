<template>
  <div class="overlay detailed-image" @click="close">
    <div class="modal-toggle" @click="close" />
    <img @contextmenu.prevent :src="imageUrl + '?q=40'" />
    <LdsRoller />
  </div>
</template>

<script>
import LdsRoller from './LdsRoller.vue';

export default {
  name: 'modal-component',
  components: {
    LdsRoller,
  },
  props: {
    imageUrl: String,
    close: Function,
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.detailed-image {
  animation: fadeIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  img {
    animation: modalContentFadeIn 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)
      forwards;
    max-height: calc(100% - 94px - 66px);
    max-width: calc(100% - 16px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    @media (min-width: $md) {
      max-height: calc(100% - 94px - 66px - 32px);
      max-width: calc(100% - 80px);
    }
  }

  .modal-toggle:before,
  .modal-toggle:after {
    background-color: white;
  }
}
</style>
