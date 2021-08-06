<template>
  <AddTask v-if="showAddTask" @add-task="addTask" />

  <Tasks
    :tasks="$store.state.tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  created() {
    this.$store.dispatch("get_data_backend");
  },
  methods: {},
};
</script>

<style>
</style>