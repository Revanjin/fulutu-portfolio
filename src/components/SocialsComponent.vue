<template>
  <div
    v-if="socialLinks.length"
    class="socials"
    :class="[`socials--${variant}`, { 'socials--compact': compact }]"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url || link.title || link.image"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="socials__link"
      :aria-label="link.title || 'Social link'"
    >
      <img
        v-if="link.image"
        :src="link.image"
        :alt="link.title || 'Social icon'"
        draggable="false"
        @contextmenu.prevent
      />
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Socials-Component',
  props: {
    variant: {
      type: String,
      default: 'row',
      validator: (value) => ['row', 'floating', 'inline'].includes(value),
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['getSocialMedia']),
    socialLinks() {
      return (
        this.getSocialMedia?.[0]?.fields?.reference?.map((item) => ({
          url: item.fields?.url,
          image: item.fields?.image?.fields?.file?.url,
          title: item.fields?.title ?? '',
        })) ?? []
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  background: $fulutu-black;

  &--row {
    width: 100%;
    padding: 12px 0;
    margin: 12px 0;
  }

  &--floating {
    gap: 12px;
  }

  &--inline {
    gap: 10px;
    justify-content: flex-start;
  }

  &--compact {
    gap: 10px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    opacity: 0.9;

    &:hover {
      transform: translateY(-1px);
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: invert(1);
      user-select: none;
      pointer-events: none;
    }
  }
}
</style>
