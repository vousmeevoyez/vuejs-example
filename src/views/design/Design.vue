<template>
  <el-container>
    <el-col>
      <el-tabs type="card">
        <el-tab-pane label="Design">
          <el-col>
            <h1>Your GPS Design</h1>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Implementation">
          <ImplementationTab :schedules="schedules" :calendars="calendars" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-container>
</template>
<script>
import ImplementationTab from "./components/ImplementationTab.vue";

export default {
  name: "DreamDesign",
  components: {
    ImplementationTab
  },
  data() {
    return {
      schedules: [
        {
          goal: "Becoming an expert in public policy",
          tasks: [
            {
              description: "Read 15 books about public policy",
              start: "2019-12-01",
              end: "2019-12-14"
            },
            {
              description: "Research on articles to write",
              start: "2019-12-14",
              end: "2019-12-28"
            }
          ]
        },
        {
          goal: "Becoming an expert in public policy",
          tasks: [
            {
              description: "Read 15 books about public policy",
              start: "2019-12-01",
              end: "2019-12-14"
            },
            {
              description: "Research on articles to write",
              start: "2019-12-14",
              end: "2019-12-28"
            }
          ]
        }
      ],
      calendars: [
        {
          bar: {
            color: "blue"
          },
          dates: {
            start: new Date(2019, 11, 14),
            end: new Date(2019, 11, 28)
          }
        },
        {
          bar: {
            color: "pink"
          },
          dates: {
            start: new Date(2019, 11, 1),
            end: new Date(2019, 11, 14)
          }
        }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
