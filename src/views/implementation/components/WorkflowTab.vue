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
                  <el-form
                    :model="cardForm"
                    ref="cardForm"
                    :rules="cardFormRules"
                  >
                    <el-form-item
                      label="Description"
                      :label-width="cardForm.width"
                      prop="description"
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
                      prop="taskId"
                    >
                      <el-select
                        v-model="cardForm.taskId"
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
                      prop="dueDate"
                    >
                      <el-date-picker
                        v-model="cardForm.dueDate"
                        type="date"
                        placeholder="Pick a Due Date"
                        style="width:100%"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button
                      :loading="loading"
                      type="primary"
                      @click.native.prevent="handleCreateCard('b')"
                      >Confirm</el-button
                    >
                  </span>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
          <draggable
            class="list-group"
            :list="backlogs"
            @change="handleDrag"
            group="card"
          >
            <CardItem
              v-for="(backlog, index) in backlogs"
              :key="index"
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
          <draggable
            class="list-group"
            :list="todos"
            @change="handleDrag"
            group="card"
          >
            <CardItem
              v-for="(todo, index) in todos"
              :key="index"
              card_key="task"
              :data="todo"
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
    ...mapActions([
      "getUserCard",
      "getUserRoadmap",
      "createCard",
      "deleteCard",
      "triggerSuccess",
      "triggerError"
    ]),
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
    },
    handleCreateCard(status) {
      this.$refs.cardForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.cardForm.status = status;
          this.createCard(this.cardForm)
            .then(data => {
              this.loading = false;
              this.triggerSuccess("Card successfully created");
              this.fetchData();
              this.$refs.cardForm.resetFields();
              this.dialogVisible = false;
            })
            .catch(({ error }) => {
              this.triggerError(error);
            });
        }
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
    handleDrag(evt) {
      console.log(evt);
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
      loading: false,
      cardForm: {
        description: "",
        taskId: "",
        dueDate: "",
        status: ""
      },
      cardFormRules: {
        description: [
          {
            required: true,
            message: "Description is required",
            trigger: "change"
          },
          {
            min: 5,
            message: "minimal 5 letter",
            trigger: "blur"
          }
        ],
        taskId: [
          {
            required: true,
            message: "Category is required",
            trigger: "change"
          }
        ],
        dueDate: [
          {
            required: true,
            message: "Due Date is required",
            trigger: "change"
          }
        ]
      },
      options: []
    };
  }
};
</script>
<style></style>
