<template>
  <el-col :span="6" style="padding-right:10px;">
    <el-card>
      <div slot="header">
        <el-row style="display:flex; align-items:center;">
          <el-col :span="12">
            <h1>{{ title }}</h1>
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
      <draggable v-model="cards" group="card">
        <CardItem
          v-for="card in cards"
          :key="card.id"
          card_key="task"
          :data="card"
          :colors="cardCategories"
          @deletion="handleDeleteCard"
        />
      </draggable>
    </el-card>
    <CreateCardDialog
      :title="createCardTitle"
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
  name: "CardBoard",
  components: {
    CreateCardDialog,
    CardItem,
    draggable
  },
  props: {
    title: String,
    cardCategories: Object
  },
  methods: {
    ...mapActions([
      "createCard",
      "deleteCard",
      "updateCards",
      "triggerSuccess",
      "triggerError"
    ]),
    handleCreateCard(flag, cardInfo) {
      this.loading = true;
      cardInfo.status = flag;
      this.createCard(cardInfo)
        .then(data => {
          this.loading = false;
          this.triggerSuccess("Card successfully created");
          this.showCreateCardDialog = false;
          this.$emit("refresh");
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    handleDeleteCard({ id }) {
      this.deleteCard(id)
        .then(() => {
          this.triggerSuccess("Card successfully removed");
          this.showCreateCardDialog = false;
          this.$emit("refresh");
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    handleCloseCard() {
      this.showCreateCardDialog = false;
    }
  },
  computed: {
    categoryOptions() {
      return this.$store.getters["categories"];
    },
    cards: {
      get() {
        // if there any hypens we remove it
        let cleanedTitle = this.title.replace(/-/g, "");
        // add s
        let card = cleanedTitle + "s";
        // convert lowercase
        let lowerCaseCard = card.toLowerCase();
        return this.$store.getters[lowerCaseCard];
      },
      set(value) {
        let cleanedTitle = this.title.replace(/-/g, "");
        this.updateCards({
          cards: value,
          attribute: (cleanedTitle + "s").toUpperCase()
        }).then(data => {});
      }
    },
    createCardTitle() {
      return "Create " + this.title;
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
