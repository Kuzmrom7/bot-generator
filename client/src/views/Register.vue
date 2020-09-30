<template>
  <form @submit.prevent="register" class="form">
    <div class="form-group">
      <h1>Sign Up</h1>
      <label class="form-text text-muted label-form " for="name">Name</label>
      <input
        id="name"
        type="text"
        class="form-control input-form"
        placeholder="Your name"
        v-model="name"
        required
        autofocus
      />
    </div>
    <div class="form-group">
      <label class="form-text text-muted label-form ">Email</label>
      <input
        type="email"
        class="form-control input-form"
        required
        placeholder="Your email"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label class="form-text text-muted label-form ">Password</label>
      <input
        type="password"
        class="form-control input-form"
        required
        placeholder="Your password"
        v-model="password"
      />
    </div>

    <div class="grid-row">
      <button class="btn btn-success button-form" type="submit">Sign Up</button>
      <div>or</div>
      <button
        class="btn btn-primary button-form"
        type="submit"
        @click="$router.push('login')"
      >
        Login
      </button>
    </div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      console.log(this.email, this.password);
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("../assets/form.scss");
</style>