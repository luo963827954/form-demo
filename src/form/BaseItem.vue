<script>
export default {
  name: "BaseItem",
  props: {
    row: {
      type: Object,
      required: true
    },
    showDetails:Boolean,
    column: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelComputed: {
      get() {
        const { element } = this.column;
        let value = "";

        if (['Cascader','Checkbox'].includes(element)) value = [];

        if(['InputNumber','Rate'].includes(element)) value = null;

        if (this.row[this.column.prop]) {
          value = this.row[this.column.prop];
        }
        return value;
      },
      set(val) {
        this.setRowKey(val);
      }
    }
  },
  methods: {
    setRowKey(val) {
      const { column, row } = this;
      if (column.prop && this.row) {
        this.$set(row, column.prop, val);
      }
    },

    createGrouplist(h, column) {
      const { options = [] } = column;

      if (Array.isArray(options) && options.length) {
        return column.options.map(item => {
          return h(
            column.element,
            {
              props: {...column,...item}
            },
            item.text
          );
        });
      }
      return [];
    },

    createSwitchChildren(h,column){
      const defaultOptions = [{label:"open",text:'开',},{label:"close",text:'关'}];
      const options = column.options? column.options: defaultOptions;
      if(Array.isArray(options) && options.length) {
        return options.map((item)=>{
          return h('span',{
            slot:item.label,
          },item.text)
        })
      }
      return []
    },
    createOption(h,column){

        if(Array.isArray(column.options) &&column.options.length) {
        return column.options.map((item)=>{
          return h('Option',{
            props:{
              value:item.label,
            },
            key:item.label,
          },item.text)
        })
      }
      return []
    },

    createOptionGroup(h,column){
      if(Array.isArray(column.options) && column.options.length){
        return column.options.map((item)=>{
          return h(column.element, {
            props:{
              label:item.title,
            }
          } ,this.createOption(h,item)) 
        })
      }
      return []
    },

    setListenerEvent(eventStr){
      const { listeners={} }= this.column;

      const params = {}
      if(Array.isArray(eventStr) && eventStr.length) {
        eventStr.forEach((item)=>{
          params[item] = function(){
            const arg = Array.prototype.slice.call(arguments)
            if(listeners[item] instanceof Function) {
              listeners[item](...arg)
            } 
          }
        })
      }
      return params;
    },
    getPlaceholder(){
      const arr = ['Input','AutoComplete','InputNumber']
      if(arr.includes(this.column.element)) return `请输入${this.column.label}`;
      return `请选择${this.column.label}`;
    }
  },
  render(h) {
    const { column, row, modelComputed, componentType,showDetails } = this;

    console.log(this, column, row, "formitem formItem");

    if(showDetails)return h('div',modelComputed || '-');

    if (column.element) {
      const placeholder = column.placeholder || this.getPlaceholder();

      const listeners = {
        input: val => {
          this.modelComputed = val;
        },
        ...this.setListenerEvent(['on-change'])
      };

      if (column.element === "Input") {
        return h(column.element, {
          props: {
            ...column,
            placeholder,
            value: modelComputed
          },
          on: listeners
        });
      } else if (["Radio", "Checkbox"].includes(column.element)) {
        return h(
          `${column.element}Group`,
          {
            props: {
              ...column,
              value: modelComputed
            },
            on: listeners
          },
          this.createGrouplist(h, column)
        );

      }else if(['i-switch'].includes(column.element)){
        return h(column.element,{
          props:{...column,value: modelComputed},
          on: listeners,
        },this.createSwitchChildren(h,column))

      }else if(['Select','OptionGroup'].includes(column.element)){
        
        const {label,...selectProps} = column;
        const selectEvent = [
          'on-query-change','on-select','on-clear','on-open-change','on-create'
        ];

        const propsList = {
          props:{
            ...selectProps,
            placeholder,
            value: modelComputed,
          },
          on: Object.assign(listeners,this.setListenerEvent(selectEvent)),
        };

        // Select分组展示
        if(column.element ==='OptionGroup'){
          return h('Select',propsList,this.createOptionGroup(h,column))
        }
        return h(column.element,propsList,this.createOption(h,column));
        
      }else if(['AutoComplete'].includes(column.element)){

        const autoEvent = ['on-select','on-search','on-focus','on-blur','on-clear']

        const autoProps = {
          props:{...column, value: modelComputed,placeholder},
          on: Object.assign(listeners,this.setListenerEvent(autoEvent)),
        };

        if(Array.isArray(column.options) && column.options.length){
          return h(column.element,autoProps,this.createOption(h,column))
        }
        return h(column.element,autoProps);

      } else if(column.element ==='Slider'){
        
        return h(column.element,{
          props:{...column},
          on: Object.assign(listeners,this.setListenerEvent(['on-input'])),  
        })
      }else if(column.element ==='DatePicker'){

        const datePickerEvent = ['on-open-change','on-ok','on-clear','on-clickoutside'];
        const datePickerProps ={
          props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          style:{
            width:'100%',
            ...column.style,
          },
          on: Object.assign(listeners,this.setListenerEvent(datePickerEvent)), 
        };

        return h(column.element,datePickerProps);

      }else if(column.element ==='TimePicker') {
        const timePickerEvent = ['on-open-change','on-ok','on-clear'];
        const timePickerProps ={
          props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          style:{
            width:'100%',
            ...column.style,
          },
          on: Object.assign(listeners,this.setListenerEvent(timePickerEvent)), 
        }
        return h(column.element,timePickerProps);

      }else if(column.element ==='Cascader'){
        const cascaderProps ={
          props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          on: Object.assign(listeners,this.setListenerEvent(['on-visible-change'])), 
        }
        return h(column.element,cascaderProps);

      }else if(column.element ==='InputNumber'){
        const inputNumberEvent = ['on-focus','on-blur'];
        const inputNumberProps={
          props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          style:{
            width:'100%',
            ...column.style,
          },
          on: Object.assign(listeners,this.setListenerEvent(inputNumberEvent)),
        }
        return h(column.element,inputNumberProps)
      }else if(column.element ==='Rate'){

        const rateProps ={
          props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          on: listeners,
        }
        return h(column.element,rateProps)
      }else if(column.element ==='ColorPicker'){
        const colorPickerEvent = ['on-active-change','on-open-change']
        
        const colorPickerProps = {
           props:{
            ...column,
            placeholder,
            value: modelComputed
          },
          on: Object.assign(listeners,this.setListenerEvent(colorPickerEvent)),
        }
        return h(column.element,colorPickerProps)
      }else {
        return h(column.element);
      }
    }else {
      if(column.render instanceof Function){
        return column.render(h,column)
      }
    }
  }
};
</script>