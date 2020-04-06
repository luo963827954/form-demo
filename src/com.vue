
<script>
import Home from "./Home";
export default {
  functional: true,
  render(h, con) {
    alert("render");
    console.log(con);
    return h("div", this.cbs);
  },
  props: {
    msg: String
  },
  data() {
    return {
      time: new Date().getTime(),
      foo: "sdfjdshfjdshf"
    };
  },
  computed: {
    cbs() {
      alert("aaa");
      return "111111111";
    }
  },
  directives: {
    "my-time": {
      bind(val, binding) {
        console.log(this, "1111111111", binding);
      }
    }
  },
  methods: {
    hadleChange() {
      console.log(this, "thishtsssssssssss");
    }
  }
};
</script>