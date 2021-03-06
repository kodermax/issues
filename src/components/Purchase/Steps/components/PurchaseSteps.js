import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import classNames from 'classnames/bind'
import SelectUser from '../../../../components/SelectUser'
import _ from 'lodash'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import EditIcon from 'material-ui-icons/ModeEdit'
import CancelIcon from 'material-ui-icons/Cancel'
import SpellCheckIcon from 'material-ui-icons/Spellcheck'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'
import LoopIcon from 'material-ui-icons/Loop'
import BuildIcon from 'material-ui-icons/Build'
import DoneIcon from 'material-ui-icons/Done'
import { green, orange, red } from 'material-ui/colors'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  }),
  yellowIcon: {
    color: 'rgb(245, 127, 23)'
  },
  doneIcon: {
    color: 'rgb(76, 175, 80)'
  },
  redIcon: {
    color: '#F44336'
  },
  icon: {
    marginBottom: '10px',
    marginRight: '8px'
  },
  iconButton: {
    verticalAlign: 'top',
    textShadow: '0 1px 1px rgba(0,0,0,0.25)',
    fontSize: '16px!important',
    lineHeight: '40px!important'
  },
  navButtonRoot: {
    maxWidth: 100
  },
  navButtonLabel: {
    fontSize: 11
  },
  stepAvatarRoot: {
    width: 46,
    height: 46,
    color: 'black'
  },
  canceled: {
    backgroundColor: red[500],
    color: 'white'
  },
  done: {
    backgroundColor: green[500],
    color: 'white'
  },
  work: {
    backgroundColor: orange[500]
  },
  stepIconRoot: {
    width: 16,
    height: 16
  },
  stepTitle: {
    color: '#9E9E9E',
    fontSize: '11px',
    lineHeight: 1.2,
    marginTop: '2px',
    marginBottom: 0,
    clear: 'none!important',
    width: '100px',
    fontWeight: 'normal'
  }
})


class PurchaseSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      access: {},
      approvalOpen: false,
      approvers: [],
      activeSelectApprover: false,
      steps: [],
      workOpen: false,
      selectUserDialog: false,
      selectUserAction: '',
      addApprover: '',
    }
    this.onAddApprover = this.handleAddApprover.bind(this)
    this.onSelectApprover = this.handleSelectApprover.bind(this)
    this.onSelectAddApprover = this.handleSelectAddApprover.bind(this)
    this.onChangeApprover = this.handleChangeApprover.bind(this)
    this.onSendReminder = this.handleSendReminder.bind(this)
    this.onCloseSelectUserDialog = this.handleCloseSelectUserDialog.bind(this)
    this.onShowAddApproverDialog = this.handleShowSelectUserDialog.bind(this, 'add')
  }

  componentDidMount() {
    this.fetchData(this.props.requestId)
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.steps)) return
    let newState = {
      access: !_.isEmpty(nextProps.access) ? nextProps.access : {},
      approvers: !_.isEmpty(nextProps.approvers) ? nextProps.approvers : [],
      docs: !_.isEmpty(nextProps.docs) ? nextProps.docs : [],
      steps: nextProps.steps.items
    }
    this.setState(newState)
    if (nextProps.requestId !== this.props.requestId) {
      this.fetchData(nextProps.requestId)
    }
  }
  fetchData = (id) => {
    this.props.fetchSteps(id)
    this.props.fetchApprovers(id)
  }
  handleAddApprover = (oldUser, newUser) => {
    if (!this.state.addApprover) {
      alert('Не выбран пользователь!')
    } else {
      let data = {
        status: 4,
        User: this.state.addApprover
      }
      this.props.submitAction('purchase', this.props.requestId, 'approval', data, () => {
        this.fetchData(this.props.requestId)
        this.setState({ selectUserDialog: false })
      })
    }
  }
  handleCloseSelectUserDialog = () => this.setState({ selectUserDialog: false, selectUserAction: '' });
  handleShowSelectUserDialog = (action) => this.setState({ selectUserDialog: true, selectUserAction: action });
  handleSelectApprover = (e) => {
    e.preventDefault()
    this.setState({ activeSelectApprover: true })
  }
  handleSelectAddApprover = (oldUser, newUser) => {
    this.setState({ addApprover: newUser })
  }
  handleSendReminder = (userId) => {
    let data = {
      user: userId
    }
    this.props.submitAction('purchase', this.props.requestId, 'approval_reminder', data, () => {
      this.props.showAlert('Напоминание успешно отправлено!')
    })
  }
  handleChangeApprover = (oldUser, newUser) => {
    this.props.fetchChangeApprover(this.props.requestId, { oldUser: oldUser, newUser: newUser }, () => {
      this.setState({ activeSelectApprover: false }, () => {
        this.props.fetchApprovers(this.props.requestId)
      })
    })
  }
  handleRequestApprovalClose = () => this.setState({ approvalOpen: false });
  handleShowStatus = (status) => {
    switch (status) {
      case 'approval':
        this.setState({ 'approvalOpen': !this.state.approvalOpen })
        break
      case 'work':
        this.props.fetchDocs(this.props.requestId)
        this.setState({ 'workOpen': !this.state.workOpen })
        break
      default:
    }
  }
  render() {
    const classes = this.props.classes
    const statusStyle = (value, userId) => {
      switch (value) {
        case 0:
          return <IconButton className={classes.yellowIcon} onTouchTap={() => this.handleSendReminder(userId)}>
            notifications_active
                </IconButton>
        case 1:
          return <Icon className={classes.doneIcon}>done</Icon>
        case 2:
          return <Icon className={classes.redIcon}>clear</Icon>
        default:
          return <Icon>done</Icon>
      }
    }
    const stepIcon = (value) => {
      switch(value) {
        case 'draft':
          return <EditIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'check': 
          return <SpellCheckIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'approval': 
          return <PlaylistAddCheckIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'wait': 
          return <LoopIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'work': 
          return <BuildIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'done': 
          return <DoneIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        case 'canceled': 
          return <CancelIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
        default: 
         return <DoneIcon classes={{
            root: this.props.classes.stepIconRoot
          }} />
      }
    }
    const showApprovalList = () => {
      return this.state.approvalOpen
        ? <Paper className={classes.paper} elevation={4}>
          <Typography type='headline' component='h3'>Лист согласования</Typography>
          <Button fab color="primary" className={classes.button} onTouchTap={this.onShowAddApproverDialog}>
            <AddIcon />
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='none'>№</TableCell>
                <TableCell padding='none' />
                <TableCell padding='none'>Ф.И.О.</TableCell>
                <TableCell padding='none'>Дата</TableCell>
                <TableCell padding='none'>Статус</TableCell>
                <TableCell padding='none'>Коментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.approvers.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell padding='none'>{i + 1}</TableCell>
                    <TableCell padding='none'>{this.state.access.admin || this.state.access.worker
                      ? <IconButton onTouchTap={this.onSelectApprover}>edit</IconButton> : undefined}

                    </TableCell>
                    <TableCell padding='none'>{this.state.activeSelectApprover
                      ? <SelectUser currentUser={item.user.id} onSelect={this.onChangeApprover} /> : item.user.fullName}
                    </TableCell>
                    <TableCell padding='none'>
                      {item.closed ? new Date(item.closed).toLocaleString('ru-ru') : undefined}
                    </TableCell>
                    <TableCell padding='none'>
                      {statusStyle(item.status, item.user.id)}
                    </TableCell>
                    <TableCell padding='none'>{item.comment}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper> : undefined
    }
    const showWorkList = () => {
      return this.state.workOpen
        ? <Paper className={classes.paper} elevation={4}>
          <Typography type='headline' component='h3'>Список 1с документов</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='none'>№</TableCell>
                <TableCell padding='none'>Наименование документа</TableCell>
                <TableCell padding='none'>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.docs.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell padding='none'>{i + 1}</TableCell>
                    <TableCell padding='none'>{item.title}</TableCell>
                    <TableCell padding='none'>
                      {item.status}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper> : undefined
    }
    return (
      <div>
        {this.state.steps.length > 0 ? 
        <div>
          <BottomNavigation showLabels value={0}>
           {this.state.steps.map((item, i) => {
             return <BottomNavigationAction classes={{
               root: classes.navButtonRoot,
               label: classes.navButtonLabel
             }} onTouchTap={()=> {this.handleShowStatus(item.id)}} key={i} label={item.title} icon={
                <Avatar classes={{
                  root: classNames(classes.stepAvatarRoot, {
                    [classes.canceled]: item.id === 'canceled' && item.closed !== null,
                    [classes.done]: item.closed !== null && item.id !== 'canceled',
                    [classes.wait]: item.closed === null && item.created === null,
                    [classes.work]: item.closed === null && item.created !== null,
                  })
                }}>{stepIcon(item.id)}</Avatar>
               } 
              />
           })}
          </BottomNavigation>
          <br/>
          <br/>
          {showApprovalList()}
          {showWorkList()}
          <Dialog open={this.state.selectUserDialog} onClose={this.onCloseApproverDialog}>
            <DialogTitle>Добавить согласующего</DialogTitle>
            <DialogContent>
              <SelectUser onSelect={this.onSelectAddApprover} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onAddApprover} primary>ДОБАВИТЬ</Button>
              <Button onClick={this.onCloseSelectUserDialog} primary>ОТМЕНА</Button>
            </DialogActions>
          </Dialog> 
        </div>: undefined }
      </div>
    )
  }
}

PurchaseSteps.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PurchaseSteps)
