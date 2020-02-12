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
                  :before-close="handleClose"
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
                        v-model="category_id"
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
              :card_key="'goal_id'"
              :data="backlog"
              :colors="colors"
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
            v-for="(value, key) in colors"
            :key="value"
            :color="value"
            type="info"
            style="color:white; margin-left:5px; margin-right:5px;"
          >
            {{ key }}
          </el-tag>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import draggable from "vuedraggable";
import CardItem from "@/components/CardItem.vue";
export default {
  name: "WorkflowTab",
  components: {
    CardItem,
    draggable
  },
  props: {
    backlogs: Array,
    todos: Array,
    doings: Array,
    dones: Array
  },
  data() {
    return {
      dialogVisible: false,
      cardForm: {
        width: "120px",
        description: "",
        category_id: "",
        dueDate: ""
      },
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Option2",
          label: "Option2"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Option5",
          label: "Option5"
        }
      ],
      colors: {
        goal_1: "#34495e",
        goal_2: "#3498db",
        goal_3: "#27ae60",
        goal_4: "#f1c40f"
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss"></style>
