<template>
  <div class="page-transition">
    <ComponentLoader
      style="background: #eeeeee"
      :components="getSpecificPage?.reference"
      :shifted="getSpecificPage?.shiftContent"
      :shiftedHeight="shiftedHeight"
    />
    <Modal v-if="getModalState" />
  </div>
</template>

<script>
import ComponentLoader from '../components/ComponentLoader.vue';
import Modal from '../components/Modal.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'base-page',
  components: {
    ComponentLoader,
    Modal,
  },
  data() {
    return {
      showPage: true,
    };
  },
  computed: {
    ...mapGetters(['getPagesEN', 'getPagesDE', 'getLanguage', 'getModalState']),

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

    errorText() {
      return this.getLanguage !== 'de'
        ? `<h2>404 Page not found.</h2>
        <h3>
          Either the page you are looking for does not exist or our Poros have
          eaten the page you are looking for. Please don't be angry with the
          Poros.
        </h3>
        <h3>Click on the Poro to get to the home page.</h3>`
        : `<h2>404 Seite nicht gefunden.</h2>
        <h3>
          Entweder existiert die Seite, die Sie suchen, nicht oder unsere Poros haben
          die Seite, die Sie suchen, gefressen. Bitte seien Sie nicht böse auf die
          Poros.
        </h3>
        <h3>Klicke auf den Poro, um zur Startseite zu gelangen.</h3>`;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';
button {
  z-index: 100000;
  position: absolute;
}
.page-transition {
  animation: appear 0.5s ease-in;
}

.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 700px;
  width: calc(100% - 32px);

  @media (min-width: $md) {
    flex-direction: row;
    width: 75%;
  }

  img {
    height: 100%;
    max-width: 285px;
  }

  .error-content {
    max-width: 500px;
    padding: 16px;
  }
}
</style>
