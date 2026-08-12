<template>
  <div class="mnav">
    <!-- Burger button -->
    <button
      ref="toggleBtn"
      class="mnav__toggle"
      @click="toggleMenu"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-label="Toggle navigation"
    >
      <span ref="lineA" class="mnav__line mnav__line--a"></span>
      <span ref="lineB" class="mnav__line mnav__line--b"></span>
      <span ref="lineC" class="mnav__line mnav__line--c"></span>
    </button>

    <!-- Fullscreen overlay -->
    <div ref="overlay" class="mnav__overlay">
      <span class="mnav__bg-text" aria-hidden="true">FULUTU</span>

      <div class="mnav__content">
        <!-- ── Menu section ───────────────────────── -->
        <div ref="sectionMenu" class="mnav__section">
          <div class="mnav__divider"></div>
          <span class="mnav__section-label">Menu</span>
          <nav class="mnav__list">
            <div
              v-for="navItem in sortedRoutes"
              :key="navItem.title"
              class="mnav__item"
            >
              <router-link :to="navItem.url" class="mnav__link">
                <span class="mnav__index">{{ '○' }}</span>
                <span class="mnav__label">{{ navItem.title }}</span>
              </router-link>
              <div
                v-if="navItem.subPaths && navItem.subPaths.length"
                class="mnav__sub"
              >
                <router-link
                  v-for="subNavItem in navItem.subPaths"
                  :key="subNavItem.title"
                  :to="subNavItem.url"
                  class="mnav__sub-link"
                >
                  {{ subNavItem.title }}
                </router-link>
              </div>
            </div>
          </nav>
        </div>

        <!-- ── Social Media section ──────────────── -->
        <div
          v-if="socialLinks.length"
          ref="sectionSocial"
          class="mnav__section"
        >
          <div class="mnav__divider"></div>
          <span class="mnav__section-label">Social Media</span>
          <div class="mnav__socials">
            <a
              v-for="link in socialLinks"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mnav__social-icon"
            >
              <img :src="link.image" :alt="link.title" />
            </a>
          </div>
        </div>

        <!-- ── Hire Me section ───────────────────── -->
        <div v-if="false" ref="sectionHire" class="mnav__section">
          <div class="mnav__divider"></div>
          <span class="mnav__section-label">Need help?</span>
          <router-link to="/contact" class="mnav__hire-link">
            Hire Me
          </router-link>
        </div>
      </div>

      <!-- Language switcher -->
      <div ref="footer" class="mnav__footer">
        <LanguageSwitcher
          :currentLanguage="currentLanguage"
          @switch="$emit('switch-language', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapGetters } from 'vuex';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  name: 'MobileNavigationV2',
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
  data() {
    return { isOpen: false };
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
  watch: {
    $route() {
      if (this.isOpen) this.closeMenu();
    },
  },
  beforeUnmount() {
    // Kill any in-flight tweens so GSAP doesn't keep refs to detached
    // DOM nodes (HMR, locale switch re-mounting the nav, etc.).
    gsap.killTweensOf(
      [
        this.$refs.overlay,
        this.$refs.footer,
        this.$refs.sectionMenu,
        this.$refs.sectionSocial,
        this.$refs.sectionHire,
        this.$refs.lineA,
        this.$refs.lineB,
        this.$refs.lineC,
      ].filter(Boolean),
    );
  },
  methods: {
    toggleMenu() {
      this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
      if (this.isOpen) return;
      this.isOpen = true;

      const overlay = this.$refs.overlay;
      const sections = [
        this.$refs.sectionMenu,
        this.$refs.sectionSocial,
        this.$refs.sectionHire,
      ].filter(Boolean);
      const footer = this.$refs.footer;
      const lines = [this.$refs.lineA, this.$refs.lineB, this.$refs.lineC];

      gsap.killTweensOf([overlay, footer, ...sections, ...lines]);

      gsap.set(overlay, { display: 'flex', x: '100%' });
      gsap.set(sections, { y: 50, opacity: 0 });
      gsap.set(footer, { opacity: 0, y: 16 });

      gsap
        .timeline()
        .to(overlay, { x: '0%', duration: 0.55, ease: 'power3.out' })
        .to(
          sections,
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.25',
        )
        .to(footer, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');

      // Burger → X
      gsap.to(this.$refs.lineA, {
        y: 10,
        rotate: 45,
        backgroundColor: '#eeeeee',
        duration: 0.35,
        ease: 'power2.inOut',
        delay: 0.1,
      });
      gsap.to(this.$refs.lineB, {
        scaleX: 0,
        opacity: 0,
        duration: 0.15,
        delay: 0.05,
      });
      gsap.to(this.$refs.lineC, {
        y: -10,
        rotate: -45,
        width: 32,
        backgroundColor: '#eeeeee',
        duration: 0.35,
        ease: 'power2.inOut',
        delay: 0.1,
      });
    },

    closeMenu() {
      if (!this.isOpen) return;

      const overlay = this.$refs.overlay;
      const sections = [
        this.$refs.sectionMenu,
        this.$refs.sectionSocial,
        this.$refs.sectionHire,
      ].filter(Boolean);
      const footer = this.$refs.footer;
      const lines = [this.$refs.lineA, this.$refs.lineB, this.$refs.lineC];

      gsap.killTweensOf([overlay, footer, ...sections, ...lines]);

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { display: 'none' });
            this.isOpen = false;
          },
        })
        .to(sections, {
          y: -30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.35,
          ease: 'power2.in',
        })
        .to(footer, { opacity: 0, y: 8, duration: 0.2 }, '<')
        .to(
          overlay,
          { x: '100%', duration: 0.45, ease: 'power3.in' },
          '-=0.15',
        );

      // X → Burger
      gsap.to(this.$refs.lineA, {
        y: 0,
        rotate: 0,
        backgroundColor: '#232323',
        duration: 0.35,
        ease: 'power2.inOut',
      });
      gsap.to(this.$refs.lineB, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
      });
      gsap.to(this.$refs.lineC, {
        y: 0,
        rotate: 0,
        width: 14,
        backgroundColor: '#232323',
        duration: 0.35,
        ease: 'power2.inOut',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.mnav {
  display: flex;
  align-items: center;

  @media (min-width: $md) {
    display: none;
  }

  // ── Hamburger button ───────────────────────────────────────────────
  &__toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    height: 22px;
    padding: 0;
    position: relative;
    width: 32px;
    z-index: 21;
  }

  &__line {
    border-radius: 2px;
    height: 2px;
    left: 0;
    position: absolute;

    &--a {
      background-color: $fulutu-grey;
      top: 0;
      width: 32px;
    }

    &--b {
      background-color: $fulutu-grey;
      top: 10px;
      width: 22px;
    }

    &--c {
      background-color: $fulutu-grey;
      top: 20px;
      width: 14px;
    }
  }

  // ── Fullscreen overlay ─────────────────────────────────────────────
  &__overlay {
    background-color: rgba(5, 5, 5, 0.97);
    box-sizing: border-box;
    display: none;
    flex-direction: column;
    height: 100dvh;
    justify-content: center;
    left: 0;
    overflow: hidden;
    padding: 94px 48px 80px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
  }

  // Ghost background branding text
  &__bg-text {
    color: rgba(238, 238, 238, 0.035);
    font-family: 'Six Caps', sans-serif;
    font-size: 55vw;
    left: 50%;
    line-height: 0.85;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    white-space: nowrap;
  }

  // ── Main content wrapper ───────────────────────────────────────────
  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  // ── Section block ──────────────────────────────────────────────────
  &__section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__divider {
    background: rgba(238, 238, 238, 0.12);
    height: 1px;
    width: 100%;
  }

  &__section-label {
    color: rgba(238, 238, 238, 0.35);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  // ── Navigation list ────────────────────────────────────────────────
  &__list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__link {
    align-items: baseline;
    color: $fulutu-white;
    display: inline-flex;
    gap: 14px;
    padding-bottom: 4px;
    position: relative;
    text-decoration: none;

    &::after {
      background: $fulutu-rose;
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      transition: width 0.35s ease;
      width: 0;
    }

    &:hover::after,
    &.router-link-exact-active::after {
      width: 100%;
    }

    &.router-link-exact-active .mnav__label {
      color: $fulutu-rose;
    }
  }

  &__index {
    align-self: center;
    color: $fulutu-rose;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    line-height: 1;
    padding-bottom: 2px;
  }

  &__label {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.75rem, 7vw, 2.5rem);
    font-weight: 200;
    letter-spacing: 0.1em;
    line-height: 1.15;
    text-transform: uppercase;
    transition: color 0.25s ease;

    &:hover {
      color: $fulutu-rose;
    }
  }

  // ── Sub-navigation ─────────────────────────────────────────────────
  &__sub {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 4px;
    margin-left: 36px;
    margin-top: 4px;
  }

  &__sub-link {
    color: rgba(238, 238, 238, 0.4);
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.25s ease;

    &:hover {
      color: $fulutu-rose;
    }
  }

  // ── Social icons ───────────────────────────────────────────────────
  &__socials {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }

  &__social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    opacity: 0.6;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;

    img {
      filter: invert(1);
      height: 100%;
      width: 100%;
      object-fit: contain;
    }

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }
  }

  // ── Hire Me link ───────────────────────────────────────────────────
  &__hire-link {
    align-items: baseline;
    color: $fulutu-white;
    display: inline-flex;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.75rem, 7vw, 2.5rem);
    font-weight: 200;
    gap: 14px;
    letter-spacing: 0.1em;
    padding-bottom: 4px;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.25s ease;

    &::after {
      background: $fulutu-rose;
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      transition: width 0.35s ease;
      width: 0;
    }

    &:hover {
      color: $fulutu-rose;

      &::after {
        width: 100%;
      }
    }
  }

  // ── Footer (language switcher) ─────────────────────────────────────
  &__footer {
    bottom: 32px;
    left: 48px;
    position: absolute;
    z-index: 1;
  }
}
</style>
