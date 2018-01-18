import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Common/Components/LayoutComponent'
import { connect } from 'react-redux'
import { fetchItem } from '../../../../modules/item'
import Discuss from '../../../../components/Discuss'
import { withStyles } from 'material-ui/styles'
import Actions from '../Common/Components/ActionsComponent'

type Props = {
  access: Object,
  fetchItem: Function,
  item: Object,
  routeParams: Object,
};

const styles = {
  form: {
    width: '500px',
    fontFamily: "'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, sans-serif"
  },
  info: {
    color: 'rgba(0, 0, 0, 0.541176)'
  },
  h2: {
    color: '#212121',
    fontSize: '30px',
    letterSpacing: 0,
    fontFamily: '"Roboto",sans-serif',
    fontWeight: 300,
    lineHeight: 1.4
  },

  user: {
    fontSize: '11px',
    fontFamily: '"Roboto",sans-serif',
    verticalAlign: 'top',
    lineHeight: '22px'
  }
}


class ViewComponent extends Component {
  constructor(props : Props) {
    super(props)
    this.state = {

    }
  }

  state : {
  };
  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }
  componentWillReceiveProps(nextProps : Object) {
    if (nextProps.item && nextProps.item.id > 0) {
       this.setState({ item: nextProps.item })
    }
  }
  props : Props;

  render() {
    const classes = this.props.classes
    return (
        <Layout subcategory='otherstaff'>
            {this.state.item ? <div>
                <h2 className={classes.h2}>№ {this.state.item.id} {this.state.item.title}</h2>
                <Actions issueId={this.props.routeParams.id} subcategory='otherstaff' />
                <div className={classes.form}>
                    <div className="dx-fieldset">
                        <div className="dx-fieldset-header">Основная информация</div>
                        <div className="dx-field">
                            <div className="dx-field-label">Статус заявки:</div>
                            <div className="dx-field-value-static"><b>{this.state.item.status.title}</b></div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Автор заявки:</div>
                            <div className="dx-field-value-static">{this.state.item.author.fullName} ({this.state.item.author.position})</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Дата создания:</div>
                            <div className="dx-field-value-static">{new Date(this.state.item.created).toLocaleDateString("ru-ru") } { new Date(this.state.item.created).toLocaleTimeString("ru-ru") }</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Компания:</div>
                            <div className="dx-field-value-static">{this.state.item.company.title}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Категория компании:</div>
                            <div className="dx-field-value-static">{this.state.item.categoryContractor}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Наименование организации:</div>
                            <div className="dx-field-value-static">{this.state.item.contractor}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Ф.И.О:</div>
                            <div className="dx-field-value-static">{this.state.item.fio}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Период действия:</div>
                            <div className="dx-field-value-static">{new Date(this.state.item.activeFrom).toLocaleDateString("ru-ru") } - { new Date(this.state.item.activeTo).toLocaleDateString("ru-ru")}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Транспорт:</div>
                            <div className="dx-field-value-static">{this.state.item.car}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Доступ к помещению:</div>
                            <div className="dx-field-value-static">{this.state.item.room}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Примечание:</div>
                            <div className="dx-field-value-static">{this.state.item.comment}</div>
                        </div>
                        {this.state.item.photo ? <div className="dx-field">
                            <div className="dx-field-label">Фото на пропуск:</div>
                            <div className="dx-field-value-static">
                                <a href={`https://api-files.xxx.ru/api/files/${this.state.item.photo}`}>Скачать</a>
                            </div>
                        </div> : undefined}
                        {this.state.item.file ? <div className="dx-field">
                            <div className="dx-field-label">Другой файл:</div>
                            <div className="dx-field-value-static">
                                <a href={`https://api-files.xxx.ru/api/files/${this.state.item.file}`}>Скачать</a>
                            </div>
                        </div> : undefined}
                        
                    </div>
                </div>
                <Discuss requestId={this.props.routeParams.id} />
            </div> : undefined }
        </Layout>
    )
  }
}

const mapActionCreators = {
  fetchItem
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  item : state.request.data
})

ViewComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(ViewComponent))