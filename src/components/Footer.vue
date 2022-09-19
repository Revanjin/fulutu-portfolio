<template>
  <footer class="footer">
    <div class="footer-navigation-container">
      <router-link
        class="footer-navigation-item"
        v-for="(link, index) in sortRoutes()"
        :to="link.url"
        :key="index"
      >
        {{ link.title }}
      </router-link>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Footer-component',
  data() {
    return {
      validFooterNavigation: ['/impressum', '/contact', '/imprint'],
    };
  },
  computed: {
    ...mapGetters(['getRoutesEN', 'getRoutesDE', 'getLanguage']),
  },
  methods: {
    ...mapMutations(['setLanguage']),

    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },

    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight;
    },

    sortRoutes() {
      let routes =
        this.getLanguage == 'de' ? this.getRoutesDE : this.getRoutesEN;

      routes = routes.filter((t) => this.validFooterNavigation.includes(t.url));

      var sortedList = routes.sort(function (a, b) {
        return a.position - b.position || a.name?.localeCompare(b.name);
      });

      return sortedList;
    },

    sanitizeRouterLabel(route) {
      if (route === '/' || route === undefined || route == '')
        route = 'About Us';

      route = route.replace('-', ' ');

      route = route[0].toUpperCase() + route.substring(1);

      return route;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.footer {
  box-shadow: 0px 0px 6px -3px $fulutu-black;
  position: fixed;
  bottom: 0;
  background: $fulutu-white;
  width: 100%;
  padding: 24px 32px;
  z-index: 11;

  a {
    color: #050505;
    text-decoration: none;
    transition: all 0.166s ease;

    &:hover {
      color: $fulutu-rose;
    }
  }
}
</style>
