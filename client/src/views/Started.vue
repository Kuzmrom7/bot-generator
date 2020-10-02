<template>
  <div>
    <Header />
    <BindBot />
  </div>
</template>

<script>
import BindBot from "@/components/BindBot.vue";
import Header from "@/components/Header";

export default {
  components: {
    BindBot,
    Header,
  },
};
</script>