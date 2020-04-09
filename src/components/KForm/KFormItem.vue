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
  name: "KFormItem",
  componentName: "KFormItem",
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
    this.$on("el.form.change", this.onFieldChange);
  },
  methods: {
    onFieldChange() {
      this.validate();
    },
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      var desc = {
        [this.prop]: rules
      };
      const validator = new schema(desc);
      return validator.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = "";
        }
      });
    }
  }
};
</script>