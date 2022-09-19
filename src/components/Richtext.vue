<template>
  <RichTextRenderer :document="content" />
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'RichText',
  props: {
    content: [Array, Object],
    shifted: Boolean,
  },
  components: {
    RichTextRenderer,
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

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
