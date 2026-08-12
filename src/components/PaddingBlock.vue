<template>
  <div :style="`padding-top: ${paddingHeight}px`"></div>
</template>

<script>
export default {
  name: 'PaddingBlock',
  props: {
    content: [Array, Object],
  },
  computed: {
    isMobile() {
      return window.innerWidth < 576;
    },
    paddingHeight() {
      return this.isMobile
        ? this.content.paddingHeightMobile
        : this.content.paddingHeight;
    },
  },
};
</script>
