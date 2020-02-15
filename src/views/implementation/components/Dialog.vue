<template>
  <el-dialog title="Create Card" :visible.sync="isVisible" width="30%">
    <el-form :model="cardForm">
      <el-form-item label="Description" :label-width="cardForm.width">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="cardForm.description"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Categories" :label-width="cardForm.width">
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
      <el-form-item label="Due Date" :label-width="cardForm.width">
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
</template>
<script>
export default {
  name: "CardDialog",
  props: {
    isVisible: Boolean,
    options: Array
  }
};
</script>
<style></style>
