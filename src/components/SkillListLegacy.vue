<template>
  <!--
    LEGACY skill list renderer. Kept untouched so old Contentful entries
    (with `percentage`, `doughnutGraph`, …) render exactly as before.
    Marked with data-id-legacy="true" so it can be ripped out cleanly
    once all entries have been migrated to one of the new variants.
  -->
  <div
    ref="list"
    class="skill-list"
    data-id-legacy="true"
    :style="`background: ${content.rgba ?? 'rgba(255,255,255,0.5)'}`"
    @click="handleClick"
  >
    <div class="skill-headline">{{ content.title }}</div>
    <div class="skill-toggle"></div>
    <template v-for="item in content.reference" :key="item.sys.id">
      <div
        v-if="!item.fields.doughnutGraph"
        class="skill-item"
      >
        <div class="skill-item-label">
          <img
            v-if="item?.fields?.icon"
            @contextmenu.prevent
            class="skill-item-image"
            :src="item?.fields?.icon?.fields?.file?.url"
          />
          <span>{{ item.fields.title }}</span>
        </div>
        <div class="skill-item-value">
          <div class="skill-bar">
            <div
              class="skill-bar-level"
              :style="`background: ${content.rgba}; width: ${item.fields.percentage}%`"
            >
              <div
                class="skill-bar-value"
                :style="`left: ${1 + item.fields.percentage}%`"
              >
                {{ item.fields.percentage }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="skill-donut">
        <div
          class="skill-item-donut"
          :style="`background: radial-gradient(white 60%, transparent 61%),
            conic-gradient(${item.fields.doughnutGraphColor ?? '#20ff20'}
            0% ${item.fields.percentage}%, #eee ${
            item.fields.percentage + 3
          }% 100%);`"
        >
          <template v-if="item.fields.icon">
            <div class="skill-item-donut-name">{{ item.fields.title }}</div>
            <img
              @contextmenu.prevent
              class="skill-item-donut-image"
              :src="item.fields.icon.fields?.file?.url"
            />
          </template>
          <template v-else>
            <div class="skill-item-donut-name skill-item-donut-name--nohover">
              {{ item.fields.title }}
            </div>
          </template>
        </div>

        <div class="skill-item-donut-info">
          <RichText :content="item.fields.doughnutGraphContent" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import RichText from './Richtext.vue';

export default {
  name: 'skill-list-legacy',
  components: {
    RichText,
  },
  props: {
    content: [Array, Object],
  },
  methods: {
    handleClick() {
      const element = this.$refs.list;
      const initHeight = 20;

      if (parseInt(element.style.height) > initHeight) {
        element.style.height = `${initHeight}px`;
        element.classList.remove('active');
      } else {
        element.style.height = `${element.scrollHeight - 32}px`;
        element.classList.add('active');
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

/* Legacy-only styles — scoped under [data-id-legacy] so we can grep + nuke
   them when the migration is done. */
.skill-list[data-id-legacy='true'] {
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 24px;
  padding: 16px;
  height: 20px;
  overflow: hidden;
  position: relative;
  transition: height 0.4s;

  &.active {
    .skill-toggle {
      &:before {
        transform: translateY(-50%) rotate(180deg);
      }
      &:after {
        transform: translateY(-50%) rotate(270deg);
      }
    }
  }

  .skill-toggle {
    position: absolute;
    top: 24px;
    right: 0;

    &:before,
    &:after {
      content: '';
      background: $fulutu-black;
      position: absolute;
      top: 50%;
      transition: all 0.3s ease;
      transform: translateY(-50%);
    }

    &:before {
      width: 20px;
      height: 4px;
      right: 12px;
    }
    &:after {
      height: 20px;
      width: 4px;
      right: 20px;
    }
  }

  .skill-item {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    padding: 16px 8px 16px;
    width: 100%;

    @media (min-width: $sm) {
      align-items: center;
      flex-direction: row;
    }

    .skill-item-label {
      flex: 1;
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      @media (min-width: $md) {
        margin-bottom: 0px;
      }
    }

    .skill-item-value {
      flex: 2;
    }

    .skill-bar {
      background: #fff;
      border-radius: 5px;
      position: relative;
      height: 20px;
      width: 100%;

      .skill-bar-level {
        border-radius: 5px;
        height: 20px;
      }

      .skill-bar-value {
        color: rgba($fulutu-grey, 0.7);
        font-size: 14px;
        font-weight: 600;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .skill-headline {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    width: 100%;
  }

  .skill-item-image {
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }

  .skill-donut {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-right: 24px;

    &:hover {
      .skill-item-donut-name:not(.skill-item-donut-name--nohover) {
        font-size: 12px;
        opacity: 0;
      }
      .skill-item-donut-image {
        opacity: 1 !important;
      }
    }

    .skill-item-donut {
      width: 150px;
      height: 150px;
      margin: 8px;
      display: inline-block;
      border-radius: 50%;
      position: relative;

      .skill-item-donut-name {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .skill-item-donut-image {
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: all 0.5s ease;
        width: 36px;
      }
    }
  }
}
</style>
