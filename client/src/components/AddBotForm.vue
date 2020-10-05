<template>
  <div class="container fadeIn">
    <form @submit.prevent="onAddBot">
      <div class="form-group">
        <input
          type="text"
          class="form-control form-control-lg input-form"
          placeholder="Имя бота, но можно оставить пустым"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control form-control-lg input-form"
          v-bind:class="{ 'is-invalid': isError }"
          placeholder="Твой токен"
          v-model="token"
          required
        />
      </div>

      <div>
        <button class="btn btn-dark btn-app" v-if="isLoading">
          ...Секунду ⏳
        </button>
        <button v-else class="btn btn-dark btn-app" type="submit">
          Добавить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      token: "",
      isLoading: false,
      isError: false,
    };
  },
  methods: {
    ...mapActions(["addBot", "fetchBotList"]),
    onClick(step = 0) {
      this.step = step;
    },
    onAddBot() {
      this.isLoading = true;
      this.isError = false;

      if (!/[0-9]{9}:[a-zA-Z0-9_-]{35}/.test(this.token)) {
        this.isError = true;
        this.isLoading = false;
        return;
      }
      this.addBot(this.token).then((isSuccess) => {
        if (isSuccess) {
          this.fetchBotList();
          this.isLoading = false;
          this.$emit("handleClose");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 700px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  padding: 40px;
  background-color: #e0e0e07d;
  border-radius: 40px;
  margin-top: 20px;
  text-align: center;
}
.disabled {
  opacity: 0.7;
  pointer-events: none;
}
button {
  width: 200px;
  justify-self: center;
  margin: 5px;
}

input {
  width: 600px;
}

h1,
h2 {
  margin-bottom: 15px;
}
</style>