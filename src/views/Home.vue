<template>
  <AddTask v-if="showAddTask" @add-task="addTask" />
  <Tasks :tasks="tasks" />
</template>

<script>
import { useStore } from 'vuex'
import { computed } from "@vue/runtime-core";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { onMounted } from '@vue/runtime-core';

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  
  components: {
    Tasks,
    AddTask,
  },
  setup() {
    const store = useStore();
    onMounted(()=> store.dispatch('fecthTasks'))
    const tasks = computed(() => store.state.tasks);

    return { tasks };
  },
  methods: {},
};
</script>

<style>
</style>