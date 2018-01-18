import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import 'devextreme/ui/select_box'
import $ from 'jquery'
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
    if (result.isValid) {
      let companyId = form.getEditor('company.id').option('value')
      let companyTitle = ''
       for (let i = 0; i < companies.length; i++) {
          if (companies[i].value === companyId)
            companyTitle = companies[i].text
        }
      let request = {
        'company'    : {
            'id':  companyId,
            'title': companyTitle,
        },
        'car' : form.getEditor('car').option('value'),
        'driver': form.getEditor('driver').option('value'),
        'contragent': form.getEditor('contragent').option('value'),
        'target': form.getEditor('target').option('value'),
        'date': new Date(form.getEditor('date').option('value')).toISOString()
      }
      this.props.onSave(request)
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
              value: null,
              items: companies
            }
          },
          {
            dataField: 'car',
            label: { text: 'Транспорт (марка, гос. номер)' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'driver',
            label: { text: 'Водитель (Ф.И.О)' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'contragent',
            label: { text: 'Контрагент' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          
          {
            dataField: 'target',
            label: { text: 'Цель' },
            editCellTemplate: function(cellElement, cellInfo) {
              var div = document.createElement('div')
              cellElement.get(0).appendChild(div)
              $(div).dxTextArea({
                minHeight: 150,
                height: 150,
                value: cellInfo.value,
                onValueChanged: function(data) {
                  cellInfo.setValue(data.value)
                }
              })
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'date',
            editorType: 'dxDateBox',
            editorOptions: {
              displayFormat: {
                formatter: function (date) {
                      var month = date.getMonth() + 1,
                          day = date.getDate(),
                          year = date.getFullYear()
                          day = day < 10 ? '0' + day : day
                          month = month < 10 ? '0' + month : month
                      return day + "." + month + "." + year
                  },
                  parser: function (e) {
                      var parts = e.split("."),
                          day = Number(parts[0]),
                          month = Number(parts[1] - 1),
                          year = Number(parts[2])
                  
                      return new Date(year, month, day)
                  }
              },
              dateSerializationFormat: 'yyyy-MM-dd',
              min: new Date()
            },
            label: { text: 'Дата' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={1} readOnly={this.props.readOnly} width={700} />
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