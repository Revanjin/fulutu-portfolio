<template>
  <div
    :style="{ width: `${getProgressWidth}%` }"
    id="progression-bar"
    class="progression-bar"
  ></div>
</template>

<script>
export default {
  name: 'base-page',
  components: {},
  data() {
    return {
      progressWidth: 0,
      currentPosition: 1,
      pageHeight: 1,
    };
  },
  watch: {
    $route() {
      setTimeout(() => {
        const body = document.body;
        const html = document.documentElement;

        var height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );

        this.pageHeight = height - html.clientHeight;
      }, 300);
    },
  },
  mounted() {
    this.updateCurrentPosition();

    window.addEventListener('scroll', this.getWindowHeight);
    window.addEventListener('scroll', this.updateCurrentPosition);
  },
  computed: {
    getProgressWidth() {
      return (this.currentPosition / this.getPageHeight) * 100;
    },
    getPageHeight() {
      return this.pageHeight;
    },
    getCurrentPosition() {
      return this.currentPosition;
    },
  },
  methods: {
    updateCurrentPosition() {
      this.currentPosition = window.scrollY;
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.getWindowHeight);
    window.removeEventListener('scroll', this.updateYPosition);
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.progression-bar {
  width: 0%;
  position: fixed;
  height: 4px;
  background: $fulutu-blue;
  left: 0;
  top: 94px;
  z-index: 1;
}
</style>
