import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import 'devextreme/ui/select_box'
import $ from 'jquery'
import Grid from '../../../../components/DxGrid'
import DataSource from 'devextreme/data/data_source'

type Props = {
    onSave: Function,
    data: Object,
    readOnly: Boolean,
    type: String
}
const styles = {
  button: {
    marginTop: '10px',
    marginLeft: '10px',
    flex: 1
  },
  group: {
    margin: '0'
  }
}
const companies = [
    {
      text: 'АО "Компания 1"',
      value: '69812854-f6d9-11df-91c0-002215596dc5'
    },
    {
      text: 'ООО "ПФК" Компания 2"',
      value: 'ade11f58-a06a-11df-8212-e0cb4e77a365'
    }
]
class FormComponent extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps : Object) {

  }
  props: Props;

  handleSubmit(e: Object) {
    let form = $('#form').dxForm('instance')
    var result = form.validate()
    var items = $('#ac').dxDataGrid('instance').option('dataSource').items()
    if (result.isValid && items.length > 0) {
      let companyId = form.getEditor('company.id').option('value')
      let companyTitle = ''
       for (let i = 0; i < companies.length; i++) {
          if (companies[i].value === companyId) {
            companyTitle = companies[i].text
          }
       }
      let request = {
        'company'    : {
            'id':  companyId,
            'title': companyTitle,
        },
        'department' : form.getEditor('department').option('value'),
        'responsible': form.getEditor('responsible').option('value'),
        'room': form.getEditor('room').option('value'),
        'users': []
      }
      for (var key in items) {
        request['users'].push({
          'fio': items[key]['fio']
        })
      }
      this.props.onSave(request)
    } else {
      if (items.length === 0) {
        alert('Необходимо указать список сотрудников')
      }
    }
  }
  render() {
    const classes = this.props.classes
    const items = [
      {
        itemType: 'group',
        caption: 'Основная информация',
        items: [
          {
            dataField: 'company.id',
            label: { text: 'Компания' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
            editorType: 'dxRadioGroup',
            editorOptions: {
              displayExpr: 'text',
              valueExpr: 'value',
              items: companies
            }
          },
          {
            dataField: 'department',
            label: { text: 'Подразделение' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'room',
            label: { text: '№ помещения' },
            helpText: 'Указывать только одно помещение',
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'responsible',
            label: { text: 'Ответственный за помещение' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
        ]
      },
      {
        itemType: 'group',
        caption: 'Полный список сотрудников допущенных к получению ключа от помещения',
        items: []
      }
    ]
    const editing = {
      mode: 'popup',
      popup: {
        title: "Добавление сотрудника",
        showTitle: true,
        width: 500,
        height: 175,
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
    const onToolbarPreparing = (e) => {
      let dataGrid = e.component
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          template: function() {
            return $('<div/>')
              .append(
                  $('<h2 />')
                    .addClass('count')
                    .css('width', '10px')
              )
          }
        },
         {
            location: "before",
            widget: "dxButton",
            options: {
                icon: "add",
                text: "Добавить",
                onClick: function() {
                    dataGrid.addRow()
                }
            }
        }
       )
    }
    const columns = [
      {
        dataField: 'id',
        visible: false,
        formItem: {
          visible: false
        }
      },
      {
        width: 30,
        caption: '#',
        cellTemplate: function(cellElement, cellInfo) {
          cellElement.text(cellInfo.row.rowIndex + 1)
        },
        formItem: {
          visible: false
        }
      },
      {
        dataField: 'fio',
        caption: 'Ф.И.О',
        validationRules: [{ type: "required" }]
      }
    ]
    const dataSource = new DataSource({})
    const paging = { pageSize: 50 }
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={1} readOnly={this.props.readOnly} width={700} />
        <Grid gridId="ac" columns={columns} editing={editing} dataSource={dataSource} onToolbarPreparing={onToolbarPreparing} paging={paging} />
        {!this.props.readOnly
          ? <Button onTouchTap={this.onSubmit} raised color='primary' className={classes.button}>{ this.props.data ? "Отправить заявку" : "Дальше" }</Button> : undefined
        }
      </div>
    )
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormComponent)