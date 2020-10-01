<template>
  <BindBot />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BindBot from "@/components/BindBot.vue";
export default {
  computed: mapGetters(["isEmptyBotList"]),
  components: {
    BindBot,
  },
  methods: mapActions(["fetchBotList"]),
};
</script>