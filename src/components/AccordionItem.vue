<template>
  <div className="accordion__container">
    <div class="accordion__headline" @click="toggleContainer">
      {{ content.headline }}
      <div class="accordion__toggle" />
    </div>
    <div class="accordion__content">
      <RichTextRenderer :document="content.content" />
    </div>
  </div>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'AccordionItem',
  props: {
    content: [Array, Object],
  },
  components: {
    RichTextRenderer,
  },
  methods: {
    toggleContainer() {
      var padding = 32;
      var currentItem = this.$el.querySelector('.accordion__content');
      var currentHeight = currentItem.offsetHeight;
      var actualHeight = currentItem.scrollHeight;

      if (currentHeight <= padding) {
        currentItem.style.height = actualHeight + 'px';
      } else {
        currentItem.style.height = 0;
      }

      this.$el
        .querySelector('.accordion__toggle')
        .classList.toggle('accordion__toggle--open');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.accordion {
  &__content {
    height: 0;
    padding: 0 16px;
    position: relative;
    overflow: hidden;
    text-align: left;
    transition: all 0.4s ease;

    &:after {
      content: '';
      background: $fulutu-rose-grey;
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 100%;
    }

    * {
      color: $fulutu-black;
    }

    a {
      color: $fulutu-blue;

      &:hover {
        color: $fulutu-rose;
      }
    }
  }

  &__container {
    margin-bottom: 32px;
  }

  &__headline {
    background: $fulutu-white;
    cursor: pointer;
    font-size: $font-md;
    padding: $spacing-md;
    padding-right: $spacing-lg;
    position: relative;
    user-select: none;
    text-align: left;

    @media (min-width: $lg) {
      padding-right: $spacing-lg + $spacing-md;
    }

    &:after {
      content: '';
      background: $fulutu-rose;
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 100%;
    }
  }

  &__toggle {
    &:before,
    &:after {
      content: '';
      background: $fulutu-black;
      position: absolute;
      top: 50%;
      transition: all 0.3s ease;
      transform: translateY(-50%);
    }

    &:before {
      width: 20px;
      height: 4px;
      right: 12px;
    }
    &:after {
      height: 20px;
      width: 4px;
      right: 20px;
    }

    &--open {
      &:before {
        transform: translateY(-50%) rotate(180deg);
      }
      &:after {
        transform: translateY(-50%) rotate(270deg);
      }
    }
  }
}
</style>
