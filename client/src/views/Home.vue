<template>
  <div class="home" v-if="!isEmptyBotList">
    <div>
      <h1>Welcome to platform 🎉</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
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

