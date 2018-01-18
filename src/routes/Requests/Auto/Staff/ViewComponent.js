import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Layout from '../Common/Components/LayoutComponent'
import { connect } from 'react-redux'
import { fetchItem } from '../../../../modules/item'
import Discuss from '../../../../components/Discuss'
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
        <Layout subcategory='staff'>
            {this.state.item ? <div>
                <h2 className={classes.h2}>№ {this.state.item.id} {this.state.item.title}</h2>
                <Actions issueId={this.props.routeParams.id} subcategory='staff' />
                <div className={classes.form}>
                    <div className="dx-fieldset">
                        <div className="dx-fieldset-header">Основная информация</div>
                        <div className="dx-field">
                            <div className="dx-field-label">Статус заявки:</div>
                            <div className="dx-field-value-static">{this.state.item.status.title}</div>
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
                            <div className="dx-field-label">Департамент:</div>
                            <div className="dx-field-value-static">{this.state.item.department}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Дата поездки:</div>
                            <div className="dx-field-value-static">{new Date(this.state.item.date).toLocaleDateString("ru-ru")}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Время поездки:</div>
                            <div className="dx-field-value-static">{this.state.item.time}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Цель поездки:</div>
                            <div className="dx-field-value-static">{this.state.item.target}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Контактное лицо:</div>
                            <div className="dx-field-value-static">{this.state.item.person}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Телефон:</div>
                            <div className="dx-field-value-static">{this.state.item.phone}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Место назначение:</div>
                            <div className="dx-field-value-static">{this.state.item.place}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Схема проезда:</div>
                            {this.state.item.map ? 
                                <div className="dx-field-value-static">
                                    <a href={`https://api-files.xxx.ru/api/files/${this.state.item.map}`}>Скачать</a>
                                </div>
                            :undefined }
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Примечание:</div>
                            <div className="dx-field-value-static">{this.state.item.comment}</div>
                        </div>
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