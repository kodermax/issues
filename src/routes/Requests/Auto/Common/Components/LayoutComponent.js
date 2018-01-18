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
import { fetchAccess } from '../../../../../modules/access'
import { fetchCounts } from '../../../../../modules/counts'

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
    paddingTop: '10px',
    paddingLeft: '2px'
  }
}
const categories = (item) =>{
  switch (item) {
    case "staff":
      return "Доставка сотрудников"
    case "delivery":
      return "Доставка ТМЦ на склад"
    case "shipping":
      return "Отправка ТМЦ со склада"
    case "docs":
      return "Корреспонденция"
    default:
      return ""
  }
}
 
class LayoutComponent extends Component {
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
        work: ''
      }
    }
    this.toList = this.handleToList.bind(this, '', this.props.subcategory)
    this.toNew = this.handleToList.bind(this, 'new', this.props.subcategory)
    this.toAll = this.handleToList.bind(this, 'all', this.props.subcategory)
    this.toTotalAll = this.handleToList.bind(this, 'all', 'all')
    this.toSubCategoryTotalAll = this.handleToList.bind(this, 'all', this.props.subcategory)
    this.toApproval = this.handleToList.bind(this, 'approval', this.props.subcategory)
  }

  componentDidMount() {
    this.props.fetchAccess('auto', this.props.subcategory)
    this.props.fetchCounts('auto', this.props.subcategory)
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.access)) {
      this.setState({ access: nextProps.access })
    }
    if (!_.isEmpty(nextProps.counts)) {
      this.setState({ counts: nextProps.counts })
    }
  }

  handleToList = (item, subcategory, e) => {
    e.preventDefault()
    if (item) {
      this.context.router.push(`/requests/auto/${subcategory}/list/${item}`)
    } else {
      this.context.router.push(`/requests/auto/${subcategory}/list`)
    }
  }
  renderWorkButtons(classes) {
    if (this.state.access.worker || this.state.access.admin) {
      return (
        <div>
          <Badge className={classes.badge} badgeContent={this.state.counts.new} color="accent">
            <Button onTouchTap={this.toNew}
              color={this.context.router.isActive({ pathname: `/requests/auto/${this.props.subcategory}/list/new`}, true) ? 'accent': 'default'}>
              Новые
            </Button>
          </Badge>
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color="accent">
            <Button onTouchTap={this.toSubCategoryTotalAll}
            color={this.context.router.isActive({ pathname: `/requests/auto/${this.props.subcategory}/list/all` }, true) ? 'accent' : 'default'}
          >Все заявки</Button>
          </Badge>
        </div>
      )
    }
  };
  renderSecurityButtons(classes) {
    if (this.state.access.security) {
      return <div>
        {this.props.subcategory !== 'all' ? 
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color='accent'>
            <Button onTouchTap={this.toAll}
              color={this.context.router.isActive({ pathname: `/requests/auto/${this.props.subcategory}/list/all` }, true) ? 'accent': 'default'}
            >Все</Button>
          </Badge>
          : undefined }
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color="accent">
            <Button onTouchTap={this.toTotalAll}
              color={this.context.router.isActive({ pathname: `/requests/auto/all/list/all` }, true) ? 'accent': 'default'}
            >Все заявки</Button>
          </Badge>
        </div>
    }
  }
  renderApprovalButtons(classes) {
    if (this.state.access.approver) {
      return (
        <Badge className={classes.badge} badgeContent={this.state.counts.approval} color="accent">
          <Button onTouchTap={this.toApproval}
            color={this.context.router.isActive({ pathname: `/requests/auto/${this.props.subcategory}/list/approval` }, true) ? 'accent': 'default'}
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
            <Typography type='caption' color='inherit'>{categories(this.props.subcategory)}</Typography>
            <Button onTouchTap={this.toList}
              color={this.context.router.isActive({ pathname: `/requests/auto/${this.props.subcategory}/list` }, true) ? 'accent': 'default'}
            >Мои</Button>
            {this.renderApprovalButtons(classes)}
            {this.renderWorkButtons(classes)}
            {this.renderSecurityButtons(classes)}
          </Toolbar>
        </AppBar>
        <div className={classes.children}>
          {this.props.children || undefined}
        </div>
      </div>
    )
  }
}
LayoutComponent.contextTypes = {
  router : PropTypes.object.isRequired
}

const mapActionCreators = {
  fetchAccess,
  fetchCounts
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  counts: state.counts.data
})

LayoutComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(LayoutComponent))
