// eslint-disable-next-line
import { createStore } from 'vuex';

export default createStore({
  state: {
    pagesEN: [],
    routesEN: [],
    pagesDE: [],
    routesDE: [],
    socialMedia: [],
    language: 'en-US',
  },
  getters: {
    getPagesEN(state) {
      return state.pagesEN;
    },
    getRoutesEN(state) {
      return state.routesEN;
    },
    getPagesDE(state) {
      return state.pagesDE;
    },
    getRoutesDE(state) {
      return state.routesDE;
    },
    getSocialMedia(state) {
      return state.socialMedia;
    },
    getLanguage(state) {
      return state.language;
    },
  },
  mutations: {
    setPagesEN(state, pages) {
      state.pagesEN = pages;
    },
    setRoutesEN(state, routes) {
      state.routesEN = routes;
    },
    setPagesDE(state, pages) {
      state.pagesDE = pages;
    },
    setRoutesDE(state, routes) {
      state.routesDE = routes;
    },
    setSocialMedia(state, socialMedia) {
      state.socialMedia = socialMedia;
    },
    setLanguage(state, language) {
      state.language = language;
    },
  },
});
