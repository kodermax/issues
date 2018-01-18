import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import _ from 'lodash'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import { fetchActions } from '../../../../../modules/actions'
import { fetchApprovers } from '../../../../../modules/approvers'
import { fetchItem } from '../../../../../modules/item'
import { submitAction } from '../../../../../modules/action'
import { fetchSteps } from './../Modules/StepsModule'
import { connect } from 'react-redux'

type Props = {
    actions: Object,
    subcategory: string
}
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
            issueType : {category: 'accesscontrol', subcategory: this.props.subcategory},
            showButtons: false,
            work: false
        }
        this.onApprove = this.handleApprove.bind(this)
        this.onApprovalCancel = this.handleApprovalCancel.bind(this)
        this.onCancel = this.handleCancel.bind(this)
        this.onDone = this.handleDone.bind(this)
    }
    componentDidMount() {
        this.fetchData()
    }
    componentWillReceiveProps(nextProps: Object) {
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
        } else {
            this.setState({
                approver: nextProps.actions.approver
            })
        }
    }
    props: Props;
    fetchData() {
        this.props.fetchActions(this.state.issueType, this.props.issueId)
        this.props.fetchItem(this.props.issueId)
        this.props.fetchApprovers(this.props.issueId)
        this.props.fetchSteps(this.props.issueId)
    }
    handleApprove = (e) => {
        e.preventDefault()
        this.props.submitAction(this.state.issueType, this.props.issueId, 'approval', { status: 1 }, () => {
            this.fetchData()
        })
    };
    handleApprovalCancel = (e) => {
        e.preventDefault()
        this.props.submitAction(this.state.issueType, this.props.issueId, 'approval', { status: 2 }, () => {
            this.fetchData()
        })
    };
    handleCancel = (e : Object) => {
        e.preventDefault()
        this.props.submitAction(this.state.issueType, this.props.issueId, 'cancel', {}, () => {
            this.fetchData()
        })
    }
    handleDone = (e: Object) => {
        e.preventDefault()
        this.props.submitAction(this.state.issueType, this.props.issueId, 'done', {}, () => {
          this.fetchData()
        })
    }
    renderWorkButtons(classes) {
        if (this.state.worker || this.state.admin) {
            return (
                <div>
                    <Button onTouchTap={this.onDone} color='primary' raised className={classes.button}>Завершить</Button>
                    <Button raised onTouchTap={this.onCancel} color='accent' className={classes.button}>Отменить</Button>
                </div>
            )
        }
    }
    renderApprovalButtons(classes) {
        if (this.state.approver) {
            return (
                <div>
                    <Button onTouchTap={this.onApprove} color='primary' raised className={classes.button}>Согласовать</Button>
                    <Button onTouchTap={this.onApprovalCancel} raised className={classes.button}>Отклонить</Button>
                </div>
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
                    </Toolbar>
                : undefined }
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
    fetchSteps,
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