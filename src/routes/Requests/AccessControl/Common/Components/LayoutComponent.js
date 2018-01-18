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
import { fetchAccess } from '../../../../../modules/access'
import { fetchCounts } from '../../../../../modules/counts'

type Props = {
  access: Object,
  counts: Object,
  fetchAccess: Function,
  fetchCounts: Function,
  children: Object,
  routeParams: Object
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
    paddingTop: '10px',
    paddingLeft: '2px'
  }
}
const categories = (item) => {
  switch (item) {
    case "staff":
      return "Пропуск для сотрудников"
    case "auto":
      return "Допуск транспорта"
    case "guest":
      return "Допуск посетителей"
    case "wealth":
      return "Вынос мат. ценности"
    case "keys":
      return "Допуск к помещению"
    case "otherstaff":
      return "Пропуск для работников сторонних организаций"
    case "holidays":
      return "Пропуск в нерабочее время"
    default:
      return ""
  }
}

class LayoutComponent extends Component {
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
        approval: '',
        new: '',
        work: ''
      }
    }
    this.toList = this.handleToList.bind(this, '', this.props.subcategory)
    this.toNew = this.handleToList.bind(this, 'new', this.props.subcategory)
    this.toAll = this.handleToList.bind(this, 'all', this.props.subcategory)
    this.toTotalAll = this.handleToList.bind(this, 'all', 'all')
    this.toApproval = this.handleToList.bind(this, 'approval', this.props.subcategory)
  }

  componentDidMount() {
    this.props.fetchAccess('accesscontrol', this.props.subcategory)
    this.props.fetchCounts('accesscontrol', this.props.subcategory)
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
  handleToList = (item, subcategory, e) => {
    e.preventDefault()
    if (item) {
      this.context.router.push(`/requests/accesscontrol/${subcategory}/list/${item}`)
    } else {
      this.context.router.push(`/requests/accesscontrol/${subcategory}/list`)
    }
  }
  renderWorkButtons(classes) {
    if (this.state.access.worker || this.state.access.admin) {
      return (
        <div>
          <Badge className={classes.badge} badgeContent={this.state.counts.new} color="accent">
            <Button onTouchTap={this.toNew}
              color={this.context.router.isActive({ pathname: `/requests/accesscontrol/${this.props.subcategory}/list/new` }, true) ? 'accent' : 'default'}>
              Новые
            </Button>
          </Badge>
        </div>
      )
    }
  };
  renderSecurityButtons(classes) {
    if (this.state.access.security || this.state.access.admin) {
      return <div>
        {this.props.subcategory !== 'all' ?
          <Badge className={classes.badge} badgeContent={this.state.counts.all} color='accent'>
            <Button onTouchTap={this.toAll}
              color={this.context.router.isActive({ pathname: `/requests/accesscontrol/${this.props.subcategory}/list/all` }, true) ? 'accent' : 'default'}
            >Все</Button>
          </Badge>
          : undefined}
        <Button onTouchTap={this.toTotalAll}
          color={this.context.router.isActive({ pathname: `/requests/accesscontrol/all/list/all` }, true) ? 'accent' : 'default'}
        >Все заявки</Button>
      </div>
    }
  }
  renderApprovalButtons(classes) {
    if (this.state.access.approver) {
      return (
        <Badge className={classes.badge} badgeContent={this.state.counts.approval} color="accent">
          <Button onTouchTap={this.toApproval}
            color={this.context.router.isActive({ pathname: `/requests/accesscontrol/${this.props.subcategory}/list/approval` }, true) ? 'accent' : 'default'}
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
              color={this.context.router.isActive({ pathname: `/requests/accesscontrol/${this.props.subcategory}/list` }, true) ? 'accent' : 'default'}
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
  router: PropTypes.object.isRequired
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
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(LayoutComponent))
