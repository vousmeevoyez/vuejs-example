<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="cardForm" ref="cardForm" :rules="cardFormRules">
      <el-form-item
        label="Description"
        :label-width="cardForm.width"
        prop="description"
      >
        <el-input type="textarea" :rows="2" v-model="cardForm.description">
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
            v-for="item in categoryOptions"
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
      <el-button @click="handleClose">Cancel</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="handleSubmit"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "CreateCardDialog",
  props: {
    title: String,
    dialog: {
      default: false,
      type: Boolean
    },
    loading: Boolean,
    categoryOptions: Array
  },
  data() {
    return {
      dialogVisible: false,
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
        ]
      }
    };
  },
  methods: {
    convertTitletoFlag(title) {
      let flag = "";
      if (title.includes("Backlog")) {
        flag = "b";
      } else if (title.includes("To-Do")) {
        flag = "t";
      } else if (title.includes("Doing")) {
        flag = "dg";
      } else {
        flag = "d";
      }
      return flag;
    },
    handleSubmit(card) {
      // emit delete to parent
      this.$refs.cardForm.validate(valid => {
        if (valid) {
          // add aditional flag here
          const flag = this.convertTitletoFlag(this.title);
          this.$emit("submit", flag, this.cardForm);
          this.$refs.cardForm.resetFields();
        }
      });
    },
    handleClose() {
      // emit delete to parent
      this.$emit("close");
      this.$refs.cardForm.resetFields();
    }
  }
};
</script>
