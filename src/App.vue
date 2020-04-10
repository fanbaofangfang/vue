<template>
  <div id="app">
    <!-- <KForm :model="model" :rules="rules" ref="form">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" type="text" />
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password" />
      </KFormItem>
      <KFormItem>
      <KCheckbox :checked="model.remember" @change="model.remember=$event" />
      <KCheckbox v-model="model.remember" />
      <KCheckbox v-model="model.remember" />
      </KFormItem>
      <KFormItem>
        <button @click="loginIn">Login</button>
      </KFormItem>
    </KForm>-->
    <router-link to="/home">Home</router-link>
    <div></div>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import KForm from "./components/KForm/KForm";
// import KFormItem from "./components/KForm/KFormItem";
// import KInput from "./components/KForm/KInput";
// import KCheckbox from "./components/KForm/KCheckbox";
import Notice from "./components/Notice/index";
import create from "./utils/create";
export default {
  name: "App",
  components: {
    // KForm,
    // KFormItem,
    // KInput,
    // KCheckbox
  },
  data() {
    return {
      model: {
        username: "jon",
        password: "",
        remember: false
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }]
      }
    };
  },
  methods: {
    loginIn() {
      let notice;
      this.$refs.form.validate(isValid => {
        let message = "";
        if (isValid) {
          message = "success";
          // alert("loginIn");
        } else {
          // alert("fail");
          message = "fail";
        }
        notice = create(Notice, {
          title: "xxx",
          message: message,
          duration: 10000
        });
        // console.log(notice, "notice");
        notice.show();
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
