<template>
  <div class="bot-card">
    <h3>{{ bot.name }}</h3>

    <div class="bot-card__status"><span>Статус:</span> {{ bot.status }}</div>
    <div class="bot-card__status"><span>Токен:</span> {{ bot.token }}</div>

    <div class="bot-card__btn">
      <button class="btn btn-outline-dark btn-app">Установить ⛏</button>
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