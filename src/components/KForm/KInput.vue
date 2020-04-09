<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>
<script>
import emitter from "../../mixins/emitter";
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String
    }
  },
  mixins: [emitter],
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      this.dispatch("KFormItem", "el.form.change", [e.target.value]);
    }
  }
};
</script>