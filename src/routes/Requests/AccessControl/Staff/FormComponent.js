import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ReactDOM from 'react-dom'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import 'devextreme/ui/select_box'
import 'devextreme/ui/file_uploader'
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
    $(ReactDOM.findDOMNode(this.refs.photo)).dxFileUploader({
      multiple: false,
      selectButtonText: "Выбрать фото",
      labelText: "",
      accept: "image/*",
      uploadMode: "instantly",
      uploadUrl: `${process.env.REACT_APP_API_FILES}/files`,
      onUploaded: (e) => {
        let response = JSON.parse(e.request.response)
        $('#form').dxForm('instance').updateData("photo", response.id)
      }
    })
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs.photo)).remove()
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
        'department': form.getEditor('department').option('value'),
        'fio': form.getEditor('fio').option('value'),
        'date': form.getEditor('date').option('value'),
        'position': form.getEditor('position').option('value'),
        'accessRooms': form.getEditor('accessRooms').option('value'),
        'mode': form.getEditor('mode').option('value'),
        'car': form.getEditor('car').option('value'),
        'photo': form.getEditor('photo').option('value')
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
            dataField: 'fio',
            label: { text: 'Ф.И.О' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'date',
            editorType: 'dxDateBox',
            editorOptions: {
              type: 'date',
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
              width: 100,
              min: new Date()
            },
            label: { text: 'Дата выхода на работу' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'position',
            label: { text: 'Должность' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'mode',
            label: { text: 'Режим работы' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'car',
            label: { text: 'Транспорт (марка, гос. номер)' }
          },
          {
            dataField: 'accessRooms',
            helpText: 'Укажите номера помещений или ФИО сотрудника, имеющего аналогичный доступ',
            label: { text: 'Доступ в помещения' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'photo',
            label: { text: 'Фото на пропуск' },
            editorOptions: {
              readOnly: true
            },
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
        <div id="photo" ref='photo'></div>
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