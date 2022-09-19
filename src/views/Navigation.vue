<template>
  <nav class="nav-container">
    <a href="/" class="nav-logo"> FULUTU </a>

    <div v-if="windowWidth >= 905" class="nav-container">
      <div class="nav-item" v-for="(route, index) in sortRoutes()" :key="index">
        <router-link :to="route.url" :key="index">
          {{ sanitizeRouterLabel(route.slug) }}
        </router-link>

        <div class="nav-sub-item" v-if="route.subPaths.length > 0">
          <router-link
            v-for="(subNavItem, index) in route.subPaths"
            :to="subNavItem.url"
            :key="index"
          >
            {{ subNavItem.title }}
          </router-link>
        </div>
      </div>
      <div class="nav-item nav-lang-switch">
        <div
          :class="[
            'nav-lang-switch-item',
            {
              'nav-lang-switch-item--active': getLanguage === 'de',
            },
          ]"
          @click="switchLanguage('de')"
        >
          DE
        </div>
        <div
          :class="[
            'nav-lang-switch-item',
            {
              'nav-lang-switch-item--active': getLanguage === 'en-US',
            },
          ]"
          @click="switchLanguage('en-US')"
        >
          EN
        </div>
      </div>
    </div>

    <header v-if="windowWidth < 905" class="nav-mobile">
      <div
        id="nav-mobile-icon"
        class="nav-mobile-icon"
        v-on:click="toggleBurgerMenu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div id="nav-mobile-bar" class="nav-mobile-bar">
        <div class="nav-mobile-list">
          <div
            class="nav-mobile-link"
            v-for="(navItem, index) in sortRoutes()"
            :key="index"
          >
            <router-link :to="navItem.url" v-on:click="toggleBurgerMenu">
              {{ navItem.title }}
            </router-link>

            <div class="nav-mobile-multi" v-if="navItem.subPaths.length > 0">
              <router-link
                v-for="(subNavItem, index) in navItem.subPaths"
                :to="subNavItem.url"
                v-on:click="toggleBurgerMenu"
                :key="index"
              >
                {{ subNavItem.title }}
              </router-link>
            </div>
          </div>
          <div class="nav-item nav-lang-switch">
            <div
              :class="[
                'nav-lang-switch-item',
                {
                  'nav-lang-switch-item--active': getLanguage === 'de',
                },
              ]"
              @click="switchLanguage('de')"
            >
              DE
            </div>
            <div
              :class="[
                'nav-lang-switch-item',
                {
                  'nav-lang-switch-item--active': getLanguage === 'en-US',
                },
              ]"
              @click="switchLanguage('en-US')"
            >
              EN
            </div>
          </div>
        </div>
      </div>
    </header>

    <div id="progression-bar" class="progression-bar"></div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'vcp-router',
  data() {
    return {
      validFooterNavigation: ['/impressum', '/contact', '/imprint'],
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);

      //Init
      this.getWindowWidth();
      this.getWindowHeight();
    });

    console.log(this.getLanguage);
    this.setScrollbar();
    window.addEventListener('resize', this.setScrollbar());
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

      routes = routes.filter(
        (t) => !this.validFooterNavigation.includes(t.url)
      );

      var sortedList = routes.sort(function (a, b) {
        return a.position - b.position || a.name?.localeCompare(b.name);
      });

      return sortedList;
    },

    sanitizeRouterLabel(route) {
      if (route === '/' || route === undefined || route == '') route = 'Home';

      route = route.replace('-', ' ');

      route = route[0].toUpperCase() + route.substring(1);

      return route;
    },

    setScrollbar() {
      const progressionBar = document.getElementById('progression-bar');
      const body = document.body;
      const html = document.documentElement;

      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      this.setScrollEvent(progressionBar, height);
    },

    setScrollEvent(progressionBar, height) {
      document.addEventListener('scroll', () => {
        var currentPosition = window.pageYOffset;
        var scrollableHeight = height - document.body.clientHeight;

        if (scrollableHeight !== 0) {
          progressionBar.style.width = `${
            (currentPosition / scrollableHeight) * 100
          }%`;
        }
      });
    },
    toggleBurgerMenu() {
      var navBar = document.getElementById('nav-mobile-bar');
      var navIcon = document.getElementById('nav-mobile-icon');
      navBar.classList.toggle('nav-mobile-bar--open');
      navIcon.classList.toggle('nav-mobile-icon--open');
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
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 0 32px;
  z-index: 20;
}

.nav {
  &-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 94px;
    position: fixed;
    background: $fulutu-white;
    width: calc(100% - 64px);
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

    &:last-child {
      padding-right: 16px;
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

  &-lang-switch {
    display: flex;

    > div {
      cursor: pointer;
      padding: 8px;
      position: relative;

      &:not(:last-child):after {
        content: '|';
        position: absolute;
        right: -2px;
      }
    }

    &-item--active {
      color: $fulutu-blue;
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

  &-mobile {
    display: flex;

    @media (min-width: $md) {
      display: none;
    }

    &-icon {
      cursor: pointer;
      height: 40px;
      margin: 20px;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      transition: 0.2s ease-in-out;
      width: 60px;
      z-index: 21;

      span {
        background: $fulutu-grey;
        border-radius: 7px;
        display: block;
        left: 0;
        height: 4px;
        width: 100%;
        opacity: 1;
        position: fixed;
        transform: rotate(0deg);
        transition: 0.33s ease;

        &:first-child {
          top: 0;
        }
        &:nth-child(2),
        &:nth-child(3) {
          top: 18px;
        }
        &:last-child {
          top: 36px;
        }
      }

      &--open {
        position: fixed;
        top: 8px;
        right: 32px;

        span {
          background: $fulutu-white;
          &:first-child {
            top: 18px;
            transform: rotate(45deg);
            opacity: 0;
          }
          &:nth-child(2) {
            transform: rotate(-45deg);
          }
          &:nth-child(3) {
            transform: rotate(45deg);
          }
          &:last-child {
            top: 18px;
            transform: rotate(-45deg);
            opacity: 0;
          }
        }
      }
    }

    &-bar {
      align-items: center;
      background: rgba(17, 17, 17, 0.9);
      height: 100%;
      justify-content: center;
      left: 0;
      margin: 0;
      padding: 0;
      position: fixed;
      top: 0;
      transition: $transition-all-ease-fast;
      transform: translateX(-100%);
      width: 100%;
      z-index: 20;

      &--open {
        transform: translateX(0);
      }
    }
    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80%;
      padding: 0;
    }
    &-item {
      font-size: 30px;
      transition: all 0.33s ease;
    }

    &-link {
      font-size: $font-md;

      &:not(:last-child) {
        margin-bottom: $spacing-lg;
      }

      a {
        color: $fulutu-white;
      }
    }

    &-multi {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        margin-bottom: $spacing-md;

        &:first-child {
          margin-top: $spacing-md;
        }
      }

      &-icon {
        filter: invert(1);
        width: 16px;
        transform: scaleY(-1) rotate(90deg);
      }
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
  top: 94px;
  z-index: 1;
}
</style>
