<template>
  <div>
    <div class="container" v-bind:class="{ disabled: step > 0 }">
      <h1>У вас еще не привязан бот 😟</h1>
      <button
        class="btn btn-outline-dark btn-app"
        type="submit"
        @click="onClick(1)"
      >
        Привязать
      </button>
    </div>

    <div
      class="container fadeIn"
      v-if="step >= 1"
      v-bind:class="{ disabled: step > 1 }"
    >
      <h2>Нужно узнать токен бота 🧐</h2>
      <div>
        <button
          class="btn btn-outline-dark btn-app"
          type="submit"
          @click="onClick(2)"
        >
          Я скопировал
        </button>
        <button class="btn btn-outline-dark btn-app" type="submit">
          Как это сделать
        </button>
      </div>
    </div>

    <div class="container fadeIn" v-if="step >= 2">
      <form @submit.prevent="onAddBot">
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
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      step: 0,
      token: "",
      isLoading: false,
      isError: false,
    };
  },
  computed: mapGetters(["botStatus"]),
  methods: {
    ...mapActions(["addBot"]),
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
      this.addBot(this.token);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 1280px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  padding: 40px;
  background-color: #e0e0e07d;
  border-radius: 40px;
  margin-top: 20px;
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