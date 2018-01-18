import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Form from '../../../../components/DxForm'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Actions from './Actions'
import CustomStore from 'devextreme/data/custom_store'
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

class RecruitmentForm extends Component {
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
      let firstDay = form.getEditor('firstDay').option('value')
      if (firstDay) {
        switch (typeof firstDay) {
          case 'string':
            firstDay = new Date(firstDay).toISOString()
            break
          default:
            firstDay = firstDay.toISOString()
            break
        }
      }
      let lastDay = form.getEditor('lastDay').option('value')
      if (lastDay) {
        switch (typeof lastDay) {
          case 'string':
            lastDay = new Date(lastDay).toISOString()
            break
          default:
            lastDay = lastDay.toISOString()
            break
        }
      }

      let request = {
        'contractType'    : form.getEditor('contractType').option('value'),
        'jobTitle'        : form.getEditor('jobTitle').option('value'),
        //'department'      : form.getEditor('department').option('value'),
        'department'      : form.getEditor('departmentId').option('text'),
        'departmentId'    : form.getEditor('departmentId').option('value'),
        'salary'          : form.getEditor('salary').option('value'),
        'firstDay'        : firstDay,
        'workplace'       : form.getEditor('workplace').option('value'),
        'jobInStaffing'   : form.getEditor('jobInStaffing').option('value'),
        'jobInBudget'     : form.getEditor('jobInBudget').option('value'),
        'dismiss'         : form.getEditor('dismiss').option('value'),
        'lastDay'         : lastDay,
        'schedule'        : form.getEditor('schedule').option('value'),
        'requirements': {
          'education'     : form.getEditor('requirements.education').option('value'),
          'experience'    : form.getEditor('requirements.experience').option('value'),
          'skills'        : form.getEditor('requirements.skills').option('value'),
          'computerSkills': form.getEditor('requirements.computerSkills').option('value'),
          'languages'     : form.getEditor('requirements.languages').option('value'),
          'comments'      : form.getEditor('requirements.comments').option('value')
        },
        'duties'          : form.getEditor('duties').option('value')
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
    let minDate = new Date()
    minDate.setDate(minDate.getDate() + 20)
    const items = [
      {
        itemType: 'group',
        caption: 'Основная информация',
        items: [
          {
            dataField: 'contractType',
            label: { text: 'Тип договора' },
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
                  text: 'Трудовой договор',
                  value: 1
                },
                {
                  text: 'Договор возмездного оказания услуг',
                  value: 2
                }
              ]
            }
          },
          {
            dataField: 'jobTitle',
            label: { text: 'Название должности' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
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
            dataField: 'departmentId',
            label: { text: 'Подразделение' },
            editorType: 'dxSelectBox',
            editorOptions: {
              dataSource: departments,
              displayExpr: "Name",
              valueExpr: "Id",
              searchEnabled: false

            },
          },
          {
            dataField: 'salary',
            label: { text: 'Размер з.п. в месяц' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'schedule',
            label: { text: 'График работы' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'firstDay',
            label: { text: 'Дата выхода специалиста' },
            editorOptions: {
              type: 'date',
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
              width: 100,
              min: minDate
            },
            editorType: 'dxDateBox',
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'workplace',
            label: { text: 'Расположение рабочего места' },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          }
        ]
      },
      {
        itemType: 'group',
        caption: 'Обоснование',
        items: [
          {
            dataField: 'jobInStaffing',
            editorType: 'dxRadioGroup',
            editorOptions: {
              displayExpr: 'text',
              valueExpr: 'value',
              items: [
                {
                  text: 'Да',
                  value: true
                },
                {
                  text: 'Нет',
                  value: false
                }
              ],
              layout: 'horizontal'
            },
            label:  { text: 'Наличие вакансии в ШР' }
          },
          {
            dataField: 'jobInBudget',
            editorType: 'dxRadioGroup',
            editorOptions: {
              displayExpr: 'text',
              valueExpr: 'value',
              items: [
                {
                  text: 'Да',
                  value: true
                },
                {
                  text: 'Нет',
                  value: false
                }
              ],
              layout: 'horizontal'
            },
            label:  { text: 'Вакансия забюджетирована' }
          },
          {
            dataField: 'dismiss',
            label: { text:'Ф.И.О. увольняющегося' }
          },
          {
            dataField: 'lastDay',
            editorType: 'dxDateBox',
            label: { text:'Последний день работы' },
            editorOptions: {
              type: 'date',
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
              width: 100,
              min: new Date()
            },
          }

        ]
      }, {
        itemType: 'group',
        caption: 'Основные требования к кандидату',
        items: [
          {
            dataField: 'requirements.education',
            label: { text: 'Образование' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'requirements.experience',
            label: { text: 'Опыт работы' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'requirements.skills',
            label: { text: 'Профессиональные знания и навыки' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'requirements.computerSkills',
            label: { text: 'ПК (программные продукты)' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'requirements.languages',
            label: { text: 'Иностранный язык' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          },
          {
            dataField: 'requirements.comments',
            label: { text: 'Доп. пожелания' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 50
            }
          }

        ]
      },

      {
        itemType: 'group',
        caption: 'Основные обязанности',
        items: [
          {
            dataField: 'duties',
            label: { text: 'Обязанности' },
            editorType: 'dxTextArea',
            editorOptions: {
              height: 200
            },
            validationRules: [{
              type: 'required',
              message: 'Обязательное поле'
            }]
          }
        ]
      }
    ]
    return (
      <div>
        <Form formData={this.props.data} items={items} colCount={2} readOnly={this.props.readOnly} />
        <Grid container>
          <Grid item>
            {!this.props.readOnly
              ? <Button style={{marginTop: 15}} onTouchTap={this.onSubmit} raised color='primary' className={classes.button}>Сохранить</Button> : undefined
            }
          </Grid>
          <Grid item>
            {this.props.data.id ? <Actions issueId={this.props.data.id} /> :undefined }
          </Grid>
        </Grid>
      </div>
    )
  }
}

RecruitmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RecruitmentForm)