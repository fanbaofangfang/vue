<template>
  <div>
    {{$store.state.count}}
    {{$store.getters.score}}
    <button @click="add">add</button>
    <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>
<script>
export default {
  methods: {
    add() {
      this.$store.commit("add", 2);
    },
    asyncAdd() {
      this.$store.dispatch("asyncAdd", 5);
    }
  }
};
</script>