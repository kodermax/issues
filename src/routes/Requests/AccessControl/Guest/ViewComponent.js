// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Common/Components/LayoutComponent'
import { connect } from 'react-redux'
import { fetchItem } from '../../../../modules/item'
import Discuss from '../../../../components/Discuss'
import { withStyles } from 'material-ui/styles'
import Actions from '../Common/Components/ActionsComponent'
import Grid from '../../../../components/DxGrid'

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
     const columns = [
      {
        caption: '#',
        width: 50,
        cellTemplate: function(cellElement, cellInfo) {
          cellElement.text(cellInfo.row.rowIndex + 1)
        },
        formItem: {
          visible: false
        }
      },
      {
        dataField: 'title',
        caption: 'Ф.И.О'
      }
    ]
    return (
        <Layout subcategory="guest">
            {this.state.item ? <div>
                <h2 className={classes.h2}>№ {this.state.item.id} {this.state.item.title}</h2>
                <Actions issueId={this.props.routeParams.id} subcategory="guest" />
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
                            <div className="dx-field-label">Принимающая сторона:</div>
                            <div className="dx-field-value-static">{this.state.item.greeter}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Транспорт (марка, гос. номер):</div>
                            <div className="dx-field-value-static">{this.state.item.car}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Цель:</div>
                            <div className="dx-field-value-static">{this.state.item.target}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Дата с:</div>
                            <div className="dx-field-value-static">{new Date(this.state.item.activeFrom).toLocaleDateString("ru-ru")}</div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Дата по:</div>
                            <div className="dx-field-value-static">{new Date(this.state.item.activeTo).toLocaleDateString("ru-ru")}</div>
                        </div>
                        <div className="dx-fieldset-header">Список посетителей</div>
                    </div>
                </div>
                <Grid gridId="ac" columns={columns} dataSource={this.state.item.guests} width="550"/>
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