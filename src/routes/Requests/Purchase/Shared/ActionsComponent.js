// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import BuildIcon from 'material-ui-icons/Build'
import PlayListAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'
import CancelIcon from 'material-ui-icons/Cancel'
import EditIcon from 'material-ui-icons/Edit'
import ContentCopyIcon from 'material-ui-icons/ContentCopy'
import DoneIcon from 'material-ui-icons/Done'
import PrintIcon from 'material-ui-icons/Print'
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
import { red } from 'material-ui/colors'

type Props = {
  actions: Object,
  access: Object,
  item: Object,
  fetchActions: Function,
  fetchApprovers: Function,
  fetchSteps: Function,
  fetchItem: Function,
  requestId: Number,
  submitAction: Function
}
const styles = {
  button: {
    marginRight: '10px'
  },
  cancelButton: {
    background: red[500],
    '&:hover': {
      background: red[500]
    }
  }
  
}
class ActionsComponent extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      access: {},
      selectUserDialog: false,
      selectUserAction: '',
      addApprover: '',
      item: {},
      closed: false,
      approval: false,
      check: false,
      draft: false,
      wait: false,
      work: false,
      worker: false,
      open: false,
      delegateMenu: false,
      anchorEl: undefined,
    }
    this.onAddApprover = this.handleAddApprover.bind(this)
    this.onApprove = this.handleApprove.bind(this)
    this.onApprovalCancel = this.handleApprovalCancel.bind(this)
    this.onCancel = this.handleCancel.bind(this)
    this.onDone = this.handleDone.bind(this)
    this.onCloseSelectUserDialog = this.handleCloseSelectUserDialog.bind(this)
    this.onShowAddApproverDialog = this.handleShowSelectUserDialog.bind(this, 'add')
    this.onShowDelegateDialog = this.handleShowSelectUserDialog.bind(this, 'delegate')
    this.onDelete = this.handleDelete.bind(this)
    this.onRevision = this.handleRevision.bind(this)
    this.onPrint = this.handlePrint.bind(this)
    this.onCopy = this.handleCopy.bind(this)
    this.onTakeWork = this.handleTakeWork.bind(this)
    this.onSelectApprover = this.handleSelectApprover.bind(this)
    this.onSendTo1c = this.handleSendTo1c.bind(this)
    this.onSend = this.handleSend.bind(this)
    this.onSendToApproval = this.handleSendToApproval.bind(this)
    this.onEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.fetchActions('purchase', this.props.requestId)
  }

  componentWillReceiveProps(nextProps: Object) {
    if (_.isEmpty(nextProps.actions)) return
    if (_.isEmpty(nextProps.access)) return
    if (_.isEmpty(nextProps.item)) return
    let newState = {
      access: nextProps.access,
      approval: false,
      approver: false,
      item: nextProps.item,
      cancel: false,
      closed: false,
      check: false,
      draft: false,
      wait: false,
      work: false,
      worker: false
    }
    newState.draft = nextProps.item.status.id === 'draft'
    newState.cancel = nextProps.item.status.id === 'cancel'
    newState.approval = nextProps.item.status.id === 'approval'
    newState.approver = nextProps.actions.approver
    if (nextProps.actions.worker) {
      newState.worker = nextProps.actions.worker
      newState.check = nextProps.item.status.id === 'check'
      newState.wait = nextProps.item.status.id === 'wait'
      newState.work = nextProps.item.status.id === 'work'
    }
    newState.closed = nextProps.item.status.id === 'done'
    this.setState(newState)
  }
  props: Props;

  fetchData = () => {
    this.props.fetchItem(this.props.requestId)
    this.props.fetchSteps(this.props.requestId)
    this.props.fetchApprovers(this.props.requestId)
  }
  /* APPROVAL */
  handleAddApprover = (oldUser, newUser) => {
    if (!this.state.addApprover) {
      alert('Не выбран пользователь!')
    } else {
      let data = {
        status: this.state.selectUserAction === 'delegate' ? 3 : 4,
        User: this.state.addApprover
      }
      this.props.submitAction('purchase', this.props.requestId, 'approval', data, () => {
        this.fetchData()
        this.setState({ selectUserDialog: false })
      })
    }
  }
  handleSelectApprover = (oldUser, newUser) => {
    this.setState({ addApprover: newUser })
  }
  handleApprove = (e) => {
    e.preventDefault()
    this.props.submitAction('purchase', this.props.requestId, 'approval', { status: 1 }, () => {
      this.fetchData()
    })
  };
  handleApprovalCancel = (e) => {
    e.preventDefault()
    this.props.submitAction('purchase', this.props.requestId, 'approval', { status: 2 }, () => {
      this.fetchData()
    })
  };
  /* APPROVAL */
  handleSend = (e: Object) => {
    this.props.submitAction('purchase', this.props.requestId, 'send', {}, () => {
      this.context.router.push(`/requests/purchase/view/${this.props.requestId}`)
    })
  }
  handleEdit = (e: Object) => {
    this.context.router.push(`/requests/purchase/edit/${this.props.requestId}`)
  }
  handleCancel = (e: Object) => {
    e.preventDefault()
    this.props.submitAction('purchase', this.props.requestId, 'cancel', {}, () => {
      this.context.router.push(`/requests/purchase/view/${this.props.requestId}`)
    })
    this.context.router.push('/requests/purchase/list')
  };
  handleDone = (e: Object) => {
    e.preventDefault()
    this.props.submitAction('purchase', this.props.requestId, 'done', {}, () => {
      this.fetchData()
    })
  };

  handleCloseSelectUserDialog = () => this.setState({ selectUserDialog: false, selectUserAction: '' });
  handleShowSelectUserDialog = (action) => this.setState({ selectUserDialog: true, selectUserAction: action });

  handleDelete = (e: Object) => {
    e.preventDefault()
    if (window.confirm('Вы уверены что хотите удалить эту заявку и все что с ней связано?')) {
      this.props.submitAction('purchase', this.props.requestId, 'delete', {}, () => {
        this.context.router.push('/requests/purchase/list')
      })
    } else {
      return false
    }
  };

  /* MENU */
  handleMenuClick = (menu, event) => {
    this.setState({ [menu]: true, anchorEl: event.currentTarget })
  };
  handleMenuClose = (menu) => this.setState({ [menu]: false });
  /* MENU */

  handleDelegate = (event, value) => {
    let data = {
      user: value
    }
    this.props.submitAction('purchase', this.props.requestId, 'delegate', data, () => {
      this.handleMenuClose('delegateMenu')
    })

  };
  handleRevision = (e) => {
    e.preventDefault()
    this.props.submitAction('purchase', this.props.requestId, 'revision', {}, () => {
      this.fetchData()
      this.handleMenuClose('open')
    })
  }
  handlePrint = (e) => {
    e.preventDefault()
    let win = window.open('', 'blank')
    this.props.submitAction('purchase', this.props.requestId, 'print', {}, (result) => {
      if (result.url) {
        win.document.location = result.url
      } else {
        alert('Ошибка')
      }
    })
  }
  handleSendToApproval = (e) => {
    if (this.state.item.assigned !== null) {
      let data = {}
      this.props.submitAction('purchase', this.props.requestId, 'startApproval', data, () => {
        this.fetchData()
        this.handleMenuClose('open')
      })
    } else {
      alert('Не выбран исполнитель!')
    }

  }
  handleCopy = (e) => {
    this.props.submitAction('purchase', this.props.requestId, 'copy', {}, (response) => {
      this.context.router.push(`/requests/purchase/edit/${response.id}`)
    })
  }
  handleTakeWork = (e) => {
    e.preventDefault()
    let data = {
      status: 1
    }
    this.props.submitAction('purchase', this.props.requestId, 'wait', data, () => {
      this.fetchData()
      this.handleMenuClose('open')
    })
  };
  handleSendTo1c = (e) => {
    e.preventDefault()
    let data = {
      status: 1
    }
    this.props.submitAction('purchase', this.props.requestId, 'send1C', data, () => {
      this.handleMenuClose('open')
    })
  };
  renderDeleteButton(classes) {
    return ((_.has(this.state.access, 'admin') && this.state.access.admin) || this.state.draft
      ? <Button raised color="accent" onTouchTap={this.onDelete} className={classes.button}>Удалить</Button>
      : undefined)
  }
  renderMenu = (classes, buttons, items) => {
    return (
      <div>
        {buttons}
        {items.length > 0 ? <div style={{display:'inline-block'}}>
          <Button raised
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleMenuClick.bind(this, 'open')}
          > ...
          </Button>
           <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleMenuClose.bind(this, 'open')}>
              {items.map((item, i) => {
                return <div key={i}>{item}</div>
              })}
          </Menu> </div> : undefined }
      </div>
    )
  }
  renderButtons = (classes, menuItems) => {
    if (this.state.draft) {
      let buttons = <div style={{display:'inline-block'}}><Button raised onTouchTap={this.onSend} className={classes.button}>Отправить заявку</Button>
      <Button raised onTouchTap={this.onDelete} className={classes.button}>Удалить</Button></div>
      return this.renderMenu(classes, buttons, [])
    }
    if (this.state.check) {
        let buttons = <div style={{display:'inline-block'}}>
          <Button color='primary' onTouchTap={this.onRevision} raised className={classes.button}>На доработку</Button>
          <Button color='primary' raised className={classes.button} aria-owns={this.state.delegateMenu ? 'simple-menu' : null} aria-haspopup='true'
            onClick={this.handleMenuClick.bind(this, 'delegateMenu')}>
            Делегировать
          </Button>
          <Menu anchorEl={this.state.anchorEl} id='simple-menu' className={classes.menu}
            open={this.state.delegateMenu} onClose={this.handleMenuClose.bind(this, 'delegateMenu')}
          >
            {this.state.access.workers.map((item, i) => {
              return <MenuItem key={i} onClick={(event) => this.handleDelegate(event, item.id)}>
                {item.shortName}
              </MenuItem>
            })}
          </Menu>
        </div>
      return this.renderMenu(classes, buttons, [menuItems[1], menuItems[3], menuItems[4], menuItems[8], menuItems[5], menuItems[9]])
    }
    if (this.state.approval) {
      let buttons = <div style={{display:'inline-block'}}>
        <Button onTouchTap={this.onApprove} raised color='primary' className={classes.button}>Согласовать</Button>
        <Button classes={{ root: classes.cancelButton}} onTouchTap={this.onApprovalCancel} color='accent' raised className={classes.button}>Отклонить</Button>
      </div>
      return (
        this.state.approver
          ?
            this.renderMenu(classes, buttons, [menuItems[13], menuItems[14]])
          : this.renderMenu(classes, undefined, [menuItems[1], menuItems[8], menuItems[9]])
      )
    }
    if (this.state.work) {
      let buttons = <Button onTouchTap={this.onSendTo1c} color='primary' raised className={classes.button}>Отправить в 1с</Button>
      return (
        this.renderMenu(classes, buttons, [menuItems[1], menuItems[8], menuItems[9], menuItems[10], menuItems[5]])
      )
    }
    if (this.state.access.security && this.state.item.status.id === 'work') {
      let buttons = <Button onTouchTap={this.onPrint} color='primary' raised className={classes.button}>Печать</Button>
      return (
        this.renderMenu(classes, buttons, [])
      )
    }
    if (this.state.closed) {
      let buttons = <Button onTouchTap={this.onPrint} color='primary' raised className={classes.button}>Печать</Button>
      return (
        this.renderMenu(classes, buttons, [])
      )
    }
  }
  render() {
    const classes = this.props.classes
    const menuItems = [
      <MenuItem onClick={this.onSend}>Отправить заявку</MenuItem>,
      <MenuItem onClick={this.onEdit}><EditIcon style={{marginRight: 10}} />Редактировать</MenuItem>,
      <MenuItem onClick={this.onRevision}>На доработку</MenuItem>,
      <MenuItem onClick={this.onTakeWork}><BuildIcon style={{marginRight: 10}} /> Взять в работу</MenuItem>,
      <MenuItem onClick={this.onSendToApproval}><PlayListAddCheckIcon style={{marginRight: 10}} /> Отправить на согласование</MenuItem>,
      <MenuItem onClick={this.onCancel}><CancelIcon style={{marginRight: 10}} /> Отмена</MenuItem>,
      <MenuItem onClick={this.onSendTo1c}>Отправить в 1с</MenuItem>,
      <MenuItem onClick={this.onDelete}>Удалить</MenuItem>,
      <MenuItem onClick={this.onPrint}><PrintIcon style={{marginRight: 10}} />Печать</MenuItem>,
      <MenuItem onClick={this.onCopy}><ContentCopyIcon style={{marginRight: 10}} /> Копировать</MenuItem>,
      <MenuItem onClick={this.onDone}><DoneIcon style={{marginRight: 10}} />Завершить</MenuItem>,
      <MenuItem onClick={this.onApprove}>Согласовать</MenuItem>,
      <MenuItem onClick={this.onApprovalCancel}>Отклонить</MenuItem>,
      <MenuItem onClick={this.onShowAddApproverDialog}>Добавить согласующего</MenuItem>,
      <MenuItem onClick={this.onShowDelegateDialog}>Делегировать</MenuItem>
    ]
    return (
      <div>
        <Toolbar disableGutters>
          {this.renderButtons(classes, menuItems)}
        </Toolbar>
        <Dialog open={this.state.selectUserDialog} onClose={this.onCloseSelectUserDialog}>
          <DialogTitle>
            {this.state.selectUserAction === 'delegate' ? 'Делегировать' : 'Добавить согласующего'}
          </DialogTitle>
          <DialogContent>
            <SelectUser onSelect={this.onSelectApprover} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onAddApprover} color="primary">ДОБАВИТЬ</Button>
            <Button onClick={this.onCloseSelectUserDialog} color="primary">ОТМЕНА</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
ActionsComponent.contextTypes = {
  router: PropTypes.object.isRequired,
}
ActionsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapActionCreators = {
  fetchActions,
  fetchApprovers,
  fetchSteps,
  fetchItem,
  submitAction
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  actions: state.actions.data,
  approvers: state.approvers.data,
  item: state.request.data,
  steps: state.steps.data
})

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(ActionsComponent))
