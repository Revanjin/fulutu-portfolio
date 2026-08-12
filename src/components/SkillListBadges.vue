<template>
  <!--
    BADGES renderer — flat list of pills.
    Used for both `badges` (solid) and `badges-weak` (dashed outline,
    muted text) via the `weak` prop.

    Reads:
      content.title    → small section headline
      content.subtitle → optional muted right-side caption
      content.rgba     → fallback pill background (badges only)
      content.reference→ skillItem[]
                         item.title → pill label
                         item.color → pill background override (badges)
                         item.icon  → optional 18×18 icon left of label
  -->
  <section :class="['skill-badges', { 'skill-badges--weak': weak }]">
    <header class="skill-badges__header">
      <h3 class="skill-badges__title">{{ content.title }}</h3>
      <span v-if="content.subtitle" class="skill-badges__kicker">{{
        content.subtitle
      }}</span>
    </header>

    <div class="skill-badges__row">
      <span
        v-for="item in items"
        :key="item.sys.id"
        class="skill-badges__pill"
        :style="pillStyle(item)"
      >
        <img
          v-if="item?.fields?.icon"
          @contextmenu.prevent
          class="skill-badges__icon"
          :src="item.fields.icon.fields?.file?.url"
          :alt="item.fields.title"
        />
        <span class="skill-badges__label">{{ item.fields.title }}</span>
      </span>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'skill-list-badges',
  props: {
    content: [Array, Object],
    /**
     * `badges-weak` variant: dashed outline, muted text, transparent bg.
     * Used to mark "Currently exploring" / "Familiar with" type rows
     * without lying about depth of experience.
     */
    weak: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    items() {
      return this.content?.reference ?? [];
    },
  },
  methods: {
    pillStyle(item) {
      // Weak pills ignore item color entirely — they're meant to read as
      // "I know it exists, not used daily". Solid pills prefer item.color
      // then fall back to the list's rgba, then to a neutral white.
      if (this.weak) return {};
      const bg =
        item?.fields?.color || this.content?.rgba || 'rgba(255,255,255,0.7)';
      return { background: bg };
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.skill-badges {
  margin: 16px 0 24px;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
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

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    color: $fulutu-black;
    white-space: nowrap;
    border: 1px solid rgba(0, 0, 0, 0.12);
    transition: $transition-all-ease-fast;

    &:hover {
      border-color: rgba(0, 0, 0, 0.24);
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }

  &__label {
    white-space: nowrap;
  }

  /* ──────────── weak variant ──────────── */
  &--weak {
    .skill-badges__title {
      color: rgba($fulutu-grey, 0.7);
    }

    .skill-badges__pill {
      background: transparent;
      border: 1px dashed rgba(0, 0, 0, 0.25);
      color: rgba($fulutu-grey, 0.7);
      font-weight: 400;

      &:hover {
        border-color: rgba(0, 0, 0, 0.45);
        color: $fulutu-grey;
      }
    }
  }
}
</style>
