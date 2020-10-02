<template>
  <form @submit.prevent="onSubmit" class="form form-login">
    <div class="form-group">
      <h1>Регистрация 🎉</h1>
      <label class="form-text text-muted label-form" for="name">Name</label>
      <input
        id="name"
        type="text"
        class="form-control input-form"
        placeholder="Roman Kuzmenko"
        v-model="name"
        required
        autofocus
      />
    </div>
    <div class="form-group">
      <label class="form-text text-muted label-form">Email or username</label>
      <input
        type="text"
        class="form-control input-form"
        required
        placeholder="example@google.com"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label class="form-text text-muted label-form">Password</label>
      <input
        type="password"
        minlength="8"
        class="form-control input-form"
        required
        placeholder="Your password"
        v-model="password"
      />
    </div>

    <div class="grid-row">
      <button class="btn btn-dark button-form" type="submit">Создать</button>
      <div>или</div>
      <button
        class="btn btn-info button-form"
        type="submit"
        @click="$router.push('login')"
      >
        Войти
      </button>
    </div>
  </form>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    onSubmit() {
      this.register({ username: this.email, password: this.password });
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("../assets/form.scss");
</style>