import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import _ from 'lodash'
import PurchaseLayout from './Shared/Layout'
import PurchaseSteps from '../../../components/Purchase/Steps'
import ActionsComponent from './Shared/ActionsComponent'
import ViewProducts from './Shared/ViewProducts'
import ViewNewProducts from './Shared/ViewNewProducts'
import Discuss from '../../../components/Discuss'
import AssignmentIcon from 'material-ui-icons/Assignment'
import { connect } from 'react-redux'
import { fetchActions } from '../../../modules/actions'
import { fetchItem } from '../../../modules/item'
import { submitAction } from '../../../modules/action'
import Watchers from '../../../components/Watchers'


const styles = {
  info: {
    color: '#212121',
    fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 11.9,
    lineHeight: 1.57142857
  },
  h2: {
    color: '#212121',
    fontSize: '30px',
    letterSpacing: 0,
    fontFamily: '"Roboto",sans-serif',
    fontWeight: 300,
    lineHeight: 1.4
  },
  typeItem: {
    paddingLeft: '0!important'
  },
  h1: {
    fontSize: 16,
    lineHeight: '55px',
  },
  h3: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 300
  }
}

class ViewComponent extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      item: {}
    }
  }

  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.item)) {
      let newState = {
        item: nextProps.item
      }
      this.setState(newState)
    }
  }

  render() {
    const classes = this.props.classes
    const companies = {
      '69812854-f6d9-11df-91c0-002215596dc5': 'АО "Компания 1"',
      'ade11f58-a06a-11df-8212-e0cb4e77a365': 'ООО "ПФК" Компания 2"'
    }
    return (
      <PurchaseLayout>
        {!_.isEmpty(this.state.item)
          ? <div>
            <h2 className={classes.h2}>№ {this.state.item.id} {this.state.item.title}</h2>
            <Grid container className={classes.info}>
              <Grid item>
                {new Date(this.state.item.created).toLocaleDateString("ru-ru")}, {this.state.item.author.fullName}
              </Grid>
              <Grid item>
                <AssignmentIcon style={{ width: 18, height: 18, color: '#FB8C00' }} />
              </Grid>
              <Grid item classes={{
                typeItem: classes.typeItem
              }}>
                <span className={classes.statusText}>{this.state.item.status.title}</span>
              </Grid>
            </Grid>
            <PurchaseSteps requestId={this.props.routeParams.id} />
            <br />
            <h3 className={classes.h3}>{companies[this.state.item.company.id]} {this.state.item.department ? this.state.item.department.title : ''}</h3>
            <ViewProducts items={this.state.item.products} sum={this.state.item.sum} />
            {
              ['draft', 'check'].indexOf(this.state.item.status.id) >= 0 ?
                this.state.item.newProducts && this.state.item.newProducts.length > 0 ?
                  <div><h3 className={classes.h3}>Новая номенклатура</h3><ViewNewProducts items={this.state.item.newProducts} /></div> : undefined
                : undefined}
            <ActionsComponent requestId={this.props.routeParams.id} />
            <Watchers category='purchase' issueId={this.props.routeParams.id} />
            <Discuss requestId={this.props.routeParams.id} />
          </div>
          : undefined}
      </PurchaseLayout>
    )
  }
}

ViewComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapActionCreators = {
  fetchActions,
  fetchItem,
  submitAction
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  action: state.action.data,
  actions: state.actions.data,
  item: state.request.data
})
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(ViewComponent))