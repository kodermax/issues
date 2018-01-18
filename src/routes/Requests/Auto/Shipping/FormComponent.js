import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'devextreme/ui/file_uploader'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import 'devextreme/ui/select_box'
import $ from 'jquery'
import CustomStore from 'devextreme/data/custom_store'

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
    $(ReactDOM.findDOMNode(this.refs.map)).dxFileUploader({
      multiple: false,
      selectButtonText: "Выбрать файл",
      labelText: "",
      accept: "image/*",
      uploadMode: "instantly",
      uploadUrl: `${process.env.REACT_APP_API_FILES}/files`,
      onUploaded: (e) => {
        let response = JSON.parse(e.request.response)
        $('#form').dxForm('instance').updateData("map", response.id)
      }
    })
  }

  componentWillReceiveProps(nextProps: Object) {

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
        'company': {
          'id': companyId,
          'title': companyTitle,
        },
        'department': form.getEditor('departmentId').option('text'),
        'departmentId': form.getEditor('departmentId').option('value'),
        'customer': form.getEditor('customer').option('value'),
        'phone': form.getEditor('phone').option('value'),
        'contragent': form.getEditor('contragentId').option('text'),
        'contragentId': form.getEditor('contragentId').option('value'),
        'date': form.getEditor('date').option('value'),
        'time': form.getEditor('time').option('value'),
        'address': form.getEditor('address').option('value'),
        'weight': form.getEditor('weight').option('value'),
        'volume': form.getEditor('volume').option('value'),
        'recipient': form.getEditor('recipient').option('value'),
        'recipientTime': form.getEditor('recipientTime').option('value'),
        'recipientPhone': form.getEditor('recipientPhone').option('value'),
        'temperature': form.getEditor('temperature').option('value'),
        'ampoules': form.getEditor('ampoules').option('value'),
        'comment': form.getEditor('comment').option('value'),
        'map': form.getEditor('map').option('value'),
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
            dataField: 'departmentId',
            label: { text: 'Подразделение' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
            editorType: 'dxSelectBox',
            editorOptions: {
              dataSource: departments,
              displayExpr: "Name",
              valueExpr: "Id",
              searchEnabled: false

            },
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
            dataField: 'phone',
            label: { text: 'Телефон инициатора' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'contragentId',
            label: { text: 'Наименование получателя' },
            helpText: 'Полное наименование организации-получателя',
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
            editorType: 'dxSelectBox',
            editorOptions: {
              dataSource: contragents,
              displayExpr: "title",
              valueExpr: "id",
              searchEnabled: true

            },
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
            label: { text: 'Дата доставки' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'time',
            editorType: 'dxDateBox',
            editorOptions: {
              displayFormat: "HH:mm",
              type: 'time',
              dateSerializationFormat: 'HH:mm'
            },
            label: { text: 'Время доставки' },
          },
          {
            dataField: 'address',
            label: { text: 'Адрес доставки' },
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
            dataField: 'volume',
            label: { text: 'Объем(м. куб.)' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'recipient',
            label: { text: 'Контактное лицо получателя' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'recipientPhone',
            label: { text: 'Телефон контактного лица' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'recipientTime',
            label: { text: 'Режим работы получателя' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'temperature',
            label: { text: 'Температурный режим' }
          },
          {
            dataField: 'ampoules',
            editorType: 'dxCheckBox',
            editorOptions: {
              value: false
            },
            label: { text: 'Наличие ампул' }
          },
          {
            dataField: 'comment',
            editorType: "dxTextArea",
            editorOptions: {
              height: 90
            },
            label: { text: 'Примечание' }
          },
          {
            dataField: 'map',
            label: { text: 'Схема проезда' },
            editorOptions: {
              readOnly: true
            },
          },
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={1} readOnly={this.props.readOnly} width={700} />
        <div id="map" ref='map'></div>
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