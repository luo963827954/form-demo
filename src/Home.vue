

<script>
export default {
  render(h) {
    return h("Input", {
      props: {
        placeholder: "请输入姓名",
        maxLength: 10,
        showWordLimit: true
      }
    });
  },
  methods: {
    handleChange() {
      console.log(this, "homehome");
    }
  }
};
</script>