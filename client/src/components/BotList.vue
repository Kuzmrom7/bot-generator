<template>
  <div>
    <div class="container-app">
      <div class="bot-list">
        <BotItem v-for="bot in botList" :key="bot._id" :bot="bot" />
      </div>
    </div>
  </div>
</template>

<script>
import BotItem from "./BotItem";

import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["botList"]),
  components: { BotItem },
  data() {
    return {
      isAddBotVisible: false,
    };
  },
  methods: {
    onClickAdd() {
      this.isAddBotVisible = !this.isAddBotVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.bot-list {
  display: flex;
  flex-wrap: wrap;
}
</style>