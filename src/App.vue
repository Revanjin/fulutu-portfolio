<template>
  <Navigation />
  <router-view :key="$route.path" />
  <BubbleButton />
  <Footer />
</template>

<script>
import { mapMutations } from 'vuex';
import BubbleButton from './components/BubbleButton.vue';
import Footer from './components/Footer.vue';
import Navigation from './views/Navigation';
const contentful = require('contentful');

export default {
  name: 'vcp-app',
  components: {
    Navigation,
    BubbleButton,
    Footer,
  },
  data() {
    return {
      pages: [],
    };
  },
  async created() {
    this.pages = await this.setupContentfulPages();
  },
  methods: {
    ...mapMutations([
      'setPagesEN',
      'setRoutesEN',
      'setPagesDE',
      'setRoutesDE',
      'setSocialMedia',
    ]),

    setupContentfulPages() {
      var client = contentful.createClient({
        space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN,
      });

      client
        .getEntries({ content_type: 'globalSocialMedia' })
        .then((response) => {
          this.setSocialMedia(response.items);
        });

      client
        .getEntries({ include: 3, content_type: 'page', locale: 'de' })
        .then((response) => {
          var pageComponents = response.items;

          var allRoutes = pageComponents.map((page) => {
            if (page?.fields?.slug) {
              return {
                slug: page.fields.slug,
                name: page.fields.pageName,
                url: page.fields.slug !== '/' ? '/' + page.fields.slug : '/',
                hide: page.fields.hideFromNavigation ?? false,
                position: page.fields.id ?? undefined,
                subPaths: [],
                title: page.fields.title ?? undefined,
              };
            }
          });

          allRoutes = allRoutes.filter(function (page) {
            return page !== undefined;
          });

          //step 1: eine liste mit den subPaths
          var subPathList = [];
          allRoutes.forEach((item) => {
            var splittedSubItem = item.url.split('/');

            // e.g. ["","path","subpath"]
            if (splittedSubItem.length > 2) {
              subPathList.push({ url: item.url, title: item.title });
            }
          });

          //step 2: die neue liste gegen "before" halten, filtern und eine cleanList erstellen
          var cleanList = this.filterRoutes(allRoutes, subPathList);

          //step 3: suche in "before" nach den ersten part vom path und wenn er da ist,
          //dann in subPaths hinzufügen
          subPathList.forEach((subPathItem) => {
            var splittedSubItem = subPathItem.url.split('/');
            splittedSubItem = '/' + splittedSubItem[1];

            cleanList.forEach((cleanItem) => {
              if (cleanItem.url == splittedSubItem) {
                cleanItem.subPaths.push({
                  url: subPathItem.url,
                  title: subPathItem.title,
                });
              }
            });
          });

          this.setPagesDE(response.items);
          this.setRoutesDE(cleanList);
        });

      client
        .getEntries({ include: 3, content_type: 'page', locale: 'en-US' })
        .then((response) => {
          var pageComponents = response.items;

          var allRoutes = pageComponents.map((page) => {
            if (page?.fields?.slug) {
              return {
                slug: page.fields.slug,
                name: page.fields.pageName,
                url: page.fields.slug !== '/' ? '/' + page.fields.slug : '/',
                hide: page.fields.hideFromNavigation ?? false,
                position: page.fields.id ?? undefined,
                subPaths: [],
                title: page.fields.title ?? undefined,
              };
            }
          });

          allRoutes = allRoutes.filter(function (page) {
            return page !== undefined;
          });

          //step 1: eine liste mit den subPaths
          var subPathList = [];
          allRoutes.forEach((item) => {
            var splittedSubItem = item.url.split('/');

            // e.g. ["","path","subpath"]
            if (splittedSubItem.length > 2) {
              subPathList.push({ url: item.url, title: item.title });
            }
          });

          //step 2: die neue liste gegen "before" halten, filtern und eine cleanList erstellen
          var cleanList = this.filterRoutes(allRoutes, subPathList);

          //step 3: suche in "before" nach den ersten part vom path und wenn er da ist,
          //dann in subPaths hinzufügen
          subPathList.forEach((subPathItem) => {
            var splittedSubItem = subPathItem.url.split('/');
            splittedSubItem = '/' + splittedSubItem[1];

            cleanList.forEach((cleanItem) => {
              if (cleanItem.url == splittedSubItem) {
                cleanItem.subPaths.push({
                  url: subPathItem.url,
                  title: subPathItem.title,
                });
              }
            });
          });

          this.setPagesEN(response.items);
          this.setRoutesEN(cleanList);
        });
    },

    filterRoutes(allRoutes, subPathList) {
      return allRoutes.filter((item) => {
        return !subPathList.find((a) => a.url == item.url);
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/main.scss';

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: $fulutu-white;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Comfortaa';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fulutu-black;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  border-radius: 100px;
}

::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 4px solid transparent;
  background-clip: content-box;
  background-color: $fulutu-blue-grey;
}
</style>
