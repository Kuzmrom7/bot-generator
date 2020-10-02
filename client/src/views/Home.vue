<template>
  <div class="home" v-if="botStatus === 'loaded'">
    <Header />
    <BotList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/Header";
import BotList from "@/components/BotList";

export default {
  name: "Home",
  components: { Header, BotList },
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

