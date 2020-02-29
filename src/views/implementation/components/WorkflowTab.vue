<template>
  <el-col>
    <el-row>
      <CardBoard
        title="Backlog"
        :cardCategories="categories"
        :submit="handleCreateCard"
        :deletion="handleDeleteCard"
      />
      <CardBoard
        title="Todo"
        :cardCategories="categories"
        :submit="handleCreateCard"
        :deletion="handleDeleteCard"
      />
      <CardBoard
        title="Doing"
        :cardCategories="categories"
        :submit="handleCreateCard"
        :deletion="handleDeleteCard"
      />
      <CardBoard
        title="Done"
        :cardCategories="categories"
        :submit="handleCreateCard"
        :deletion="handleDeleteCard"
      />
    </el-row>
    <el-row style="display:flex; padding-top: 10px;">
      <el-col style="display:flex; align-items:start;">
        <el-card>
          <span>Categories</span>
          <el-tag
            v-for="(value, key) in categories"
            :key="key"
            :color="value.color"
            type="info"
            style="color:white; margin-left:5px; margin-right:5px;"
          >
            {{ value.label }}
          </el-tag>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import CardBoard from "./CardBoard.vue";

export default {
  name: "WorkflowTab",
  components: {
    CardBoard
  },
  methods: {
    ...mapActions([
      "getUserCard",
      "getUserRoadmap",
      "createCard",
      "deleteCard",
      "triggerSuccess",
      "triggerError"
    ]),
    fetchData() {
      const userId = this.$store.getters["userId"];
      this.getUserCard(userId)
        .then(data => {})
        .catch(({ error }) => {
          this.triggerError(error);
        });
      const roadmapId = this.$store.getters["roadmapId"];
      this.getUserRoadmap(roadmapId)
        .then(data => {})
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    convertToColorCategories(categories) {
      let result = {};
      for (const category of categories) {
        result[category.value] = {
          color: category.color,
          label: category.label
        };
      }
      return result;
    },
    handleCreateCard(flag, cardInfo) {
      this.loading = true;
      cardInfo.status = flag;
      this.createCard(cardInfo)
        .then(data => {
          this.loading = false;
          this.triggerSuccess("Card successfully created");
          this.fetchData();
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    handleDeleteCard(cardInfo) {
      this.deleteCard(cardInfo.id)
        .then(() => {
          this.triggerSuccess("Card successfully removed");
          this.fetchData();
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    categories() {
      return this.convertToColorCategories(this.$store.getters["categories"]);
    }
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>
<style></style>
