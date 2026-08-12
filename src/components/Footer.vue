<template>
  <footer class="footer">
    <div class="footer__inner">
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

      <div
        v-if="allSocialLinks.length"
        class="footer-socials"
        ref="socialsRoot"
      >
        <div
          v-if="importantSocialLinks.length"
          class="footer-socials__important"
        >
          <a
            v-for="link in importantSocialLinks"
            :key="`important-${link.id}`"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-socials__link"
            :aria-label="link.title || 'Important social link'"
          >
            <img
              v-if="link.image"
              :src="link.image"
              :alt="link.title || 'Social icon'"
              draggable="false"
              @contextmenu.prevent
            />
          </a>
        </div>

        <button
          v-if="remainingSocialLinks.length"
          type="button"
          class="footer-socials__toggle"
          :class="{ 'footer-socials__toggle--open': showAllSocials }"
          :aria-expanded="showAllSocials ? 'true' : 'false'"
          aria-controls="footer-socials-panel"
          :aria-label="showAllSocials ? 'Close socials' : 'Open socials'"
          @click="toggleSocials"
        >
          Socials
        </button>

        <div
          v-if="panelVisible && remainingSocialLinks.length"
          ref="socialsPanel"
          id="footer-socials-panel"
          class="footer-socials__panel"
        >
          <a
            v-for="link in remainingSocialLinks"
            :key="`extra-${link.id}`"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-socials__link"
            :aria-label="link.title || 'Social link'"
          >
            <img
              v-if="link.image"
              :src="link.image"
              :alt="link.title || 'Social icon'"
              draggable="false"
              @contextmenu.prevent
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';

export default {
  name: 'Footer-component',
  data() {
    return {
      validFooterNavigation: ['/impressum', '/contact', '/kontakt', '/imprint'],
      showAllSocials: false,
      panelVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      'getRoutesEN',
      'getRoutesDE',
      'getLanguage',
      'getSocialMedia',
    ]),
    socialMediaFields() {
      return this.getSocialMedia?.[0]?.fields ?? {};
    },
    allSocialLinks() {
      return this.normalizeSocialLinks(this.socialMediaFields.reference ?? []);
    },
    importantSocialLinks() {
      const important = this.normalizeSocialLinks(
        this.socialMediaFields.importantReference ?? [],
      );
      if (!important.length) {
        return [];
      }

      const allLinksById = new Map(
        this.allSocialLinks.map((link) => [link.id, link]),
      );
      return important.map((link) => allLinksById.get(link.id) ?? link);
    },
    remainingSocialLinks() {
      if (!this.importantSocialLinks.length) {
        return this.allSocialLinks;
      }

      const importantIds = new Set(
        this.importantSocialLinks.map((link) => link.id),
      );
      return this.allSocialLinks.filter((link) => !importantIds.has(link.id));
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEscapeClose);
  },
  beforeUnmount() {
    gsap.killTweensOf(this.$refs.socialsPanel);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscapeClose);
  },
  watch: {
    remainingSocialLinks(nextLinks) {
      if (!nextLinks.length && (this.showAllSocials || this.panelVisible)) {
        this.closeSocials();
      }
    },
  },
  methods: {
    sortRoutes() {
      let routes =
        this.getLanguage === 'de' ? this.getRoutesDE : this.getRoutesEN;

      routes = [...routes].filter((t) =>
        this.validFooterNavigation.includes(t.url),
      );

      const sortedList = routes.sort((a, b) => {
        if (a.position === b.position) {
          return a.name?.localeCompare(b.name);
        }
        return a.position - b.position;
      });

      return sortedList;
    },

    normalizeSocialLinks(entries) {
      const normalized = entries
        .map((item, index) => {
          const url = item?.fields?.url;
          if (!url) {
            return undefined;
          }

          const image = item?.fields?.image?.fields?.file?.url;
          return {
            id: item?.sys?.id ?? `${url}-${index}`,
            url,
            image,
            title: item?.fields?.title ?? '',
          };
        })
        .filter(Boolean);

      return normalized.filter(
        (link, index, list) =>
          list.findIndex((entry) => entry.id === link.id) === index,
      );
    },

    toggleSocials() {
      if (this.showAllSocials) {
        this.closeSocials();
        return;
      }

      this.openSocials();
    },

    async openSocials() {
      if (!this.remainingSocialLinks.length || this.showAllSocials) {
        return;
      }

      this.panelVisible = true;
      this.showAllSocials = true;
      await this.$nextTick();

      const panel = this.$refs.socialsPanel;
      if (!panel) {
        return;
      }

      gsap.killTweensOf(panel);
      gsap
        .timeline()
        .fromTo(
          panel,
          {
            y: 22,
            scale: 0.74,
            opacity: 0,
            transformOrigin: '92% 100%',
          },
          {
            y: -8,
            scale: 1.05,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
        )
        .to(panel, {
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'elastic.out(1, 0.8)',
        });
    },

    closeSocials() {
      if (!this.panelVisible) {
        this.showAllSocials = false;
        return;
      }

      const panel = this.$refs.socialsPanel;
      if (!panel) {
        this.panelVisible = false;
        this.showAllSocials = false;
        return;
      }

      gsap.killTweensOf(panel);
      gsap.to(panel, {
        y: 14,
        scale: 0.82,
        opacity: 0,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          this.panelVisible = false;
          this.showAllSocials = false;
        },
      });
    },

    handleClickOutside(event) {
      if (!this.showAllSocials) {
        return;
      }

      if (!this.$refs.socialsRoot?.contains(event.target)) {
        this.closeSocials();
      }
    },

    handleEscapeClose(event) {
      if (event.key === 'Escape') {
        this.closeSocials();
      }
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
  left: 0;
  right: 0;
  background: $fulutu-white;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 24px;
  z-index: 11;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    min-width: 0;
    flex-wrap: wrap;
  }

  a {
    color: #050505;
    text-decoration: none;
    transition: all 0.166s ease;

    &:hover {
      color: $fulutu-rose;
    }
  }

  .footer-navigation-container {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    flex: 1 1 auto;
    min-width: 0;
  }

  .footer-socials {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    flex: 0 0 auto;
    overflow: visible;

    &__important,
    &__panel {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
    }

    &__panel {
      position: absolute;
      right: 0;
      bottom: calc(100% + 8px);
      background: $fulutu-white;
      border: 1px solid rgba($fulutu-black, 0.1);
      box-shadow: 0px 10px 24px -16px rgba($fulutu-black, 0.75);
      border-radius: 999px;
      padding: 8px;
      z-index: 20;
    }

    &__link {
      align-items: center;
      border: 1px solid rgba($fulutu-black, 0.15);
      border-radius: 999px;
      display: inline-flex;
      height: 34px;
      justify-content: center;
      width: 34px;
      background: $fulutu-white;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        border-color: $fulutu-rose;
        background: rgba($fulutu-rose, 0.08);
        transform: translateY(-1px);
        box-shadow: 0 6px 12px -10px rgba($fulutu-black, 0.7);
      }

      &:focus-visible {
        outline: none;
        border-color: $fulutu-rose;
        box-shadow: 0 0 0 3px rgba($fulutu-rose, 0.18);
      }

      img {
        width: 22px;
        height: 22px;
        object-fit: contain;
        transition: transform 0.2s ease;
      }

      &:hover img {
        transform: scale(1.04);
      }
    }

    &__toggle {
      border: 1px solid rgba($fulutu-black, 0.12);
      background: $fulutu-white;
      color: $fulutu-black;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      white-space: nowrap;
      padding: 0 12px;
      border-radius: 999px;
      text-decoration: none;
      transition: color 0.166s ease;
      height: 34px;
      position: relative;
      min-width: 76px;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      transition:
        color 0.166s ease,
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

      &:hover {
        color: $fulutu-black;
        border-color: rgba($fulutu-rose, 0.7);
        background: rgba($fulutu-rose, 0.08);
        transform: translateY(-1px);
        box-shadow: 0 6px 12px -10px rgba($fulutu-black, 0.7);
      }

      &:focus-visible {
        outline: none;
        border-color: $fulutu-rose;
        box-shadow: 0 0 0 3px rgba($fulutu-rose, 0.18);
      }

      &--open {
        color: $fulutu-rose;
        border-color: rgba($fulutu-rose, 0.7);
        background: rgba($fulutu-rose, 0.08);
      }
    }
  }

  @media (max-width: 760px) {
    padding: 12px 14px;
    width: 100%;

    &__inner {
      gap: 10px;
      align-items: flex-start;
      flex-direction: column;
    }

    .footer-navigation-container {
      gap: 10px;
    }

    .footer-socials {
      align-self: flex-end;
      margin-top: 2px;

      &__toggle {
        font-size: 0.9rem;
      }

      &__panel {
        right: 0;
        max-width: calc(100vw - 30px);
        flex-wrap: wrap;
        border-radius: 18px;
      }
    }
  }
}
</style>
