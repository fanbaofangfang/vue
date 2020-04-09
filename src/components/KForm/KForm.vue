<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    change() {
      console.log("change");
    },
    validate(cd) {
      let arrs = this.$children
        .filter(item => item["prop"])
        .map(ele => ele.validate());
      Promise.all(arrs)
        .then(() => {
          cd(true);
        })
        .catch(() => {
          cd(false);
        });
    }
  }
};
</script>