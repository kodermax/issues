import React, { Component } from 'react'
import Grid from '../../../components/DxGrid'
import CustomStore from 'devextreme/data/custom_store'
import notify from 'devextreme/ui/notify'
import 'devextreme/ui/autocomplete'
import 'devextreme/ui/text_area'
import $ from 'jquery'
type Props = {
  issueId: Number
}

export default class ProductsGrid extends Component {
  props: Props;
  render() {
    let { issueId } = this.props
    let url = `${process.env.REACT_APP_API_HOST}/requests/purchase/${issueId}/products`
    let token = localStorage.getItem('issuesToken') || ''
    let dataSource = new CustomStore({
      key: ['id'],
      insert: function (values) {
        for (var key in values) {
          if (values[key] instanceof Date) {
            values[key] = values[key].toISOString()
          }
        }
        var deferred = $.Deferred()
        $.ajax({
          url: url,
          method: 'POST',
          data: JSON.stringify(values),
          beforeSend: function (req) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          contentType: 'application/json',
          success: function (result) {
            deferred.resolve(result)
            notify('Запись успешно добавлена!', 'success')
          },
          error: function () {
            notify('Ошибка при добавлении!', 'error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      remove: function (key) {
        var deferred = $.Deferred()
        $.ajax({
          url: url + '/' + encodeURIComponent(key.id),
          beforeSend: function (req) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          method: 'DELETE',
          success: function (result) {
            deferred.resolve(result)
            notify('Товар успешно удален!', 'success')
          },
          error: function () {
            notify('Ошибка при удалении!', 'error')
          }
        })
        return deferred.promise()
      },
      update: function (key, values) {
        var deferred = $.Deferred()
        $.ajax({
          url: url,
          method: 'PUT',
          beforeSend: function (req) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          data: JSON.stringify(Object.assign(key, values)),
          contentType: 'application/json'
        }).done(function () {
          deferred.resolve(key)
          notify('Запись была изменена!', 'success')
        }).fail(function () {
          notify('Ошибка при изменении!', 'error')
        })
        return deferred.promise()
      },
      load: function (loadOptions) {
        let deferred = $.Deferred()
        let args = {}
        if (loadOptions.sort) {
          args.sortBy = loadOptions.sort[0].selector
          if (loadOptions.sort[0].desc) {
            args.sortOrder = 'desc'
          } else {
            args.sortOrder = 'asc'
          }
        }
        args.skip = loadOptions.skip
        args.take = loadOptions.take
        args.filter = loadOptions.filter ? JSON.stringify(loadOptions.filter) : ''
        $.ajax({
          url: url,
          data: args,
          beforeSend: function (req) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          contentType: 'application/json',
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      }
    })
    const contragents = new CustomStore({
      load: function (loadOptions) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/contragents?query=${loadOptions.searchValue}`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      byKey: function (key, extra) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/contragents/${key}`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      }
    })
    const products = new CustomStore({
      load: function (loadOptions) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/products?query=${loadOptions.searchValue}`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      byKey: function (key, extra) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/products/${key}`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      }
    })
    const variants = new CustomStore({
      load: function (loadOptions) {
        let deferred = $.Deferred()
        if (!loadOptions.filter || loadOptions.filter.length <= 2) {
          return deferred.resolve()
        }
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/products/${loadOptions.filter[2]}/variants`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      byKey: function (key, extra) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_HOST}/products/variants/${key}`,
          success: function (result) {
            deferred.resolve(result)
          },
          error: function () {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      }
    })
    const columns = [
      {
        dataField: 'id',
        visible: false,
        formItem: {
          visible: false
        }
      },
      {
        caption: '#',
        width: 50,
        cellTemplate: function (cellElement, cellInfo) {
          cellElement.text(cellInfo.row.rowIndex + 1)
        },
        formItem: {
          visible: false
        }
      },
      {
        caption: 'Номенклатура',
        dataField: 'productId',
        validationRules: [{ type: "required" }],
        lookup: {
          dataSource: products,
          valueExpr: 'id',
          displayExpr: function (data) {
            return data.title + " " + data.unit.title
          },
        },
        cellTemplate: function (container, options) {
          $("<div>")
            .text(options.data.productName)
            .appendTo(container)
        },
        setCellValue: function (rowData, value) {
          rowData.variantId = null
          this.defaultSetCellValue(rowData, value)
        }
      },
      {
        caption: 'Характеристика',
        dataField: 'variantId',
        cellTemplate: function (container, options) {
          $("<div>")
            .text(options.data.variant)
            .appendTo(container)
        },
        lookup: {
          dataSource: function (options) {
            var dataSourceConfiguration = {
              store: variants
            }
            if (options.data) {
              dataSourceConfiguration.filter = ['productId', '=', options.data.productId]
            }
            return dataSourceConfiguration
          },
          valueExpr: 'id',
          displayExpr: 'title'
        },
      },
      {
        dataField: 'unit',
        caption: 'Ед. измерения',
        formItem: {
          visible: false
        }
      },
      {
        dataField: 'article',
        dataType: 'string',
        caption: 'Артикул',
      },
      {
        dataField: 'count',
        caption: 'Кол-во',
        dataType: 'number',
        width: 50,
        validationRules: [{ type: "required" }]
      },
      {
        dataField: 'price',
        caption: 'Цена',
        dataType: 'number'
      },
      {
        dataField: 'sum',
        caption: 'Сумма',
        allowEditing: false
      },
      {
        caption: 'Контрагент',
        dataField: 'contragentId',
        visible: false,
        lookup: {
          dataSource: contragents,
          valueExpr: 'id',
          displayExpr: 'title'
        },
        cellTemplate: function (container, options) {
          $("<div>")
            .text(options.data.contragentName)
            .appendTo(container)
        },
      },
      {
        dataField: 'comment',
        caption: 'Примечание',
        editCellTemplate: function (cellElement, cellInfo) {
          $(cellElement).dxTextArea({
            minHeight: 150,
            height: 150,
            value: cellInfo.value,
            onValueChanged: function (data) {
              cellInfo.setValue(data.value)
            }
          })
        }
      }
    ]
    const paging = {
      pageSize: 50
    }
    const pager = {
      showPageSizeSelector: true,
      allowedPageSizes: [50, 100, 200],
      showInfo: true
    }
    let editing = {}
    if (this.props.editing) {
       editing = {
        mode: 'form',
        popup: {
          title: "Добавление номенклатуры",
          showTitle: true,
          width: 1000,
          height: 375,
          position: {
            my: 'center',
            at: 'center',
            of: window
          }
        },
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true
      }
    }

    const onToolbarPreparing = (e) => {
      let dataGrid = e.component
      e.toolbarOptions.items = []
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          template: function () {
            return $('<div/>')
              .addClass('informer')
              .append(
              $('<h2 />')
                .addClass('count')
                .text('Номенклатура из базы')
              )
          }
        }
      )
      if (this.props.editing) {
        e.toolbarOptions.items.push({
          location: "before",
          widget: "dxButton",
          options: {
            icon: "add",
            text: "Добавить",
            onClick: function () {
              dataGrid.addRow()
            }
          }
        })
      }
    }
    const summary = {
      totalItems: [{
        column: "sum",
        summaryType: "sum",
        valueFormat: "decimal"
      }]
    }
    const stateStoring = {
      enabled: false,
      type: 'sessionStorage',
      storageKey: 'products_grid'
    }
    const onRowPrepared = (info) => {
      if (info.rowType === "data") {
        if (info.data.delivered) {
          info.rowElement.css('background', '#DCEDC8')
        }
      }
    }
    return (
      <Grid gridId="products" editing={editing} columns={columns} dataSource={dataSource} paging={paging} pager={pager}
        onToolbarPreparing={onToolbarPreparing} allowColumnReordering allowColumnResizing
        twoWayBindingEnabled={false} rowAlternationEnabled={false}
        stateStoring={stateStoring} onRowPrepared={onRowPrepared} summary={summary}
      />
    )
  }
}
