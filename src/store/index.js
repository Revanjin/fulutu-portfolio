// eslint-disable-next-line
import { createStore } from 'vuex';

export default createStore({
  state: {
    customCss: '',
    pagesEN: [],
    routesEN: [],
    pagesDE: [],
    routesDE: [],
    socialMedia: [],
    language: 'en-US',
    modalContent: {},
    modalState: false,
    mobileNavVersion: 'v2',
  },
  getters: {
    getCustomCss(state) {
      return state.customCss;
    },
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
    getModalContent(state) {
      return state.modalContent;
    },
    getModalState(state) {
      return state.modalState;
    },
    getMobileNavVersion(state) {
      return state.mobileNavVersion;
    },
  },
  mutations: {
    setCustomCss(state, customCss) {
      state.customCss = customCss;
    },
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
    setModalContent(state, modalContent) {
      state.modalContent = modalContent;
    },
    setModalState(state, modalState) {
      state.modalState = modalState;
    },
    setMobileNavVersion(state, version) {
      state.mobileNavVersion = version;
    },
  },
});
