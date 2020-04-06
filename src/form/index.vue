
<script>
import * as layouts from "./layouts";

export default {
  functional: true,
  render(h, context) {
    if (context.props.formData) {
      context.data.attrs.model = context.props.formData;
    }

    if (!context.data.attrs.labelWidth) {
      context.data.attrs.labelWidth = 100;
    }
    console.log(context, "form form");
    return h("Form", context.data, [layouts.createRow.call(context, h)]);
  },
  props: {
    formData: Object,
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mounted() {
    console.log(this.$refs);
  }
};
</script>