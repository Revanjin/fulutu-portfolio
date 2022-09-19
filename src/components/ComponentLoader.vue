<template>
  <div v-if="components?.length > 0">
    <template v-for="(component, index) in components" :key="index">
      <HeroImage
        v-if="component.sys.contentType.sys.id == 'heroImage'"
        :shifted="shifted"
        :content="component?.fields"
      />
    </template>
    <div v-if="!componentIsBackgroundOnly" class="content">
      <div :class="['content-inner', { shifted: shifted }]">
        <div v-for="(component, index) in components" :key="index">
          <RichText
            v-if="component.sys.contentType.sys.id == 'text'"
            :content="component?.fields?.content"
          />
          <AccordionItem
            v-if="component.sys.contentType.sys.id == 'accordion'"
            :content="component?.fields"
          />
          <ImageModal
            v-if="component.sys.contentType.sys.id == 'imageModal'"
            :content="component?.fields"
          />
          <TextImage
            v-if="component.sys.contentType.sys.id == 'textImage'"
            :content="component?.fields"
          />
          <SkillList
            v-if="component.sys.contentType.sys.id == 'skillList'"
            :content="component?.fields"
          />
          <ImageContainer
            v-if="component.sys.contentType.sys.id == 'imageComponent'"
            :content="component?.fields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RichText from './Richtext';
import HeroImage from './HeroImage';
import AccordionItem from './AccordionItem';
import ImageModal from './ImageModal';
import TextImage from './TextImage';
import SkillList from './SkillList';
import ImageContainer from './ImageContainer';

export default {
  components: {
    RichText,
    HeroImage,
    AccordionItem,
    ImageModal,
    TextImage,
    SkillList,
    ImageContainer,
  },
  props: {
    components: Array,
    shifted: Boolean,
    shiftedHeight: String,
  },
  computed: {
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
  top: 188px;
  width: 100%;
  z-index: 10;

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
}

.shifted {
  margin-top: calc(v-bind(shiftedHeight) * -1);
}
</style>
