<template>
  <div class="bot-card">
    <h3>{{ bot.name }}</h3>

    <div class="bot-card__status"><span>Статус:</span> {{ getStatus }}</div>
    <div class="bot-card__status"><span>Токен:</span> {{ bot.token }}</div>
    <div class="bot-card__status"><span>Тип:</span> {{ bot.type }}</div>

    <div class="bot-card__btn" v-if="bot.type === 'none'">
      <button class="btn btn-outline-dark btn-app" @click.prevent="handleClick">
        Установить ⛏
      </button>
    </div>
  </div>
</template>


<script>
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
  },
  methods: {
    handleClick() {
      this.$router.push(`/setup/${this.bot._id}`);
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
    border: 2px solid yellow;
  }

  &__started {
    border: 2px solid green;
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