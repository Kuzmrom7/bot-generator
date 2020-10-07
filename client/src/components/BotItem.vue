<template>
  <div
    class="bot-card"
    v-bind:class="{
      'bot-card__started': bot.status === 'started',
      'bot-card__stopped': bot.status === 'stopped',
    }"
  >
    <h3>{{ bot.name }}</h3>

    <div class="bot-card__status"><span>Статус:</span> {{ getStatus }}</div>
    <div class="bot-card__status"><span>Токен:</span> {{ bot.token }}</div>
    <div class="bot-card__status"><span>Тип:</span> {{ getType }}</div>

    <div class="bot-card__btn" v-if="bot.status === 'stopped'">
      <button
        class="btn btn-outline-dark btn-app-sm"
        @click.prevent="handleStart"
      >
        ▶️
      </button>
    </div>

    <div class="bot-card__btn" v-if="bot.status === 'started'">
      <button
        class="btn btn-outline-dark btn-app-sm"
        @click.prevent="handleStop"
      >
        ⏸
      </button>
    </div>

    <div class="bot-card__btn" v-if="bot.type === 'none'">
      <button
        class="btn btn-outline-dark btn-app-sm"
        @click.prevent="handleClick"
      >
        Установить ⛏
      </button>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: {
    bot: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getStatus() {
      if (this.bot.status === "created") return "Не уставновлен";
      if (this.bot.status === "started") return "Работает";
      if (this.bot.status === "stopped") return "Остановлен";

      return this.bot.status;
    },
    getType() {
      if (this.bot.type === "none") return "Не уставновлен";
      if (this.bot.type === "default_logic") return "Тестовая логика";
      if (this.bot.type === "monitor") return "Монитор";

      return this.bot.type;
    },
  },
  methods: {
    ...mapActions(["startBot", "stopBot"]),
    handleClick() {
      this.$router.push(`/setup/${this.bot._id}`);
    },
    handleStart() {
      this.startBot(this.bot._id);
    },

    handleStop() {
      this.stopBot(this.bot._id);
    },
  },
};
</script>

<style scoped lang="scss">
.bot-card {
  position: relative;
  width: 380px;
  height: 200px;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  text-align: left;
  margin-right: 20px;

  &__stopped {
    box-shadow: 0px 0px 10px 5px rgba(255, 230, 0, 0.16);
  }

  &__started {
    box-shadow: 0px 0px 10px 5px rgba(14, 216, 71, 0.16);
  }

  &__status {
    margin-top: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      font-weight: 700;
    }
  }

  &__btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>