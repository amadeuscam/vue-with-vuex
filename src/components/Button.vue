<template>
  <button @click="add" :style="{ background: color }" class="btn">
    {{ name_btn }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    name_btn: String,
    color: String,
  },
  methods: {
    add() {
      this.$emit('show-add')
    },
  },
};
</script>

<style scoped>
</style>