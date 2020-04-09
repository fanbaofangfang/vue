<template>
  <div>
    <input type="checkbox" :checked="checked" @change="onchange" />
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "checked",
    event: "change"
  },
  methods: {
    onchange(e) {
      console.log(e.target.checked);
      this.$emit("change", e.target.checked);
    }
  }
};
</script>