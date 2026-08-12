<template>
  <div
    :class="{
      'text-right': alignment === 'Right',
      'text-center': alignment === 'Center',
    }"
  >
    <RichTextRenderer :document="content" />
  </div>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'RichText',
  props: {
    content: [Array, Object],
    alignment: String,
  },
  components: {
    RichTextRenderer,
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  column-gap: 32px;
  padding-left: 16px;

  li {
    flex: 0 0 33%;
    list-style: square;
    margin-right: 8px;
  }
}

a {
  color: $fulutu-blue-grey;
  transition: $transition-all-ease-fast;

  &:hover {
    color: $fulutu-rose;
  }
}

.skill-item-donut-info {
  ul {
    flex-direction: column;
  }
}
</style>
