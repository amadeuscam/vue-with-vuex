<template>
  <div
    @dblclick="toggleReminder(task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <i @click="deleteTask(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Task",
  props: {
    task: Object,
  },
  setup() {
    const store = useStore();
    const deleteTask = (id) => {store.commit('delete_task',id)};
    const toggleReminder = (id) => {store.dispatch('toggleReminder',id)};
    return { deleteTask, toggleReminder };
  },
};
</script>

<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>