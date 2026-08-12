<template>
  <div class="nav-mobile">
    <div id="nav-mobile-icon" class="nav-mobile-icon" @click="toggleBurgerMenu">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div id="nav-mobile-bar" class="nav-mobile-bar">
      <div class="nav-mobile-list">
        <div v-for="navItem in sortedRoutes" :key="navItem.title">
          <div class="nav-mobile-link">
            <router-link :to="navItem.url" @click="toggleBurgerMenu">
              {{ navItem.title }}
            </router-link>
            <div v-if="navItem.subPaths.length" class="nav-mobile-multi">
              <router-link
                v-for="subNavItem in navItem.subPaths"
                :to="subNavItem.url"
                @click="toggleBurgerMenu"
                :key="subNavItem.title"
              >
                {{ subNavItem.title }}
              </router-link>
            </div>
          </div>
        </div>
        <LanguageSwitcher
          :currentLanguage="currentLanguage"
          @switch="$emit('switch-language', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  name: 'MobileNavigation',
  components: { LanguageSwitcher },
  props: {
    sortedRoutes: {
      type: Array,
      required: true,
    },
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  emits: ['switch-language'],
  methods: {
    toggleBurgerMenu() {
      const navBar = document.getElementById('nav-mobile-bar');
      const navIcon = document.getElementById('nav-mobile-icon');
      navBar.classList.toggle('nav-mobile-bar--open');
      navIcon.classList.toggle('nav-mobile-icon--open');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.nav-mobile {
  display: flex;
  align-items: center;

  @media (min-width: $md) {
    display: none;
  }

  &-icon {
    cursor: pointer;
    height: 40px;
    margin: 12px;
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
      top: 12px;
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
    margin-bottom: 16px;
    text-align: center;

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

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-icon {
      filter: invert(1);
      width: 16px;
      transform: scaleY(-1) rotate(90deg);
    }
  }
}
</style>
