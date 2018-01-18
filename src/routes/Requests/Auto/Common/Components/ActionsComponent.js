import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import _ from 'lodash'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import {fetchActions} from '../../../../../modules/actions'
import {fetchApprovers} from '../../../../../modules/approvers'
import {fetchItem} from '../../../../../modules/item'
import {submitAction} from '../../../../../modules/action'
import {connect} from 'react-redux'

const styles = {
  button: {
    marginRight: '10px'
  }
}

class ActionsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approval: false,
      issueType: {category: 'auto', subcategory: this.props.subcategory},
      showButtons: false,
      work: false
    }
    this.onApprove = this.handleApprove.bind(this)
    this.onApprovalCancel = this.handleApprovalCancel.bind(this)
    this.onCancel = this.handleCancel.bind(this)
    this.onCopy = this.handleCopy.bind(this)
    this.onEdit = this.handleEdit.bind(this)
    this.onPrint = this.handlePrint.bind(this)
    this.onDone = this.handleDone.bind(this)
  }

  componentDidMount() {
    this.props.fetchActions(this.state.issueType, this.props.issueId)
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.actions)) return
    if (nextProps.actions.worker || nextProps.actions.admin || nextProps.actions.approver) {
      this.setState({
        admin: nextProps.actions.admin,
        approval: nextProps.item.status.id === 'approval',
        approver: nextProps.actions.approver,
        showButtons: true,
        work: nextProps.item.status.id === 'work',
        worker: nextProps.actions.worker,
        done: nextProps.item.status.id === 'done' || nextProps.item.status.id === 'canceled'
      })
    }
  }

  fetchData() {
    this.props.fetchActions(this.state.issueType, this.props.issueId)
    this.props.fetchItem(this.props.issueId)
    this.props.fetchApprovers(this.props.issueId)
  }

  handleApprove = (e) => {
    e.preventDefault()
    this.props.submitAction(this.state.issueType, this.props.issueId, 'approval', {status: 1}, () => {
      this.fetchData()
    })
  };
  handleApprovalCancel = (e) => {
    e.preventDefault()
    this.props.submitAction(this.state.issueType, this.props.issueId, 'approval', {status: 2}, () => {
      this.fetchData()
    })
  };
  handleCancel = (e) => {
    e.preventDefault()
    this.props.submitAction('auto', this.props.issueId, 'cancel', {}, () => {
      this.fetchData()
    })
  }
  handleCopy = (e) => {
    e.preventDefault()
    this.props.submitAction(this.state.issueType, this.props.issueId, 'copy', {}, (response) => {
      this.context.router.push(`/requests/auto/${this.props.subcategory}/edit/${response.id}`)
    })
  }
  handleEdit = (e) => {
    this.context.router.push(`/requests/auto/${this.props.subcategory}/edit/${this.props.issueId}`)
  }
  handlePrint = (e) => {
    e.preventDefault()
    window.open(`${process.env.REACT_APP_API_HOST}/requests/auto/${this.props.issueId}/${this.props.subcategory}/print`, 'blank')
  }
  handleDone = (e) => {
    e.preventDefault()
    this.props.submitAction(this.state.issueType, this.props.issueId, 'done', {}, () => {
      this.fetchData()
    })
  }

  renderWorkButtons(classes) {
    if (this.state.work && (this.state.worker || this.state.admin)) {
      return (
        <div>
          <Button onTouchTap={this.onEdit} raised className={classes.button}>Редактировать</Button>
          <Button onTouchTap={this.onDone} color='primary' raised className={classes.button}>Завершить</Button>
          <Button raised onTouchTap={this.onCancel} color='accent' className={classes.button}>Отменить</Button>
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
          </div>
          : undefined
      )
    }
  }

  render() {
    const classes = this.props.classes
    return (
      <div>
        {this.state.showButtons && !this.state.done ?
          <Toolbar disableGutters>
            {this.renderWorkButtons(classes)}
            {this.renderApprovalButtons(classes)}
            <Button onTouchTap={this.onPrint} color='primary' raised className={classes.button}>Печать</Button>
          </Toolbar>
          : <Toolbar disableGutters>
              <Button onTouchTap={this.onCopy} raised className={classes.button}>Копировать</Button>
              <Button onTouchTap={this.onPrint} color='primary' raised className={classes.button}>Печать</Button>
          </Toolbar>}
      </div>
    )
  }
}

ActionsComponent.contextTypes = {
  router: PropTypes.object.isRequired
}
const mapActionCreators = {
  fetchActions,
  fetchApprovers,
  fetchItem,
  submitAction
}

const mapStateToProps = (state) => ({
  actions: state.actions.data,
  approvers: state.approvers.data,
  item: state.request.data,
  steps: state.steps.data
})

ActionsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(ActionsComponent))