<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="bookForm" ref="bookForm" :rules="bookFormRules">
      <el-form-item
        label="Schedule"
        :label-width="bookForm.width"
        prop="schedule_id"
      >
        <el-select
          v-model="bookForm.schedule_id"
          placeholder="Select Schedule"
          style="width:100%"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.id"
            :label="item.start | humanDate"
            :value="item.id"
          >
            <span style="float: left">{{ item.start | humanDate }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.start | humanHour
            }}</span>
          </el-option>
        </el-select>
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
  name: "BookDialog",
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
      bookForm: {
        schedule_id: ""
      },
      bookFormRules: {
        schedule_id: [
          {
            required: true,
            message: "Schedule is required",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(card) {
      // emit delete to parent
      this.$refs.bookForm.validate(valid => {
        if (valid) {
          this.$emit("submit", this.cardForm);
          this.$refs.bookForm.resetFields();
        }
      });
    },
    handleClose() {
      // emit delete to parent
      this.$emit("close");
      this.$refs.bookForm.resetFields();
    }
  }
};
</script>
