<template>
  <el-dialog :title="title" :visible.sync="dialog" width="30%">
    <el-form :model="bookForm" ref="bookForm" :rules="bookFormRules">
      <el-form-item
        label="Schedule"
        :label-width="bookForm.width"
        prop="scheduleId"
      >
        <el-select
          v-model="bookForm.scheduleId"
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
      <el-button type="primary" :loading="loading" @click="handleCheckout"
        >Checkout</el-button
      >
    </span>
    <el-dialog
      width="30%"
      title="Book Confirmation"
      :visible.sync="innerDialogVisible"
      :before-close="handleInnerClose"
      append-to-body
    >
      <p v-html="$t('powermentorship.instruction')"></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleInnerClose">Cancel</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click.native.prevent="handleSubmit"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
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
      innerDialogVisible: false,
      bookForm: {
        scheduleId: ""
      },
      bookFormRules: {
        scheduleId: [
          {
            required: true,
            message: "Schedule is required",
            trigger: "change"
          }
        ]
      },
      activeAccordion: ["1", "2"]
    };
  },
  methods: {
    handleCheckout() {
      // emit delete to parent
      this.$refs.bookForm.validate(valid => {
        if (valid) {
          this.innerDialogVisible = true;
        }
      });
    },
    handleSubmit() {
      // emit delete to parent
      this.$emit("submit", this.bookForm);
      this.innerDialogVisible = false;
    },
    handleClose() {
      // emit delete to parent
      this.$emit("close");
      this.$refs.bookForm.resetFields();
    },
    handleInnerClose() {
      // emit delete to parent
      this.innerDialogVisible = false;
    }
  }
};
</script>
