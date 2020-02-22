<template>
  <el-col>
    <el-row>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <div slot="header">
            <el-row style="display:flex; align-items:center;">
              <el-col :span="12">
                <h1>Backlog</h1>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="showCreateCardDialog = true"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <draggable v-model="backlogs" group="card">
            <CardItem
              v-for="backlog in backlogs"
              :key="backlog.id"
              card_key="task"
              :data="backlog"
              :colors="categories"
              @deletion="handleDeleteCard"
            />
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <div slot="header">
            <el-row>
              <h1>Todo</h1>
            </el-row>
          </div>
          <draggable v-model="todos" group="card">
            <CardItem
              v-for="todo in todos"
              :key="todo.id"
              card_key="task"
              :data="todo"
              :colors="categories"
              @deletion="handleDeleteCard"
            />
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <div slot="header">
            <el-row>
              <h1>Doing</h1>
            </el-row>
          </div>
          <draggable v-model="doings" group="card">
            <CardItem
              v-for="doing in doings"
              :key="doing.id"
              card_key="task"
              :data="doing"
              :colors="categories"
              @deletion="handleDeleteCard"
            />
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <div slot="header">
            <el-row>
              <h1>Done</h1>
            </el-row>
          </div>
          <draggable v-model="dones" group="card">
            <CardItem
              v-for="done in dones"
              :key="done.id"
              card_key="task"
              :data="done"
              :colors="categories"
              @deletion="handleDeleteCard"
            />
          </draggable>
        </el-card>
      </el-col>
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
    <CreateCardDialog
      title="Create Backlog"
      :categoryOptions="categoryOptions"
      :loading="loading"
      :dialog.sync="showCreateCardDialog"
      @submit="handleCreateCard"
      @close="handleCloseCard"
    />
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
import CardItem from "@/components/CardItem.vue";
import CreateCardDialog from "./CreateCardDialog.vue";

export default {
  name: "WorkflowTab",
  components: {
    CreateCardDialog,
    CardItem,
    draggable
  },
  methods: {
    ...mapActions([
      "getUserCard",
      "getUserRoadmap",
      "createCard",
      "deleteCard",
      "updateCards",
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
    handleCreateCard(cardInfo) {
      this.loading = true;
      cardInfo.status = "b";
      this.createCard(cardInfo)
        .then(data => {
          this.loading = false;
          this.triggerSuccess("Card successfully created");
          this.fetchData();
          this.showCreateCardDialog = false;
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
    },
    handleCloseCard() {
      this.showCreateCardDialog = false;
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    categories() {
      return this.convertToColorCategories(this.$store.getters["categories"]);
    },
    categoryOptions() {
      return this.$store.getters["categories"];
    },
    backlogs: {
      get() {
        return this.$store.getters["backlogs"];
      },
      set(value) {
        this.updateCards({
          cards: value,
          attribute: "BACKLOGS"
        }).then(data => {});
      }
    },
    todos: {
      get() {
        return this.$store.getters["todos"];
      },
      set(value) {
        this.updateCards({
          cards: value,
          attribute: "TODOS"
        }).then(data => {});
      }
    },
    doings: {
      get() {
        return this.$store.getters["doings"];
      },
      set(value) {
        this.updateCards({
          cards: value,
          attribute: "DOINGS"
        }).then(data => {});
      }
    },
    dones: {
      get() {
        return this.$store.getters["dones"];
      },
      set(value) {
        this.updateCards({
          cards: value,
          attribute: "DONES"
        }).then(data => {});
      }
    }
  },
  data() {
    return {
      loading: false,
      showCreateCardDialog: false
    };
  }
};
</script>
<style></style>
