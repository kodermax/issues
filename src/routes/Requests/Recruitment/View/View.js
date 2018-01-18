import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import _ from 'lodash'
import RecruitmentLayout from '../Components/Layout'
import RecruitmentForm from '../Components/Form'
import Steps from '../Components/StepsComponent'
import Discuss from '../../../../components/Discuss'
import Grid from 'material-ui/Grid'
import AssignmentIcon from 'material-ui-icons/Assignment'
import { connect } from 'react-redux'
import { fetchActions } from '../../../../modules/actions'
import { fetchItem } from '../../../../modules/item'
import { updateItem } from '../../../../modules/update'
import { submitAction } from '../../../../modules/action'

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
  user: {
    fontSize: '11px',
    color: 'rgba(0, 0, 0, 0.541176)',
    verticalAlign: 'top',
    lineHeight: '22px'
  }
}

type Props = {
  access: Object,
  fetchItem: Function,
  updateItem: Function,
  item: Object,
  routeParams: Object,
}
class View extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      item: {}
    }
    this.onSubmit = this.handleSubmit.bind(this)
  }
  state: {
    access: {},
    item: {},
  }
  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }
  componentWillReceiveProps(nextProps: Object) {
    if (!_.isEmpty(nextProps.item)) {
      let newState = {
        item: nextProps.item
      }
      this.setState(newState)
    }
  }
  props: Props;

  handleSubmit = (request) => {
    request['id'] = this.props.routeParams.id
    this.props.updateItem('recruitment', request)
  }
  render() {
    const classes = this.props.classes
    return (
      <RecruitmentLayout>
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
            <Steps issueId={this.props.routeParams.id} />
            <RecruitmentForm data={this.state.item} readOnly={this.state.item.status.id !== 'draft'} type='edit'
              onSave={this.onSubmit}
            />
            <Discuss requestId={this.props.routeParams.id} />
          </div>
          : undefined}
      </RecruitmentLayout>
    )
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapActionCreators = {
  fetchActions,
  fetchItem,
  submitAction,
  updateItem
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  action: state.action.data,
  actions: state.actions.data,
  item: state.request.data
})

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(View))