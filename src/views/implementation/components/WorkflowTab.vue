<template>
  <el-col>
    <el-row>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <h1>Backlog</h1>
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
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <h1>To-Do</h1>
          <draggable :list="todos">
            <CardItem
              v-for="(todo, index) in todos"
              :key="index"
              :card_key="'goal_id'"
              :data="todo"
              :colors="colors"
            />
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <h1>Doing</h1>
          <draggable :list="doings">
            <CardItem
              v-for="(doing, index) in doings"
              :key="index"
              :card_key="'goal_id'"
              :data="doing"
              :colors="colors"
            />
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right:10px;">
        <el-card>
          <h1>Done</h1>
          <draggable :list="dones">
            <CardItem
              v-for="(done, index) in dones"
              :key="index"
              :card_key="'goal_id'"
              :data="done"
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
