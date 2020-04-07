<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>
<script>
import schema from "async-validator";
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  inject: ["form"],
  data() {
    return {
      errorMessage: ""
    };
  },
  mounted() {
    this.$on("validate", this.validate);
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      var desc = {
        [this.prop]: rules
      };
      const validator = new schema(desc);
      return validator.validate({ [this.prop]: value }, (error, fileds) => {
        console.log(error, fileds);
      });
    }
  }
};
</script>