<template>
  <div class="bubble-wrapper">
    <a
      v-for="item in data[0]?.fields?.reference"
      class="bubble bubble-item"
      ref="bubble-item"
      target="_blank"
      :href="item.fields.url"
      :key="item.sys.id"
    >
      <img :src="item.fields.image.fields.file.url" :alt="item.title" />
    </a>

    <div class="bubble bubble-open" ref="open-bubble" @click="openBubbles">
      <div class="talk-bubble">
        <div class="talktext">Click me.</div>
      </div>
      <img src="../assets/favicon.png" alt="favicon" />
    </div>
    <div
      class="bubble bubble-close"
      ref="close-bubble"
      @click="closeBubbles"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BubbleButton',
  data() {
    return {
      data: [],
    };
  },
  async mounted() {
    if (this.data.length == 0) {
      this.setSocialMediaList();
    }
  },
  computed: {
    ...mapGetters(['getSocialMedia']),
  },
  methods: {
    setSocialMediaList() {
      this.data = this.getSocialMedia;
    },
    openBubbles() {
      if (this.data.length > 0) {
        const openButton = this.$refs['open-bubble'];
        openButton.style.display = 'none';

        const closeButton = this.$refs['close-bubble'];
        closeButton.style.display = 'block';

        const bubbleItems = this.$refs['bubble-item'];

        bubbleItems.forEach((item, index) => {
          item.style.marginBottom = `${50 + index * 55}px`;
          item.style.opacity = 1;
        });
      } else {
        this.setSocialMediaList();
        setTimeout(this.openBubbles, 50);
      }
    },
    closeBubbles() {
      if (this.data.length > 0) {
        const openButton = this.$refs['open-bubble'];
        openButton.style.display = 'block';

        const closeButton = this.$refs['close-bubble'];
        closeButton.style.display = 'none';

        const bubbleItems = this.$refs['bubble-item'];

        bubbleItems.forEach((item) => {
          item.style.marginBottom = 0;
          item.style.opacity = 0;
        });
      } else {
        this.setSocialMediaList();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main.scss';

.bubble {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 20px;
  bottom: 5px;
  cursor: pointer;
  transition: all 0.4s ease;
  z-index: 12;
}

.bubble-wrapper {
  bottom: 0;
  right: 0;
  position: fixed;
  user-select: none;
  z-index: 12;
}

.bubble-item {
  background: rgba($fulutu-white, 0.5);
  border-radius: 8px;
  height: 36px;
  width: 36px;
  opacity: 0;
  position: absolute;
  padding: 2px;

  &:hover {
    background: $fulutu-blue;
  }

  > img {
    width: 36px;
    height: 36px;
  }
}

.bubble-open {
  display: block;

  > img {
    width: 40px;
    height: 40px;
  }
}

.bubble-close {
  display: none;

  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 20px;
    background: $fulutu-black;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:after {
    content: '';
    position: absolute;
    width: 4px;
    height: 20px;
    background: $fulutu-black;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

.form {
  position: absolute;
  width: 150px;
  height: 200px;
  right: 0;
  opacity: 0;
  bottom: 30px;
  overflow: hidden;
  transition: all 0.3s ease-in;
  z-index: 0;
}

.talk-bubble {
  position: absolute;
  background-color: $fulutu-rose;
  bottom: 50px;
  right: 20px;

  .talktext {
    padding: 8px;
    white-space: nowrap;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: 0px;
    bottom: -10px;
    border: 5px solid;
    border-color: $fulutu-rose $fulutu-rose transparent transparent;
  }
}
</style>
