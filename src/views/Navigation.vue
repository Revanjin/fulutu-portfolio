<template>
  <nav v-if="displayNavigation" class="nav">
    <router-link to="/" class="nav-logo">FULUTU</router-link>

    <div v-if="isDesktopView" class="nav-container">
      <template v-for="route in sortedRoutes" :key="route.title">
        <div class="nav-item">
          <router-link :to="route.url">{{ route.title }}</router-link>
          <div v-if="route.subPaths.length" class="nav-sub-item">
            <router-link
              v-for="subNavItem in route.subPaths"
              :to="subNavItem.url"
              :key="subNavItem.title"
            >
              {{ subNavItem.title }}
            </router-link>
          </div>
        </div>
      </template>
      <LanguageSwitcher
        :currentLanguage="getLanguage"
        @switch="switchLanguage"
      />
    </div>

    <MobileNavigation
      v-if="mobileNavVersion === 'v1'"
      :sortedRoutes="sortedRoutes"
      :currentLanguage="getLanguage"
      @switch-language="switchLanguage"
    />
    <MobileNavigationV2
      v-else
      :sortedRoutes="sortedRoutes"
      :currentLanguage="getLanguage"
      @switch-language="switchLanguage"
    />
  </nav>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import MobileNavigation from '@/components/MobileNavigation.vue';
import MobileNavigationV2 from '@/components/MobileNavigationV2.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'vcp-router',
  components: { LanguageSwitcher, MobileNavigation, MobileNavigationV2 },
  data() {
    return {
      validFooterNavigation: ['/impressum', '/contact', '/imprint'],
      windowWidth: 0,
      displayNavigation: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  computed: {
    ...mapGetters([
      'getRoutesEN',
      'getRoutesDE',
      'getLanguage',
      'getMobileNavVersion',
    ]),
    isDesktopView() {
      return this.windowWidth >= 905;
    },
    sortedRoutes() {
      return this.sortRoutes();
    },
    mobileNavVersion() {
      return this.getMobileNavVersion;
    },
  },
  methods: {
    ...mapMutations(['setLanguage', 'setMobileNavVersion']),

    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },

    sortRoutes() {
      const routes =
        this.getLanguage === 'de' ? this.getRoutesDE : this.getRoutesEN;
      const filteredRoutes = routes.filter(
        (t) => !this.validFooterNavigation.includes(t.url) && !t.hide,
      );

      return filteredRoutes.sort((a, b) => {
        if (a.position === b.position) {
          return a.name?.localeCompare(b.name);
        }
        return a.position - b.position;
      });
    },

    sanitizeRouterLabel(route) {
      if (!route || route === '/') route = 'Home';
      route = route.replace('-', ' ').charAt(0).toUpperCase() + route.slice(1);
      return route;
    },

    switchLanguage(lang) {
      this.setLanguage(lang);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

nav {
  background: $fulutu-white;
  box-shadow: 0px 0px 6px -3px #050505;
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  padding: 0 32px;
  position: fixed;
  height: 94px;
  width: calc(100% - 64px);
  z-index: 20;
}

.nav {
  &-container {
    display: none;
    justify-content: flex-end;
    align-items: center;
    width: calc(100% - 32px);

    @media (min-width: $md) {
      display: flex;
    }
  }

  &-item {
    font-size: 24px;
    padding: 16px 12px;
    position: relative;
    text-transform: uppercase;

    > a {
      color: $fulutu-black;
      text-decoration: none;
      transition: $transition-all-ease-fast;
    }

    &:hover {
      .nav-sub-item {
        opacity: 1;
        visibility: visible;

        div {
          margin: 8px 0;
        }
      }

      > a {
        color: $fulutu-rose;
      }
    }

    .router-link-exact-active {
      color: $fulutu-rose;
    }
  }

  &-logo {
    color: $fulutu-black;
    font-family: 'Six Caps';
    font-size: 64px;
    text-decoration: none;
    position: absolute;
    left: 32px;
    top: 0;
    transition: $transition-all-ease-fast;
    z-index: 1;

    &:hover {
      color: $fulutu-rose;
    }
  }

  &-sub-item {
    background-color: white;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 12px;
    min-width: 120px;
    opacity: 0;
    padding: 8px;
    visibility: hidden;
    white-space: nowrap;
    transition-timing-function: ease;
    transition-duration: 0.5s;
    transition-property: opacity, visibility;
    transition-delay: 0s, 0s;
    z-index: 20;

    &::before,
    ::after {
      content: '';
      width: 0px;
      height: 0px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &::before {
      border-bottom: 12px solid rgba(0, 0, 0, 0.07);
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      top: -14px;
    }

    &::after {
      border-bottom: 10px solid white;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      top: -10px;
    }

    > a {
      color: $fulutu-black;
      padding: 12px 0;
      transition: $transition-all-ease-fast;

      &:hover {
        color: $fulutu-rose;
      }
    }
  }
}

.progression-bar {
  width: 0%;
  position: absolute;
  height: 4px;
  background: $fulutu-blue;
  left: 0;
  top: 94px;
  z-index: 1;
}
</style>
