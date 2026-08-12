<template>
  <div v-if="components?.length > 0" class="minified-content">
    <div :class="['minified-content-inner']">
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
        <TextImage
          v-else-if="component.sys.contentType.sys.id == 'textImage'"
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
          :isMini="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RichText from './Richtext';
import AccordionItem from './AccordionItem';
import ImageModalComponent from './ImageModalComponent';
import TextImage from './TextImage';
import ImageContainer from './ImageContainer';
import HorizontalLine from './HorizontalLine';
import PaddingBlock from './PaddingBlock';
import MasonryComponent from './MasonryComponent.vue';

export default {
  components: {
    RichText,
    AccordionItem,
    ImageModalComponent,
    TextImage,
    ImageContainer,
    HorizontalLine,
    PaddingBlock,
    MasonryComponent,
  },
  props: {
    components: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.minified-content {
  padding: 0;
  position: relative;
  padding: 16px 0 64px;
  width: 100%;
}
</style>
