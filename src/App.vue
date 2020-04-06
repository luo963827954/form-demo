<template>
  <div id="app">
    <div class="img">
      <img src="./assets/logo.png" />
    </div>
    <div class="box">
      <div>{{JSON.stringify(formData)}}</div>
      <!-- <Home /> -->
      <!-- <News /> -->
      <BaseForm ref="formValidate" :formData="formData" :columns="columns" />
      <Button @click="handleSubmit('formValidate')">按钮</Button>
    </div>
  </div>
</template>

<script>
import BaseForm from "./form";
import Home from "./Home";
import News from "./News";

export default {
  name: "app",
  components: {
    BaseForm,
    Home,
    News
  },
  data() {
    return {
      formData: {},
      columns: [
        {
          element: "Input",
          label: "Input",
          prop: "input",
          rules: {
            required: true,
            message: "请输入姓名"
          }
        },
        {
          element: "Radio",
          label: "Radio",
          prop: "radio",
          options: [
            { label: "1", text: "百度" },
            { label: "2", text: "阿里巴巴" },
            { label: "3", text: "京东" }
          ]
        },
        {
          element: "Checkbox",
          label: "Checkbox",
          prop: "checkbox",
          options: [
            { label: "1", text: "百度" },
            { label: "2", text: "阿里巴巴" },
            { label: "3", text: "京东" }
          ]
        },
        {
          element: "Switch",
          label: "Switch",
          prop: "switch"
        }
      ]
    };
  },
  methods: {
    handleSubmit(name) {
      console.log(this.formData);
      this.$refs[name].validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>

<style>
.box {
  width: 1000px;
  padding: 40px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  margin: auto;
}
.img {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
