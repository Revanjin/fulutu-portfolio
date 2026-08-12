<template>
  <div class="horizontal-line">
    <div
      v-if="!title?.length"
      class="line"
      :style="{ background: color, height: height, width: width }"
    ></div>
    <div
      v-else
      class="line"
      :style="{ background: color, height: height, width: width }"
    >
      <div class="line-title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalLine',
  props: {
    content: [Array, Object],
  },
  computed: {
    color() {
      return this.content.color;
    },
    height() {
      return this.content.height + 'px';
    },
    width() {
      return this.content.width + '%';
    },
    title() {
      return this.content.title;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.horizontal-line {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: $spacing-xxl;

  .line {
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3px;
    width: 100%;
  }

  .line-title {
    background: $fulutu-white;
    padding: 0 8px;
    font-weight: 600;
    font-size: $font-lg;
  }
}
</style>
