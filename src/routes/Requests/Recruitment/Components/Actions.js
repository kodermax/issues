/*global window: true */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import _ from 'lodash'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import SelectUser from '../../../../components/SelectUser'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { fetchActions } from '../../../../modules/actions'
import { submitAction } from '../../../../modules/action'
import { fetchItem } from '../../../../modules/item'
import { fetchApprovers } from '../../../../modules/approvers'
import { fetchSteps } from '../../../../modules/steps'

type Props = {
    actions: Object,
    access: Object,
    item: Object,
    fetchActions: Function,
    fetchApprovers: Function,
    fetchItem: Function,
    fetchSteps: Function,
    issueId: Number,
    submitAction: Function
}
const styles = {
  button: {
    marginRight: '10px'
  }
}
class Actions extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      access: {},
      selectUserDialog: false,
      selectUserAction: '',
      addApprover: '',
      item: {},
      approval: false,
      check: false,
      draft: false,
      wait: false,
      work: false,
      done: false,
      menuOpen: false,
      anchorEl: undefined
    }
    this.onAddApprover = this.handleAddApprover.bind(this)
    this.onApprove = this.handleApprove.bind(this)
    this.onApprovalCancel = this.handleApprovalCancel.bind(this)
    this.onCancel = this.handleCancel.bind(this)
    this.onCloseSelectUserDialog = this.handleCloseSelectUserDialog.bind(this)
    this.onDone = this.handleDone.bind(this)
    this.onShowAddApproverDialog = this.handleShowSelectUserDialog.bind(this, 'add')
    this.onShowDelegateDialog = this.handleShowSelectUserDialog.bind(this, 'delegate')
    this.onDelete = this.handleDelete.bind(this)
    this.onDelegate = this.handleDelegate.bind(this)
    this.onEdit = this.handleEdit.bind(this)
    this.onTakeWork = this.handleTakeWork.bind(this)
    this.onReturnToWork = this.handleReturnToWork.bind(this)
    this.onSelectApprover = this.handleSelectApprover.bind(this)
    this.onSend = this.handleSend.bind(this)
    this.onSendToApproval = this.handleSendToApproval.bind(this)
    this.onShowMenu = this.handleShowMenu.bind(this)
  }

  componentDidMount() {
    this.props.fetchActions('recruitment', this.props.issueId)
  }

  componentWillReceiveProps(nextProps : Object) {
    if (_.isEmpty(nextProps.actions)) return
    if (_.isEmpty(nextProps.access)) return
    if (_.isEmpty(nextProps.item)) return
    let newState = {
      access: nextProps.access,
      approval: false,
      approver: false,
      item: nextProps.item,
      cancel: false,
      check: false,
      draft: false,
      wait: false,
      work: false
    }
    newState.draft = nextProps.item.status.id === 'draft'
    newState.cancel = nextProps.item.status.id === 'cancel'
    newState.approval = nextProps.item.status.id === 'approval'
    newState.approver = nextProps.actions.approver
    if (nextProps.actions.worker || nextProps.actions.admin) {
      newState.check = nextProps.item.status.id === 'check'
      newState.wait = nextProps.item.status.id === 'wait'
      newState.work = nextProps.item.status.id === 'work'
      newState.done = nextProps.item.status.id === 'done'
    }
    this.setState(newState)
  }
  props: Props;

  handleDone = (e: Object) => {
    e.preventDefault()
    this.props.submitAction('recruitment', this.props.issueId, 'done', {}, () => {
      this.fetchData()
    })
  }
  handleAddApprover = (oldUser, newUser) => {
    if (!this.state.addApprover) {
      alert('Не выбран пользователь!')
    } else {
      let data = {
        status: this.state.selectUserAction === 'delegate' ? 3 : 4,
        User: this.state.addApprover
      }
      this.props.submitAction('recruitment', this.props.issueId, 'approval', data, () => {
        this.fetchData()
        this.setState({ selectUserDialog: false })
      })
    }
  }
  fetchData() {
    this.props.fetchActions('recruitment', this.props.issueId)
    this.props.fetchItem(this.props.issueId)
    this.props.fetchApprovers(this.props.issueId)
    this.props.fetchSteps(this.props.issueId)
  }
  handleSelectApprover = (oldUser, newUser) => {
    this.setState({ addApprover: newUser })
  }
  handleMenuClose = () => this.setState({ menuOpen: false });
  handleSend = (e: Object) => {
    this.props.submitAction('recruitment', this.props.issueId, 'send', {}, () => {
      this.fetchData()
    })
  }
  handleCancel = (e : Object) => {
    e.preventDefault()
    this.props.submitAction('recruitment', this.props.issueId, 'cancel', {}, () => {
      this.context.router.push(`/requests/recruitment/${this.props.issueId}`)
    })
    this.context.router.push('/requests/recruitment/list')
  };

  handleCloseSelectUserDialog = () => this.setState({ selectUserDialog: false, selectUserAction: '' });
  handleShowSelectUserDialog = (action) => this.setState({ selectUserDialog: true, selectUserAction: action });

  handleDelete = (e : Object) => {
    e.preventDefault()
    if (window.confirm('Вы уверены что хотите удалить эту заявку и все что с ней связано?')) {
      this.props.submitAction('recruitment', this.props.issueId, 'delete', {}, () => {
        this.context.router.push('/requests/recruitment/list')
      })
    } else {
      return false
    }
  };
  handleApprove = (e) => {
    e.preventDefault()
    let data = {
      status: 1
    }
    this.props.submitAction('recruitment', this.props.issueId, 'approval', data, () => {
      this.fetchData()
    })
  };
  handleApprovalCancel = (e) => {
    e.preventDefault()
    let data = {
      status: 2
    }
    this.props.submitAction('recruitment', this.props.issueId, 'approval', data, () => {
      this.fetchData()
    })
  };
  handleShowMenu = (e) => {
    this.setState({ menuOpen: true, anchorEl: e.currentTarget })
  }
  handleDelegate = (event, value) => {
    let data = {
      user: value
    }
    this.props.submitAction('recruitment', this.props.issueId, 'delegate', data)
    this.handleMenuClose()
  };
  handleEdit = (e) => {
    e.preventDefault()
    this.props.submitAction('recruitment', this.props.issueId, 'revision', {}, () => {
      this.fetchData()
    })
  }

  handleSendToApproval = (e) => {
    let data = {}
    this.props.submitAction('recruitment', this.props.issueId, 'startApproval', data, () => {
      this.fetchData()
    })
  }
  handleTakeWork = (e) => {
    e.preventDefault()
    this.props.submitAction('recruitment', this.props.issueId, 'takeWork', {}, () => {
      this.fetchData()
    })
  };
  handleReturnToWork = (e) => {
    e.preventDefault()
    this.props.submitAction('recruitment', this.props.issueId, 'returnToWork', {}, () => {
      this.fetchData()
    })
  };
  renderDraftButtons(classes) {
    if (this.state.draft) {
      return (
        <div>
          <Button raised onTouchTap={this.onSend} className={classes.button}>Отправить</Button>
        </div>
      )
    }
  }
  renderApprovalButtons(classes) {
    if (this.state.approval) {
      return (
          this.state.approver
            ? <div>
              <Button onTouchTap={this.onApprove} raised className={classes.button}>Согласовать</Button>
              <Button onTouchTap={this.onApprovalCancel} raised className={classes.button}>Отклонить</Button>
              <Button raised className={classes.button} onTouchTap={this.onShowAddApproverDialog}>
                Добавить согласующего
              </Button>
              <Button raised className={classes.button} onTouchTap={this.onShowDelegateDialog}>
                Делегировать
              </Button>
            </div>
            : undefined
      )
    }
  }
  renderCheckButtons(classes) {
    if (this.state.check) {
      return (
        <div>
          <Button onTouchTap={this.onEdit} raised className={classes.button}>На доработку</Button>
          <Button raised className={classes.button} aria-owns='simple-menu' aria-haspopup='true'
            onClick={this.onShowMenu}>
            Делегировать
          </Button>
          <Menu anchorEl={this.state.anchorEl} id='simple-menu'  className={classes.menu}
            open={this.state.menuOpen} onClose={this.handleMenuClose}
          >
            { this.state.access.workers.map((item, i) => {
              return <MenuItem key={i} onClick={(event) => this.handleDelegate(event, item.id)}>
                {item.shortName}
              </MenuItem>
            })}
          </Menu>
          <Button onTouchTap={this.onSendToApproval} raised className={classes.button}>
            Отправить на согласование
          </Button>
          <Button raised onTouchTap={this.onCancel} className={classes.button}>Отмена</Button>
        </div>
      )
    }
  }
  renderWaitButtons(classes) {
    if (this.state.wait) {
      return (
        <div>
          <Button onTouchTap={this.onTakeWork} raised className={classes.button}>Взять в работу</Button>
          <Button raised onTouchTap={this.onCancel} className={classes.button}>Отмена</Button>
        </div>
      )
    }
  }
  renderWorkButtons(classes) {
      return (
        <div>
          {this.state.access.admin && !this.state.done ? 
          <div>
            <Button onTouchTap={this.onDone} raised className={classes.button}>Завершить</Button> 
            <Button raised onTouchTap={this.onCancel} className={classes.button}>Отмена</Button>
          </div>
          : undefined}
          
        </div>
      )
  }
  renderCancelButtons() {
    if (this.state.cancel) {
      return (
        <div />
      )
    }
  }
  renderDeleteButton(classes) {
    return (_.has(this.state.access, 'admin') && this.state.access.admin
      ? <Button raised onTouchTap={this.onDelete} className={classes.button}>Удалить</Button>
      : undefined)
  }
  renderDoneButtons(classes) {
    return (_.has(this.state.access, 'admin') && this.state.access.admin && this.state.done
    ? <Button raised onTouchTap={this.onReturnToWork} className={classes.button}>Вернуть в работу</Button>
    : undefined)
  }
  render() {
    const classes = this.props.classes
    return (
      <div>
        <Toolbar disableGutters>
          {this.renderDraftButtons(classes)}
          {this.renderCheckButtons(classes)}
          {this.renderApprovalButtons(classes)}
          {this.renderWaitButtons(classes)}
          {this.renderWorkButtons(classes)}
          {this.renderCancelButtons(classes)}
          {this.renderDoneButtons(classes)}
          {
            //this.renderDeleteButton(classes)
          }
        </Toolbar>
        <Dialog
          open={this.state.selectUserDialog}
          onClose={this.onCloseApproverDialog}
        >
          <DialogTitle>
            {this.state.selectUserAction === 'delegate' ? 'Делегировать' : 'Добавить согласующего' }
          </DialogTitle>
          <DialogContent>
            <SelectUser onSelect={this.onSelectApprover} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onAddApprover} color='primary'>ДОБАВИТЬ</Button>
            <Button onClick={this.onCloseSelectUserDialog} color='primary'>ОТМЕНА</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
Actions.contextTypes = {
  router: PropTypes.object.isRequired
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapActionCreators = {
  fetchActions,
  fetchApprovers,
  fetchItem,
  fetchSteps,
  submitAction
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  actions: state.actions.data,
  approvers: state.approvers.data,
  item: state.request.data,
  steps: state.steps.data
})

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(Actions))
