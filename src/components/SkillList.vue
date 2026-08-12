<template>
  <SkillListMainStack
    v-if="variant === 'main-stack'"
    :content="content"
  />
  <SkillListBadges
    v-else-if="variant === 'badges' || variant === 'badges-weak'"
    :content="content"
    :weak="variant === 'badges-weak'"
  />
  <SkillListLegacy
    v-else
    :content="content"
  />
</template>

<script>
/* eslint-disable */
/**
 * SkillList — Dispatcher.
 *
 * Reads `content.variant` from Contentful (skillList content type) and
 * routes to the matching renderer. Default falls back to the legacy
 * progress-bar / doughnut renderer so old entries keep working.
 *
 * variant ∈ "legacy" | "main-stack" | "badges" | "badges-weak"
 */
import SkillListLegacy from './SkillListLegacy.vue';
import SkillListMainStack from './SkillListMainStack.vue';
import SkillListBadges from './SkillListBadges.vue';

export default {
  name: 'skill-list',
  components: {
    SkillListLegacy,
    SkillListMainStack,
    SkillListBadges,
  },
  props: {
    content: [Array, Object],
  },
  computed: {
    variant() {
      // Contentful Symbol field with a dropdown validation. Empty / unknown
      // values fall back to the legacy renderer so we never break old data.
      const v = this.content?.variant;
      if (['main-stack', 'badges', 'badges-weak'].includes(v)) return v;
      return 'legacy';
    },
  },
};
</script>
