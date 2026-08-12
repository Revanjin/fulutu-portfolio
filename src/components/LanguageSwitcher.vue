<template>
  <div class="nav-item nav-lang-switch">
    <div
      v-for="lang in ['de', 'en-US']"
      :key="lang"
      :class="[
        'nav-lang-switch-item',
        { 'nav-lang-switch-item--active': currentLanguage === lang },
      ]"
      @click="$emit('switch', lang)"
    >
      {{ langName(lang) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Language-Switcher',
  props: {
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  methods: {
    langName(lang) {
      return lang.toUpperCase() === 'DE' ? 'DE' : 'EN';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.nav-lang-switch {
  display: flex;
  padding: 16px 0 16px 12px;

  > div {
    cursor: pointer;
    padding: 8px;
    position: relative;
  }

  > span {
    color: $fulutu-white;
    transform: translateY(6px);

    @media (min-width: $md) {
      color: $fulutu-black;
    }
  }

  &-item {
    color: $fulutu-white;

    @media (min-width: $md) {
      color: $fulutu-black;
    }

    &--active {
      color: $fulutu-blue;
    }
  }
}
</style>
