<template>
  <div
    class="skill-list"
    :style="`background: ${content.rgba ?? 'rgba(255,255,255,0.5)'}`"
  >
    <div class="skill-headline">{{ content.title }}</div>
    <template v-for="item in content.reference">
      <div
        v-if="!item.fields.doughnutGraph"
        class="skill-item"
        :key="item.sys.id"
      >
        <div class="skill-item-label">{{ item.fields.title }}</div>
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
      <div v-else class="skill-donut" :key="item.sys.id">
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
              class="skill-item-donut-image"
              :src="item.fields.icon.fields?.file?.url"
            /> </template
          ><template v-else>
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
  name: 'skill-list',
  components: {
    RichText,
  },
  props: {
    content: [Array, Object],
  },
  mounted() {
    console.log(this.content);
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.skill-list {
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 16px;

  .skill-item {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    padding: 16px 8px 24px;
    width: 100%;

    @media (min-width: $sm) {
      align-items: center;
      flex-direction: row;
    }

    .skill-item-label {
      flex: 1;
    }

    .skill-item-value {
      flex: 2;
    }

    .skill-bar {
      background: #fff;
      border-radius: 3px;
      position: relative;
      height: 10px;
      width: 100%;

      .skill-bar-level {
        border-radius: 3px;
        height: 10px;
      }

      .skill-bar-value {
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
