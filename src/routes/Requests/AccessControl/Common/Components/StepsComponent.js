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
import Style from './theme.css'
import classNames from 'classnames/bind'
import SelectUser from '../../../../../components/SelectUser'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchChangeApprover } from '../Modules/ApproverModule'
import { fetchApprovers } from '../../../../../modules/approvers'
import { fetchSteps } from './../Modules/StepsModule'
import { submitAction } from '../../../../../modules/action'
import { showAlert } from '../../../../../store/alert'


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

const cx = classNames.bind(Style)

const stepIcons = {
  check: 'spellcheck',
  draft: 'mode_edit',
  approval: 'playlist_add_check',
  wait: 'loop',
  work: 'build',
  done: 'done',
  canceled: 'clear'
}
class StepsComponent extends Component {
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
      issueType : {category: 'accesscontrol', subcategory: this.props.subcategory}
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
    this.fetchData(this.props.issueId)
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.steps)) return
    let newState = {
      access: !_.isEmpty(nextProps.access) ? nextProps.access: {},
      approvers: !_.isEmpty(nextProps.approvers) ? nextProps.approvers: [],
      steps: nextProps.steps.items
    }
    this.setState(newState)
    if (nextProps.issueId !== this.props.issueId) {
      this.fetchData(nextProps.issueId)
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
      this.props.submitAction(this.state.issueType, this.props.issueId, 'approval', data, () => {
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
      this.props.submitAction(this.state.issueType, this.props.issueId, 'approval_reminder', data, () => {
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
                        <TableCell padding='none'>{this.state.access.admin
                      ? <IconButton onTouchTap={this.onSelectApprover}>edit</IconButton> : undefined }

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
            <ul className={cx('smile_icon_list', 'top', 'circle', 'with_bg')}>
                {this.state.steps.map((item, i) => (
                    <li key={i} className={cx('icon_list_item')}>
                        <div className={cx('icon_list_icon', {
                            'done': item.closed !== null,
                            'wait': item.closed === null && item.created === null,
                            'work': item.closed === null && item.created !== null
                          })}>
                            <IconButton onTouchTap={() => this.handleShowStatus(item.id)} className={classes.iconButton}>
                              {stepIcons[item.id]}
                            </IconButton>
                        </div>
                        <div className={cx('icon_description')} id='Info-list-wrap-1594'>
                            <h3 className={classes.stepTitle}>
                                {item.closed === null && item.created !== null
                                  ? <b style={{ color: '#000' }}>{item.title}</b> : item.title}
                            </h3>
                        </div>
                        <div className={cx('icon_list_connector', 'animated', 'fadeInLeft', 'delay-03', {
                            'done': item.closed !== null,
                            'wait': item.closed === null
                          })}
                        />
                    </li>
                  ))}
            </ul>
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
        </div>
    )
  }
}


const mapActionCreators = {
  fetchApprovers,
  fetchChangeApprover,
  fetchSteps,
  showAlert,
  submitAction
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  approvers: state.approvers.data,
  changeApprover: state.changeApprover.data,
  steps: state.steps.data
})

StepsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(StepsComponent))