<template>
  <div>
    <div class="menu-app">
      <div
        class="menu-item"
        v-bind:class="{ 'menu-item__active': this.$route.path === '/' }"
        @click="handlePush('/')"
      >
        Все боты
      </div>
      <div
        class="menu-item"
        v-bind:class="{ 'menu-item__active': this.$route.path === '/monitor' }"
        @click="handlePush('/monitor')"
      >
        Мониторинг
      </div>

      <div class="menu-item">Чат-боты</div>
      <div
        v-bind:class="{ 'menu-item__active': isAddBotVisible }"
        class="menu-item menu-item__left"
        @click="onClickAdd"
      >
        Добавить бота
      </div>
      <div class="menu-item" @click.prevent="logout">Выйти</div>
    </div>
    <AddBotForm v-if="isAddBotVisible" @handleClose="onClickAdd" />
  </div>
</template>


<script>
import { mapActions } from "vuex";
import AddBotForm from "./AddBotForm";

export default {
  components: { AddBotForm },
  data() {
    return {
      path: "",
      isAddBotVisible: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    onClickAdd() {
      this.isAddBotVisible = !this.isAddBotVisible;
    },

    handlePush(path = "/") {
      this.$router.push(path);
    },
  },

  mounted() {
    const path = this.$route.path;
    this.path = path;
  },
};
</script>

<style lang="scss" scoped>
.menu-app {
  width: 1280px;
  display: flex;
  margin: 10px auto;
}

.menu-item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e07d;
  min-width: 120px;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  font-weight: 700;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: white;
    background-color: #333;
  }

  &__active {
    color: white;
    background-color: #333;
  }

  &__left {
    margin-left: auto;
  }
}
</style>