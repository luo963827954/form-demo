<script>
export default {
  name: "BaseItem",
  props: {
    row: {
      type: Object,
      required: true
    },
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

        if (element === "Checkbox") value = [];

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
              props: {
                ...item
              }
            },
            item.text
          );
        });
      }
      return [];
    }
  },
  render(h) {
    const { column = {}, row, modelComputed, componentType } = this;
    const {
      element,
      placeholder,
      label,
      listeners = {},
      options = []
    } = column;
    console.log(this, column, row, "formitem formItem");

    if (column.element) {
      const placeholder = placeholder || `请输入${label}`;
      const listeners = {
        input: val => {
          this.modelComputed = val;
        },
        ...listeners
      };

      const nodeList = ["Radio", "Checkbox"];

      if (column.element === "Input") {
        return h(column.element, {
          props: {
            ...column,
            placeholder,
            value: modelComputed
          },
          on: listeners
        });
      } else if (nodeList.includes(column.element)) {
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
      } else {
        return h(column.element);
      }
    }
  }
};
</script>