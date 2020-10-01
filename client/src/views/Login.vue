<template>
  <form @submit.prevent="onSubmit" class="form">
    <h1>Вход 😎</h1>
    <div class="form-group">
      <label class="form-text text-muted label-form">Email:</label>
      <input
        type="text"
        class="form-control input-form"
        required
        placeholder="Your email"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label class="form-text text-muted label-form">Password:</label>
      <input
        type="password"
        class="form-control input-form"
        required
        placeholder="Your password"
        v-model="password"
      />
    </div>

    <div class="grid-row">
      <button class="btn btn-dark button-form" type="submit">Войти</button>
      <div>или</div>
      <button
        @click="$router.push('register')"
        class="btn btn-info button-form"
      >
        Создать акк
      </button>
    </div>
  </form>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      this.login({ username: this.email, password: this.password });
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("../assets/form.scss");
</style>