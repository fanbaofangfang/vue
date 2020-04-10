<template>
  <div v-if="isShow">
    <h4>{{title}}</h4>
    <h4>{{message}}</h4>
  </div>
</template>
<script>
export default {
  name: "notice",
  props: {
    title: String,
    message: String,
    duration: Number
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.hide();
      }, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>