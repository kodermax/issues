import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import CustomStore from 'devextreme/data/custom_store'
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
    margin: '0 10px',
    flex: 1
  },
  group: {
    margin: '0'
  }
}

class PurchaseForm extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps : Object) {
    if (nextProps.data && nextProps.data.department === null) {
        nextProps.data.department = {
          id: '',
          title: ''
        }
    }
  }
  props: Props;

  handleSubmit(e: Object) {
    let form = $('#form').dxForm('instance')
    var result = form.validate()
    if (result.isValid) {
      let request = {
        'title'      : form.getEditor('title').option('value'),
        'company'    : {
            'id':  form.getEditor('company.id').option('value'),
            'title': form.getEditor('company.id').option('text'),
        },
        'department' : {
            'id'     : form.getEditor('department.id').option('value'),
            'title'  : form.getEditor('department.id').option('text'),
        }
      }
      this.props.onSave(request)
    }
  }
  render() {
    const classes = this.props.classes
    const departments = new CustomStore({
      key: 'Id',
      loadMode: 'raw',
      load: function(loadOptions) {
        let  deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_PORTAL_API_HOST}/departments/divisions`,
          success: function(result) {
            deferred.resolve(result)
          },
          error: function() {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      byKey: function(key, extra) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_PORTAL_API_HOST}/departments/divisions/${key}`,
          success: function(result) {
            deferred.resolve(result)
          },
          error: function() {
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
            dataField: 'title',
            label: { text: 'Название заявки' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
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
              items: [
                {
                  text: 'АО "Компания 1"',
                  value: '69812854-f6d9-11df-91c0-002215596dc5'
                },
                {
                  text: 'ООО "ПФК" Компания 2"',
                  value: 'ade11f58-a06a-11df-8212-e0cb4e77a365'
                },
                {
                  text: 'ООО «Компания 1 Дистрибуция»',
                  value: 'f4373b73-fae7-11e0-8f3c-0050569c1d10'
                }
              ]
            }
          },
          {
            dataField: 'department.id',
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
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={2} readOnly={this.props.readOnly} />
        {!this.props.readOnly
          ? 
          <Button onTouchTap={this.onSubmit} raised color="primary" className={classes.button}>{ this.props.data ? "Сохранить" : "Дальше" }</Button> : undefined
        }
      </div>
    )
  }
}

PurchaseForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PurchaseForm)