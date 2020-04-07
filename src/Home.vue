

<script>
export default {
  render(h) {
    return h("Select",{  
      value:'0'
    },[h('Option',{value:'0'},'百度')])
  },
  methods: {
    handleChange() {
      console.log(this, "homehome");
    }
  }
};
</script>