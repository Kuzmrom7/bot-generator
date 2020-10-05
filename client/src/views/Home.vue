<template>
  <div class="home" v-if="botStatus === 'loaded'">
    <Menu />
    <BotList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BotList from "@/components/BotList";
import Menu from "@/components/Menu";

export default {
  name: "Home",
  components: { BotList, Menu },
  methods: {
    ...mapActions(["fetchBotList"]),
    onSubmit() {
      this.register({ username: this.email, password: this.password });
    },
  },
  computed: mapGetters(["isEmptyBotList", "botList", "botStatus"]),
  mounted() {
    this.fetchBotList();
  },
};
</script>

<style scoped>
</style>

