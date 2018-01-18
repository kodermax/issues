import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import _ from 'lodash'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Badge from 'material-ui/Badge'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'
import { fetchAccess } from '../../../../modules/access'
import { fetchCounts } from '../../../../modules/counts'

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

class Layout extends Component {
  constructor(props) {
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
        approval: '',
        new: '',
        work: '',
        watch: 0
      }
    }
    this.toList = this.handleToList.bind(this, '')
    this.toSearch = this.handleToSearch.bind(this)
    this.toCheck = this.handleToList.bind(this, 'check')
    this.toNew = this.handleToList.bind(this, 'new')
    this.toWork = this.handleToList.bind(this, 'work')
    this.toAll = this.handleToList.bind(this, 'all')
    this.toApproval = this.handleToList.bind(this, 'approval')
    this.toControl = this.handleToList.bind(this, 'control')
    this.toWatch = this.handleToList.bind(this, 'watch')
  }

  componentDidMount() {
    this.props.fetchAccess('purchase')
    this.props.fetchCounts('purchase')
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.access)) {
      this.setState({ access: nextProps.access })
    }
    if (!_.isEmpty(nextProps.counts)) {
      this.setState({ counts: nextProps.counts })
    }
  }
  handleToSearch = (e) => {
    e.preventDefault()
    this.context.router.push(`/requests/purchase/search`)
  }
  handleToList = (item, e) => {
    e.preventDefault()
    if (item) {
      this.context.router.push(`/requests/purchase/list/${item}`)
    } else {
      this.context.router.push(`/requests/purchase/list`)
    }
  }
  renderWorkButtons(classes) {
    if (this.state.access.worker || this.state.access.admin) {
      return (
        <div>
          <Badge className={classes.badge} badgeContent={this.state.counts.new} color="accent">
            <Button onTouchTap={this.toNew} color={this.context.router.isActive({ pathname: '/requests/purchase/list/new' }, true) ? "accent" : "default"}>
              Новые
              </Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.work} color="accent">
            <Button onTouchTap={this.toWork}
              color={this.context.router.isActive({ pathname: '/requests/purchase/list/work' }, true) ? "accent" : "default"}
            >В работе</Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color="accent">
            <Button onTouchTap={this.toAll}
              color={this.context.router.isActive({ pathname: '/requests/purchase/list/all' }, true) ? "accent" : "default"}
            >Все</Button>
          </Badge>
        </div>
      )
    }
  };
  renderSecurityButtons() {
    if (this.state.access.security) {
      return <Button onTouchTap={this.toAll}
        color={this.context.router.isActive({ pathname: '/requests/purchase/list/all' }, true) ? "accent" : "default"}
      >Все</Button>
    }
  }
  renderApprovalButtons(classes) {
    if (this.state.access.approver) {
      return (
        <Badge className={classes.badge} badgeContent={this.state.counts.approval} color="accent">
          <Button onTouchTap={this.toApproval}
            color={this.context.router.isActive({ pathname: '/requests/purchase/list/approval' }, true) ? "accent" : "default"}
          >На согласовании</Button>
        </Badge>
      )
    }
  };

  renderControlButtons(classes) {
    if (this.state.access.approver) {
      return (
        <Badge badgeContent={this.state.counts.control}
          color="accent"
        >
          <Button onTouchTap={this.toControl}
            color={this.context.router.isActive({ pathname: '/requests/purchase/list/control' }, true) ? "accent" : "default"}
          >На контроле</Button>
        </Badge>
      )
    }
  };
  renderWatchButtons(classes) {
    if (this.state.counts.watch > 0) {
      return (
        <Badge badgeContent={this.state.counts.watch}
          color="accent"
        >
          <Button onTouchTap={this.toWatch}
            color={this.context.router.isActive({ pathname: '/requests/purchase/list/watch' }, true) ? "accent" : "default"}
          >Наблюдение</Button>
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
            <Typography type='caption' color="inherit">Закупка</Typography>
            <Button onTouchTap={this.toList}
              color={this.context.router.isActive({ pathname: '/requests/purchase/list' }, true) ? 'accent' : 'default'}
            >Мои</Button>
            <Button onTouchTap={this.toSearch}
              color={this.context.router.isActive({ pathname: '/requests/purchase/search' }, true) ? 'accent' : 'default'}
            >Поиск</Button>
            {this.renderApprovalButtons(classes)}
            {this.renderWorkButtons(classes)}
            {this.renderControlButtons(classes)}
            {this.renderSecurityButtons(classes)}
            {this.renderWatchButtons(classes)}
          </Toolbar>
        </AppBar>
        <div className={classes.children}>
          {this.props.children || undefined}
        </div>
      </div>
    )
  }
}
Layout.contextTypes = {
  router: PropTypes.object.isRequired
}

Layout.propTypes = {
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

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(Layout))