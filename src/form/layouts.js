
export const createRow = function (h) {
  return h('Row', [...createCol.call(this, h)])
}

export const createCol = function (h) {
  const { columns = [], formData,showDetails,span } = this.props;
  console.log(columns, 'createCol');

  if (Array.isArray(columns) && columns.length) {
    return columns.map((column) => {

      return h('Col', {
        style: {
          height: '58px'
        },
        props: {
          span: column.span || span || 12,
          ...column,
        },
        key: column.prop,
      }, [h('FormItem', {
        props: {
          ...column,
        }
      }, [createTags.call(this, h, {
        column,
        showDetails,
        row: formData
      })])])
    })
  }
}


export function createTags(h, { column, row = {},showDetails }) {
  let VNode = null
  const scopedSlots = this.scopedSlots || this.$scopedSlots
  const slots = this.slots && this.slots();

  if (scopedSlots && column.prop && scopedSlots[column.prop]) {
    VNode = scopedSlots[column.prop]({ row, column })
  } else if (slots && column.prop && slots[column.prop]) {
    VNode = slots[column.prop]
  }
 
  if(VNode) return VNode ;

  return h('BaseItem', {
    props: {
      row,
      column,
      showDetails,
    }
  })
}