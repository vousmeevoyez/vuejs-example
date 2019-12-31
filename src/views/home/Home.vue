<template>
  <el-container>
    <Backlog :backlogs="backlogs" />
    <Card :title="mentor_title" :data="mentors" />
    <Card :title="mentees_title" :data="mentees" />
  </el-container>
</template>
<script>
import Backlog from "./components/Backlog.vue";
import Card from "./components/Card.vue";

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
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          date: "2019-12-30",
          priority: "URGENT",
          status: "COMPLETED"
        },
        {
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          date: "2019-12-30",
          priority: "NORMAL",
          status: "PENDING"
        },
        {
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          date: "2019-12-30",
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
