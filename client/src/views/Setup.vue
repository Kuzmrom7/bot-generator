<template>
  <div>
    <Menu />
    <div class="container-app fadeIn">
      <h1>Установка 🔨</h1>
      <div class="setup">
        <form class="form-setup" @submit.prevent="onSubmit">
          <div class="form-group">
            <label class="form-text text-muted label-form">Имя бота:</label>
            <input
              type="text"
              class="form-control form-control-lg input-form"
              placeholder="Имя бота"
              v-model="getBotData.name"
              disabled
            />
          </div>

          <div class="form-group">
            <label class="form-text text-muted label-form"
              >Нужно выбрать тип бота:</label
            >
            <select
              class="form-control form-control-lg"
              v-model="getBotData.type"
            >
              <option value="none" disabled>Выберите тип</option>
              <option value="default_logic">Тестовая логика</option>
              <!-- <option value="monitor">Мониторинг</option> -->
            </select>
          </div>

          <div
            v-if="getBotData.type === 'default_logic'"
            class="alert alert-dark"
            role="alert"
          >
            Тестовая логика всего лишь позволит вам попробовать инструмент.
            Кстати, бот будет запущен сразу!
          </div>

          <div v-if="getBotData.type === 'monitor'">
            <hr />
            <div class="form-group">
              <label class="form-text text-muted label-form"
                >URL сайта за которым будем следить:</label
              >
              <input
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                type="url"
                class="form-control form-control-lg input-form"
                v-model="url"
              />
            </div>

            <div class="form-group">
              <label class="form-text text-muted label-form"
                >Укажите Chat ID куда бот будет слать скриншот:</label
              >
              <input
                placeholder="-420888311"
                type="text"
                class="form-control form-control-lg input-form"
                v-model="chatId"
              />
            </div>

            <div class="alert alert-dark" role="alert">
              Добавьте своего бота в группу!
            </div>

            <div class="form-group">
              <label class="form-text text-muted label-form"
                >Нужно выбрать интервал для бота:</label
              >
              <select
                class="form-control form-control-lg"
                v-model="selectedTime"
              >
                <option value="10">10 минут</option>
                <option value="30">30 минут</option>
                <option value="60">60 минут</option>
                <option value="90">90 минут</option>
              </select>
            </div>
          </div>

          <button
            v-if="getBotData.type && getBotData.type !== 'none'"
            class="btn btn-dark btn-app"
            type="submit"
          >
            Готово ✅
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Menu from "@/components/Menu";

export default {
  data() {
    return {
      name: "Your bot asome name",
      selected: "default_logic",
      url: "",
      chatId: "",
      selectedTime: "10",
    };
  },
  components: { Menu },
  computed: mapGetters(["getBotData"]),
  methods: {
    ...mapActions(["bindType", "fetchBot"]),
    onSubmit() {
      this.bindType({
        _id: this.getBotData._id,
        type: this.getBotData.type,
      }).then(() => this.$router.push("/"));
    },
  },

  mounted() {
    this.fetchBot(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import url("../assets/form.scss");

button {
  width: 200px;
  justify-self: center;
  margin: 5px;
}

select,
input {
  width: 400px;
}

h1,
h2 {
  margin-bottom: 15px;
}

.setup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-setup {
  max-width: 400px;
}
</style>