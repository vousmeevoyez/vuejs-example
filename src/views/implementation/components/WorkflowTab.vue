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
                  @click="dialogVisible = true"
                ></el-button>
                <el-dialog
                  title="Create Card"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <el-form :model="cardForm">
                    <el-form-item
                      label="Description"
                      :label-width="cardForm.width"
                    >
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="Please input"
                        v-model="cardForm.description"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      label="Categories"
                      :label-width="cardForm.width"
                    >
                      <el-select
                        v-model="cardForm.category_id"
                        placeholder="Select Category"
                        style="width:100%"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Due Date"
                      :label-width="cardForm.width"
                    >
                      <el-date-picker
                        v-model="cardForm.dueDate"
                        type="date"
                        placeholder="Pick a day"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false"
                      >Confirm</el-button
                    >
                  </span>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
          <draggable :list="backlogs" @change="log">
            <CardItem
              v-for="(backlog, index) in backlogs"
              :key="index"
              card_key="task"
              :data="backlog"
              :colors="categories"
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
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
import CardItem from "@/components/CardItem.vue";
export default {
  name: "WorkflowTab",
  components: {
    CardItem,
    draggable
  },
  methods: {
    ...mapActions(["getUserCard", "getUserRoadmap", "triggerError"]),
    fetchData() {
      const implementation = this.$store.state.implementation;
      this.getUserCard()
        .then(data => {
          this.backlogs = implementation.backlogs;
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
      this.getUserRoadmap()
        .then(data => {
          this.options = implementation.categories;
        })
        .catch(({ error }) => {
          this.triggerError(error);
        });
    },
    filterCards(status) {
      const cards = this.$store.state.implementation.cards;
      const filteredCards = cards.filter(card => {
        return card.status === status;
      });
      return filteredCards;
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
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    categories() {
      return this.convertToColorCategories(
        this.$store.state.implementation.categories
      );
    },
    backlogs() {
      return this.filterCards("b");
    },
    todos() {
      return this.filterCards("t");
    }
  },
  data() {
    return {
      dialogVisible: false,
      cardForm: {
        description: "",
        category_id: "",
        dueDate: ""
      },
      options: []
    };
  }
};
</script>
<style lang="scss"></style>
