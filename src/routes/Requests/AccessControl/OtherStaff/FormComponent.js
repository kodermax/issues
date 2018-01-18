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
const categories = [
  {
    text: 'Арендатор',
    value: 1
  },
  {
    text: 'Подрядчик',
    value: 2
  },
  {
    text: 'Собственник',
    value: 3
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
        selectButtonText: "Загрузить фото на пропуск",
        labelText: "",
        accept: "image/*",
        uploadMode: "instantly",
        uploadUrl: `${process.env.REACT_APP_API_FILES}/files`,
        onUploaded: (e) => {
          let response = JSON.parse(e.request.response)
          $('#form').dxForm('instance').updateData("photo", response.id)
        }
    })
     $(ReactDOM.findDOMNode(this.refs.file)).dxFileUploader({
        multiple: false,
        selectButtonText: "Загрузить другой файл",
        labelText: "",
        accept: "*/*",
        uploadMode: "instantly",
        uploadUrl: `${process.env.REACT_APP_API_FILES}/files`,
        onUploaded: (e) => {
          let response = JSON.parse(e.request.response)
          $('#form').dxForm('instance').updateData("file", response.id)
        }
    })
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs.photo)).remove()
    $(ReactDOM.findDOMNode(this.refs.file)).remove()
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
        'company' : {
            'id':  companyId,
            'title': companyTitle,
        },
        'categoryContractor' : form.getEditor('categoryContractor').option('value'),
        'contractor' : form.getEditor('contractor').option('value'),
        'fio': form.getEditor('fio').option('value'),
        'foreign': form.getEditor('foreign').option('value'),
        'car': form.getEditor('car').option('value'),
        'photo': form.getEditor('photo').option('value'),
        'file': form.getEditor('file').option('value'),
        'activeFrom': form.getEditor('activeFrom').option('value'),
        'activeTo': form.getEditor('activeTo').option('value'),
        'room': form.getEditor('room').option('value'),
        'comment': form.getEditor('comment').option('value')
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
            dataField: 'categoryContractor',
            label: { text: 'Категория оргазниации' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
            editorType: 'dxRadioGroup',
            editorOptions: {
              displayExpr: 'text',
              valueExpr: 'value',
              items: categories
            }
          },
          {
            dataField: 'contractor',
            label: { text: 'Наименование организации' },
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
            dataField: 'foreign',
            editorType: 'dxCheckBox',
            editorOptions: {
              value: false
            },
            label: { text: 'Иностранный гражданин' },
          },
           {
            dataField: 'car',
            label: { text: 'Транспорт (марка, гос. номер)' }
          },
          {
            dataField: 'activeFrom',
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
              dateSerializationFormat: 'yyyy-MM-dd'
            },
            label: { text: 'Дата с' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'activeTo',
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
              dateSerializationFormat: 'yyyy-MM-dd'
            },
            label: { text: 'Дата по' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'room',
            label: { text: 'Доступ в помещения' }
          },
          {
            dataField: 'comment',
            label: { text: 'Примечание' },
          },
          {
            dataField: 'photo',
            label: { text: 'Фото на пропуск' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }],
             editorOptions: {
             readOnly: true
            }
          },
           {
            dataField: 'file',
            helpText: 'Для загрузки нескольких файлов используйте архивирование',
            label: { text: 'Другой файл' },
             editorOptions: {
              readOnly: true
            }
          },
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={1} readOnly={this.props.readOnly} width={700} />
        <div id="photo" ref='photo'></div>
        <div id="file" ref='file'></div>
        <br/><br/>
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