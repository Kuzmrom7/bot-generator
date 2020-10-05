<template>
  <div>
    <Menu @handleAdd="onClickAdd" />

    <AddBotForm v-if="isAddBotVisible" @handleClose="onClickAdd" />

    <div class="container-app">
      <div class="bot-list">
        <BotItem v-for="bot in botList" :key="bot._id" :bot="bot" />
      </div>
    </div>
  </div>
</template>

<script>
import BotItem from "./BotItem";
import AddBotForm from "./AddBotForm";
import Menu from "./Menu";

import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["botList"]),
  components: { BotItem, AddBotForm, Menu },
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
}
</style>