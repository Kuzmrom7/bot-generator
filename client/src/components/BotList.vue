<template>
  <div>
    <div class="container-app">
      <h1>Ваши боты 🤖</h1>

      <div>
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
};
</script>

<style lang="scss" scoped>
.bot-list {
  display: flex;
}
</style>