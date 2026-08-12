<template>
  <div v-if="components?.length > 0">
    <template
      v-for="component in components"
      :key="component.sys.contentType.sys.id"
    >
      <HeroImage
        v-if="component.sys.contentType.sys.id == 'heroImage'"
        :shifted="shifted"
        :content="component.fields"
      />
    </template>
    <div
      v-if="!componentIsBackgroundOnly"
      :class="['content', { hasHero: hasHeroImageComponent }]"
    >
      <div :class="['content-inner', { shifted: shifted }]">
        <div
          v-for="component in components"
          :key="component.sys.contentType.sys.id"
        >
          <RichText
            v-if="component.sys.contentType.sys.id == 'text'"
            :content="component.fields?.content"
            :alignment="component.fields?.alignment"
          />
          <AccordionItem
            v-else-if="component.sys.contentType.sys.id == 'accordion'"
            :content="component.fields"
          />
          <ImageModalComponent
            v-else-if="component.sys.contentType.sys.id == 'imageModal'"
            :content="component.fields"
          />
          <ImageModalWrapperComponent
            v-else-if="component.sys.contentType.sys.id == 'imageModalWrapper'"
            :items="component.fields?.references"
          />
          <TextImage
            v-else-if="component.sys.contentType.sys.id == 'textImage'"
            :content="component.fields"
          />
          <SkillList
            v-else-if="component.sys.contentType.sys.id == 'skillList'"
            :content="component.fields"
          />
          <ImageContainer
            v-else-if="component.sys.contentType.sys.id == 'imageComponent'"
            :content="component.fields"
          />
          <HorizontalLine
            v-else-if="component.sys.contentType.sys.id == 'horizontalLine'"
            :content="component.fields"
          />
          <PaddingBlock
            v-else-if="component.sys.contentType.sys.id == 'paddingComponent'"
            :content="component.fields"
          />
          <MasonryComponent
            v-else-if="component.sys.contentType.sys.id == 'masonryComponent'"
            :content="component.fields"
          />
          <SliderComponent
            v-else-if="component.sys.contentType.sys.id == 'sliderComponent'"
            :content="component.fields"
          />
          <SocialsComponent
            v-else-if="component.sys.contentType.sys.id == 'socialsComponent'"
            :content="component.fields"
          />
          <GridComponent
            v-else-if="component.sys.contentType.sys.id == 'gridComponent'"
            :id="component.fields?.title"
            :left-ratio="component.fields?.leftRatio"
            :right-ratio="component.fields?.rightRatio"
            :content-left="component.fields?.contentLeft"
            :content-right="component.fields?.contentRight"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RichText from './Richtext';
import HeroImage from './HeroImage';
import AccordionItem from './AccordionItem';
import ImageModalComponent from './ImageModalComponent';
import ImageModalWrapperComponent from './ImageModalWrapperComponent';
import TextImage from './TextImage';
import SkillList from './SkillList';
import ImageContainer from './ImageContainer';
import HorizontalLine from './HorizontalLine';
import PaddingBlock from './PaddingBlock';
import MasonryComponent from './MasonryComponent.vue';
import SliderComponent from './SliderComponent.vue';
import SocialsComponent from './SocialsComponent.vue';
import GridComponent from './GridComponent.vue';

export default {
  name: 'Component-Loader',
  components: {
    RichText,
    HeroImage,
    AccordionItem,
    ImageModalComponent,
    ImageModalWrapperComponent,
    TextImage,
    SkillList,
    ImageContainer,
    HorizontalLine,
    PaddingBlock,
    MasonryComponent,
    SliderComponent,
    SocialsComponent,
    GridComponent,
  },
  props: {
    components: {
      type: Array,
      default: () => [],
    },
    shifted: {
      type: Boolean,
      default: false,
    },
    shiftedHeight: {
      type: String,
      default: '',
    },
    test: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.$nextTick(() => this._initAnimations());
  },
  updated() {
    this.$nextTick(() => this._initAnimations());
  },
  beforeUnmount() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  },
  methods: {
    _initAnimations() {
      const items = this.$el?.querySelectorAll?.(':scope .content-inner > div');
      if (!items?.length) return;
      let indexOffset = 0;
      items.forEach((el) => {
        if (el.dataset.gsapDone) return;
        el.dataset.gsapDone = '1';
        const delay = indexOffset * 0.01;
        indexOffset++;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
  },
  computed: {
    hasHeroImageComponent() {
      return this.components.some(
        (component) => component.sys.contentType.sys.id === 'heroImage',
      );
    },
    componentIsBackgroundOnly() {
      if (
        this.components.length == 1 &&
        this.components[0].sys.contentType.sys.id == 'heroImage'
      )
        return true;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.content {
  padding: 0;
  position: relative;
  top: 94px;
  padding-bottom: 64px;
  width: 100%;

  @media (min-width: $md) {
    top: 94px;
  }

  &-inner {
    background: $fulutu-white;
    margin-left: auto;
    margin-right: auto;
    padding: 16px 8px 16px;
    width: calc(100% - 16px);

    @media (min-width: $md) {
      padding: 32px 32px 24px;
      width: calc($md - 32px * 2.5);
    }

    @media (min-width: $lg) {
      padding: 48px 64px 32px;
      width: calc($lg - 64px * 2.5);
    }
  }

  &.hasHero {
    top: 0 !important;
  }
}

.shifted {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-top: calc(v-bind(shiftedHeight) * -1);
}
</style>
