<template>
  <div id="app">
    <div class="img">
    </div>
    <router-view></router-view>
    <div class="box">
      <Icon custom="ivu-icon i-icon i-icon-shop_fill" size="24" />
    <Modal :value="true" :width="1000">
      <BaseForm 
        ref="formValidate" 
        :formData="formData" 
        :showDetails="true" 
        :columns="columns"
      >
      <template #input="{row}">
        <div>
          {{row.input}}
        </div>
      </template>
      </BaseForm>
     </Modal>
    </div>
  </div>
</template>

<script>
import BaseForm from "./form";
import News from './News'


export default {
  name: "app",
  components: {
    BaseForm,News,
  },
  data() {
    return {
      formData:{'input':'22222222222'},
      columns: [
        {
          element: "Input",
          label: "Input",
          prop: "input",
          rules:[
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          options:[
            { label:'1' , text: "React" },
            { label: '2', text: "Vue" },
            { label:'3', text: "Webpack" },
          ],
        },
        {
          element: "Radio",
          label: "Radio",
          prop: "radio",
          options: [
            { label: "1", text: "百度" ,},
            { label: "2", text: "阿里巴巴" ,},
            { label: "3", text: "京东",}
          ],
          listeners:{
            'on-change':(val)=>{
              console.log(val,'radioradio')
            }
          }
        },
        {
          element: "Checkbox",
          label: "Checkbox",
          prop: "checkbox",
          options: [
            { label: "1", text: "百度" },
            { label: "2", text: "阿里巴巴" },
            { label: "3", text: "京东" }
          ],
          
        },
        {
          element: "i-switch",
          label: "Switch",
          prop: "switch",
        },
        {
          element:'Select',
          label:'Select',
          prop:'select',
          multiple:true,
          options:[
            {
              title:"框架",
              options:[
                { label:'1' , text: "React" },
                { label: '2', text: "Vue" },
                { label:'3', text: "Webpack" },
              ]
            },
            {
              title:"BAT",
              options:[
                { label: Math.random() , text: "百度" },
                { label: Math.random() , text: "阿里巴巴" },
                { label: Math.random() , text: "腾讯" },
              ]
            },
          ],
        },
        {
          element: "AutoComplete",
          label: "AutoComplete",
          prop: "AutoComplete",
          data:['React','Vue','Webpack'],
          // options:[
          //   { label:'1', text: "React" },
          //   { label:'2', text: "Vue" },
          //   { label:'3', text: "Webpack" },
          // ],
        },
        {
          element: "Slider",
          label: "Slider",
          prop: "Slider",
        },
        {
          element: "DatePicker",
          label: "DatePicker ",
          prop: "DatePicker",
        },
        {
          element: "TimePicker",
          label: "TimePicker ",
          prop: "TimePicker",
        },
        {
          element: "Cascader",
          label: "Cascader ",
          prop: "Cascader",
          data: [{
            value: 'zhejiang',
            label: '浙江',
            children: [{
                value: 'hangzhou',
                label: '杭州',
                children: [{
                    value: 'xihu',
                    label: '西湖'
                }]
            }]
        }, {
            value: 'jiangsu',
            label: '江苏',
            disabled: true,
            children: [{
                value: 'nanjing',
                label: '南京',
                children: [{
                    value: 'zhonghuamen',
                    label: '中华门'
                }]
            }]
        }]
        },
        {
          element: "InputNumber",
          label: "InputNumber",
          prop: "InputNumber",
        },
        {
          element: "Rate",
          label: "Rate",
          prop: "Rate",
        },
        {
          element: "ColorPicker",
          label: "ColorPicker",
          prop: "ColorPicker",
        },
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
