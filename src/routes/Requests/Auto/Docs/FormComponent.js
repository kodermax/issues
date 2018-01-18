import React, { Component } from 'react'
import 'devextreme/ui/file_uploader'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import 'devextreme/ui/select_box'
import $ from 'jquery'
import CustomStore from 'devextreme/data/custom_store'
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
const places = [
  {
    text: 'Зеленоград',
    value: 'zel'
  },
  {
    text: 'Ангелово',
    value: 'an'
  }
]
class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleSubmit(e) {
    let form = $('#form').dxForm('instance')
    var result = form.validate()
    if (result.isValid) {
      let request = {
        'departurePoint': form.getEditor('departurePoint').option('value'),
        'department': form.getEditor('departmentId').option('text'),
        'departmentId': form.getEditor('departmentId').option('value'),
        'phone': form.getEditor('phone').option('value'),
        'customer': form.getEditor('customer').option('value'),
        'contragent': form.getEditor('contragent').option('value'),
        'attorney': form.getEditor('attorney').option('value'),
        'date': form.getEditor('date').option('value'),
        'contragentAddress': form.getEditor('contragentAddress').option('value'),
        'weight': form.getEditor('weight').option('value'),
        'contactPerson': form.getEditor('contactPerson').option('value'),
        'contactTime': form.getEditor('contactTime').option('value'),
        'contactPhone': form.getEditor('contactPhone').option('value'),
        'comment': form.getEditor('comment').option('value'),
      }
      this.props.onSave(request)
    }
  }
  render() {
    const classes = this.props.classes
    const departments = new CustomStore({
      loadMode: 'raw',
      load: function (loadOptions) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_PORTAL_API_HOST}/departments/divisions`,
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
          url: `${process.env.REACT_APP_PORTAL_API_HOST}/departments/divisions/${key}`,
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
    const items = [
      {
        itemType: 'group',
        caption: 'Основная информация',
        items: [
          {
            dataField: 'departurePoint',
            label: { text: 'Место отправления' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
            editorType: 'dxRadioGroup',
            editorOptions: {
              displayExpr: 'text',
              valueExpr: 'value',
              items: places
            }
          },
          {
            dataField: 'customer',
            label: { text: 'Заказчик' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'departmentId',
            label: { text: 'Департамент' },
            editorType: 'dxSelectBox',
            editorOptions: {
              dataSource: departments,
              displayExpr: "Name",
              valueExpr: "Id",
              searchEnabled: false

            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'phone',
            label: { text: 'Контактный телефон заявителя' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },

          {
            dataField: 'contragent',
            label: { text: 'Наименование контрагента' },
            helpText: 'Полное наименование контрагента',
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'contragentAddress',
            label: { text: 'Адрес контрагента' },
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
                  if (day < 10) {
                    day = '0' + day
                  }
                  if (month < 10) {
                    month = '0' + month
                  }
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
            label: { text: 'Срок доставки' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },

          {
            dataField: 'weight',
            label: { text: 'Вес, кг' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },

          {
            dataField: 'contactPerson',
            label: { text: 'Контактное лицо контрагента' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'contactPhone',
            label: { text: 'Телефон контактного лица контрагента' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'contactTime',
            label: { text: 'Режим работы контрагента' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'attorney',
            editorType: 'dxCheckBox',
            label: { text: 'Доверенность' }
          },
          {
            dataField: 'comment',
            editorType: "dxTextArea",
            editorOptions: {
              height: 90
            },
            label: { text: 'Примечание' }
          },
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={1} readOnly={this.props.readOnly} width={700} />
        <br /><br />
        {!this.props.readOnly
          ? <Button onTouchTap={this.onSubmit} raised color='primary' className={classes.button}>{this.props.data ? "Отправить заявку" : "Дальше"}</Button> : undefined
        }
      </div>
    )
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormComponent)