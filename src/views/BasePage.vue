<template>
  <ComponentLoader
    :components="getSpecificPage?.reference"
    :shifted="getSpecificPage?.shiftContent"
    :shiftedHeight="shiftedHeight"
  />
</template>

<script>
// @ is an alias to /src
import ComponentLoader from '../components/ComponentLoader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'base-page',
  components: {
    ComponentLoader,
  },
  computed: {
    ...mapGetters(['getPagesEN', 'getPagesDE', 'getLanguage']),

    getSpecificPage() {
      const page = this.getLanguage == 'de' ? this.getPagesDE : this.getPagesEN;

      const specificPage = page.find((page) => {
        const pageSlug =
          page.fields.slug !== '/' ? '/' + page.fields.slug : '/';
        return pageSlug == window.location.pathname;
      });

      return specificPage?.fields;
    },
    shiftedHeight() {
      const body = document.body;
      const height = body.offsetHeight;
      const heightWithoutHeader = height / 2 + 96 * 2 + 'px';

      return heightWithoutHeader;
    },
  },
};
</script>
