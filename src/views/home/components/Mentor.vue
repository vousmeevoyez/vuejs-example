<template>
  <Card :title="Mentor" :data="mentors" :direction="HORIZONTAL" />
</template>
<script>
import Card from "@/components/Card.vue";

export default {
  extends: Card,
  props: {
    mentors: Array
  },
  data() {},
  methods: {}
};
</script>
<style lang="scss"></style>
