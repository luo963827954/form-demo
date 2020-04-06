
export const createRow = function (h) {
  return h('Row', [...createCol.call(this, h)])
}

export const createCol = function (h) {
  const { columns = [], formData } = this.props;
  console.log(columns, 'createCol');

  if (Array.isArray(columns) && columns.length) {
    return columns.map((column) => {
      return h('Col', {
        style: {
          height: '58px'
        },
        props: {
          span: 12,
          ...column,
        },
        key: column.prop,
      }, [h('FormItem', {
        props: {
          ...column,
        }
      }, [createTags.call(this, h, {
        column,
        row: formData
      })])])
    })
  }
}


export function createTags(h, { column, row = {} }) {
  return h('BaseItem', {
    props: {
      row,
      column,
    }
  })
}