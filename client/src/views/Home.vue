<template>
  <div class="home">
    <BindBot v-if="isEmptyBotList" />
  </div>
</template>

<script>
import BindBot from "@/components/BindBot.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    BindBot,
  },
  methods: {
    ...mapActions(["fetchBotList"]),
    onSubmit() {
      this.register({ username: this.email, password: this.password });
    },
  },
  computed: mapGetters(["isEmptyBotList"]),
  mounted() {
    this.fetchBotList();
  },
};
</script>

