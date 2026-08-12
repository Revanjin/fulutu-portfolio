<template>
  <!--
    MAIN STACK renderer — "Daily drivers" hero cards.
    Reads:
      content.title     → section headline (e.g. "Main Stack")
      content.subtitle  → optional kicker right side ("Daily drivers")
      content.rgba      → section background tint (defaults to transparent)
      content.reference → skillItem[]
                          item.title       → card title
                          item.description → card subtitle ("Texturing &…")
                          item.icon        → asset image (44×44 square)
                          item.color       → icon-square background tint
                          (percentage / doughnut fields are ignored)
  -->
  <section
    class="skill-stack"
    :style="
      content.rgba ? `background: ${content.rgba}` : 'background: transparent'
    "
  >
    <header class="skill-stack__header">
      <h3 class="skill-stack__title">{{ content.title }}</h3>
      <span v-if="content.subtitle" class="skill-stack__kicker">{{
        content.subtitle
      }}</span>
    </header>

    <div class="skill-stack__grid">
      <article
        v-for="item in items"
        :key="item.sys.id"
        class="skill-stack__card"
      >
        <div
          class="skill-stack__glyph"
          :style="`background: ${item.fields.color || fallbackTint}`"
        >
          <img
            v-if="item?.fields?.icon"
            @contextmenu.prevent
            class="skill-stack__glyph-img"
            :src="item.fields.icon.fields?.file?.url"
            :alt="item.fields.title"
          />
          <span v-else class="skill-stack__glyph-text">
            {{ initials(item.fields.title) }}
          </span>
        </div>
        <div class="skill-stack__body">
          <div class="skill-stack__name">{{ item.fields.title }}</div>
          <div v-if="item.fields.description" class="skill-stack__desc">
            {{ item.fields.description }}
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'skill-list-main-stack',
  props: {
    content: [Array, Object],
  },
  computed: {
    items() {
      return this.content?.reference ?? [];
    },
    /**
     * If a skill item has no `color` set, fall back to a very soft white
     * tint so the glyph square still reads as a card element.
     */
    fallbackTint() {
      return 'rgba(255,255,255,0.7)';
    },
  },
  methods: {
    initials(title = '') {
      return title
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.skill-stack {
  border-radius: 8px;
  margin: 16px 0 24px;
  padding: 20px;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  &__title {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $fulutu-black;
    white-space: nowrap;
  }

  &__kicker {
    font-size: 12px;
    font-weight: 400;
    color: rgba($fulutu-grey, 0.55);
    white-space: nowrap;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    @media (min-width: $sm) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: #fbfafa;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    transition: $transition-all-ease-fast;

    &:hover {
      border-color: rgba(0, 0, 0, 0.12);
      transform: translateY(-1px);
    }
  }

  &__glyph {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    overflow: hidden;
  }

  &__glyph-img {
    max-width: 32px;
    max-height: 32px;
    width: auto;
    height: auto;
  }

  &__glyph-text {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: $fulutu-grey;
  }

  &__body {
    min-width: 0;
  }

  &__name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    color: $fulutu-black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.3;
    color: rgba($fulutu-grey, 0.6);
  }
}
</style>
