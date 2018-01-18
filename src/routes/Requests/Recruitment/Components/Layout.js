import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import _ from 'lodash'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'
import { connect } from 'react-redux'
import { fetchAccess } from '../../../../modules/access'
import { fetchCounts } from '../../../../modules/counts'



type Props = {
  access      : Object,
  counts      : Object,
  fetchAccess : Function,
  fetchCounts : Function,
  children    : Object,
  routeParams : Object
}
const styles = {
  appBar: {
    position: 'relative',
    zIndex: 0,
    backgroundColor: '#F5F5F5',
    color: 'black'
  },
  badge: {
  },
  redBadge: {
    backgroundColor: '#F44336'
  },
  flex: {
    flex: 1
  },
  children: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
}

class RecruitmentLayout extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      access: {
        admin: false,
        approver: false,
        security: false,
        worker: false
      },
      counts: {
        all: '',
        approving: '',
        done: '',
        approval: '',
        new: '',
        work: ''
      }
    }
    this.toList = this.handleToList.bind(this, '')
    this.toCheck = this.handleToList.bind(this, 'check')
    this.toNew = this.handleToList.bind(this, 'new')
    this.toWork = this.handleToList.bind(this, 'work')
    this.toAll = this.handleToList.bind(this, 'all')
    this.toDone = this.handleToList.bind(this, 'done')
    this.toApproval = this.handleToList.bind(this, 'approval')
    this.toApproving = this.handleToList.bind(this, 'approving')
  }

  componentDidMount() {
    this.props.fetchAccess('recruitment')
    this.props.fetchCounts('recruitment')
  }
  componentWillReceiveProps(nextProps: Object) {
    if (!_.isEmpty(nextProps.access)) {
      this.setState({ access: nextProps.access })
    }
    if (!_.isEmpty(nextProps.counts)) {
      this.setState({ counts: nextProps.counts })
    }
  }
  props: Props;
  handleToList = (item, e) => {
    e.preventDefault()
    if (item) {
      this.context.router.push(`/requests/recruitment/list/${item}`)
    } else {
      this.context.router.push(`/requests/recruitment/list`)
    }
  }
  renderWorkButtons(classes) {
    if (this.state.access.worker || this.state.access.admin) {
      return (
        <div>
          <Badge className={classes.badge} badgeContent={this.state.counts.new} color='accent'>
            <Button onTouchTap={this.toNew}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list/new' }, true) ? 'accent': 'default'}>
              Новые
            </Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.approving} color='accent'>
            <Button onTouchTap={this.toApproving}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list/approving' }, true) ? 'accent': 'default'}>
              На утверждении
            </Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.work} color='accent'>
            <Button onTouchTap={this.toWork}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list/work' }, true) ? 'accent': 'default'}
            >В работе</Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.done} color='accent'>
            <Button onTouchTap={this.toDone}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list/done' }, true) ? 'accent': 'default'}
            >Архив</Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color='accent'>
            <Button onTouchTap={this.toAll}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list/all' }, true) ? 'accent': 'default'}
            >Все</Button>
          </Badge>
        </div>
      )
    }
  };
  renderSecurityButtons() {
    if (this.state.access.security) {
      return  <Button onTouchTap={this.toAll}
        color={this.context.router.isActive({ pathname: '/requests/recruitment/list/all' }, true) ? 'accent': 'default'}
          >Все</Button>
    }
  }
  renderApprovalButtons(classes) {
    if (this.state.access.approver) {
      return (
        <Badge className={classes.badge} badgeContent={this.state.counts.approval} color='accent'>
          <Button onTouchTap={this.toApproval}
            color={this.context.router.isActive({ pathname: '/requests/recruitment/list/approval' }, true) ? 'accent': 'default'}
          >На согласовании</Button>
        </Badge>
      )
    }
  };
  render() {
    const classes = this.props.classes
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type='caption' color='inherit'>Подбор специалиста</Typography>
            <Button onTouchTap={this.toList}
              color={this.context.router.isActive({ pathname: '/requests/recruitment/list' }, true) ? 'accent' : 'default'}
            >Мои</Button>
            {this.renderApprovalButtons(classes)}
            {this.renderWorkButtons(classes)}
            {this.renderSecurityButtons()}
          </Toolbar>
        </AppBar>
        <div className={classes.children}>
          {this.props.children || undefined}
        </div>
      </div>
    )
  }
}
RecruitmentLayout.contextTypes = {
  router : PropTypes.object.isRequired
}

RecruitmentLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapActionCreators = {
  fetchAccess,
  fetchCounts
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  counts: state.counts.data
})

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(RecruitmentLayout))