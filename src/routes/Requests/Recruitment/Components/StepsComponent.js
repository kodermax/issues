import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Table, {TableHead, TableBody,  TableRow,  TableCell} from 'material-ui/Table'
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
import SpellCheckIcon from 'material-ui-icons/Spellcheck'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'
import LoopIcon from 'material-ui-icons/Loop'
import BuildIcon from 'material-ui-icons/Build'
import DoneIcon from 'material-ui-icons/Done'
import { green, orange } from 'material-ui/colors'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { fetchChangeApprover } from '../../../../modules/changeApprover'
import { fetchApprovers } from '../../../../modules/approvers'
import { fetchSteps } from '../../../../modules/steps'

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

type Props = {
  access: Object,
  approvers: Object,
  fetchChangeApprover: Function,
  fetchDocs: Function,
  fetchSteps: Function,
  fetchApprovers: Function,
  issueId: number,
  steps: Array,
  submitAction: Function
}

class StepsComponent extends Component {
  constructor(props: Props) {
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
  state: {
    approvers: [],
    steps: []
  }
  componentDidMount() {
    this.fetchData(this.props.issueId)
  }
  componentWillReceiveProps(nextProps: Object) {
    let newState = {
      access: !_.isEmpty(nextProps.access) ? nextProps.access : {},
      approvers: !_.isEmpty(nextProps.approvers) ? nextProps.approvers : [],
      docs: !_.isEmpty(nextProps.docs) ? nextProps.docs : [],
      steps: _.isEmpty(nextProps.steps) ? [] : nextProps.steps.items
    }
    this.setState(newState)
    if (nextProps.issueId !== this.props.issueId) {
      this.fetchData(nextProps.issueId)
    }
  }
  props: Props;
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
      this.props.submitAction('recruitment', this.props.issueId, 'approval', data, () => {
        this.fetchData(this.props.issueId)
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
    this.props.submitAction('recruitment', this.props.issueId, 'approval_reminder', data, () => {
      this.props.showAlert('Напоминание успешно отправлено!')
    })
  }
  handleChangeApprover = (oldUser, newUser) => {
    this.props.fetchChangeApprover(this.props.issueId, { oldUser: oldUser, newUser: newUser }, () => {
      this.setState({ activeSelectApprover: false }, () => {
        this.props.fetchApprovers(this.props.issueId)
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
                    [classes.done]: item.closed !== null,
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

StepsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapActionCreators = {
  fetchApprovers,
  fetchChangeApprover,
  fetchSteps
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  approvers: state.approvers.data,
  changeApprover: state.changeApprover.data,
  steps: state.steps.data
})

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(StepsComponent))