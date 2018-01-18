import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import LoadingBar from '../Bar/LoadingBar'
import Button from 'material-ui/Button'
import Badge from 'material-ui/Badge'
import { connect } from 'react-redux'
import { fetchCounts } from '../../modules/totalCounts'
import { fetchUser } from '../../modules/user'
import _ from 'lodash'
const jwtDecode = require('jwt-decode')

const styles = {
  appBar: {
    position: 'relative'
  },
  root: {
    position: 'relative',
    width: '100%'
  },
  flex: {
    flex: 1
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.toHome = this.handleToHome.bind(this)
    this.toList = this.handleToList.bind(this)
    this.toApproval = this.handleToList.bind(this, 'approval')
    this.toSubordinates = this.handleToList.bind(this, 'subordinates')
    this.state = {
      counts: {
        all: '',
        approval: '',
        new: '',
        work: ''
      }
    }
  }
  componentDidMount() {
    this.props.fetchCounts()
    const token = window.localStorage.getItem('issuesToken')
    const decoded = jwtDecode(token)
    if (Object.keys(decoded).indexOf('Id') !== -1) {
      this.props.fetchUser(decoded['Id'])
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.counts)) {
      this.setState({ counts: nextProps.counts })
    }
    if (!_.isEmpty(nextProps.user)) {
      this.setState({ user: nextProps.user })
    }
  }
  handleToHome = (e) => {
    e.preventDefault()
    this.context.router.push('/requests')
  };
  handleToList = (item, e) => {
    e.preventDefault()
    if (item) {
      this.context.router.push(`/requests/list/${item}`)
    } else {
      this.context.router.push('/requests/list')
    }
  };

  render() {
    const classes = this.props.classes
    const { rightIconClick } = this.props
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast">
              <Icon onTouchTap={this.toHome}>home</Icon>
            </IconButton>
            {this.state.counts.approval > 0 ?
              <Badge className={classes.badge} badgeContent={this.state.counts.approval} color="accent">
                <Button onTouchTap={this.toApproval}
                  color={this.context.router.isActive({ pathname: `/requests/list/approval` }, true) ? 'accent' : 'contrast'}
                >На согласовании</Button>
              </Badge> : undefined}
            {this.state.user &&  this.state.user.isManager ?
              <Button onTouchTap={this.toSubordinates}
                color={this.context.router.isActive({ pathname: `/requests/list/subordinates` }, true) ? 'accent' : 'contrast'}
              >Заявки подчиненных</Button> : undefined}
            <Typography type='title' color="inherit" className={classes.flex} />
            <IconButton color="contrast" onTouchTap={rightIconClick}>fullscreen</IconButton>
          </Toolbar>
        </AppBar>
        <LoadingBar />
      </div>
    )
  }
}

const mapActionCreators = {
  fetchCounts,
  fetchUser
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  counts: state.totalCounts.data,
  user: state.user.data
})

Header.contextTypes = {
  router: PropTypes.object.isRequired
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles, { name: 'Header' })(Header))