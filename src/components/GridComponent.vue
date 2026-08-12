<template>
  <div
    class="grid"
    :id="id"
    :style="{ gridTemplateColumns: `${leftRatio}fr ${rightRatio}fr` }"
  >
    <div class="left">
      <MinifiedComponentLoader :components="contentLeft" />
    </div>
    <div class="right">
      <MinifiedComponentLoader :components="contentRight" />
    </div>
  </div>
</template>

<script>
import MinifiedComponentLoader from './MinifiedComponentLoader.vue';

export default {
  name: 'Grid-Component',
  components: {
    MinifiedComponentLoader,
  },
  props: {
    id: String,
    leftRatio: Number,
    rightRatio: Number,
    contentLeft: Array,
    contentRight: Array,
  },
  created() {
    console.log(this.id);
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.grid {
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    display: grid;
  }
}

@media (max-width: 768px) {
  .left,
  .right {
    width: 100%;
  }
}
</style>
