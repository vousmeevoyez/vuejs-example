<template>
  <el-container>
    <el-col>
      <el-col :span="12" style="padding-right:10px">
        <Backlog :backlogs="backlogs" />
      </el-col>
      <el-col :span="6" style="padding-right: 10px">
        <Card :title="mentor_title" :data="mentors" />
      </el-col>
      <el-col :span="6" style="padding-right: 10px">
        <Card :title="mentees_title" :data="mentees" />
      </el-col>
    </el-col>
  </el-container>
</template>
<script>
import Backlog from "./components/Backlog.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Backlog,
    Card
  },
  data() {
    return {
      mentor_title: "Mentor",
      mentees_title: "Mentees",
      backlogs: [
        {
          description: "Lorem Ipsum is simply dummy text of the printing ",
          tag: "2019-12-30",
          priority: "URGENT",
          status: "COMPLETED"
        },
        {
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting ",
          tag: "2019-12-30",
          priority: "NORMAL",
          status: "PENDING"
        },
        {
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting ",
          tag: "2019-12-30",
          priority: "NORMAL",
          status: "IN_PROGRESS"
        }
      ],
      mentors: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        }
      ],
      mentees: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1061567315978805248/IfE32ScZ_400x400.jpg",
          name: "Kim Jisoo"
        }
      ]
    };
  },
  methods: {
    menuToggle() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="scss"></style>
