// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListSubheader,
} from 'material-ui/List'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import SelectUser from '../SelectUser'
import { submitAction } from '../../modules/action'
import { connect } from 'react-redux'
import { fetchWatchers } from '../../modules/watchers'
import { removeWatcher } from '../../modules/watchers'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '100%',
        maxWidth: 260,
        maxHeight: 300,
    },
})

class Watchers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            selectUserDialog: false,
            selectUserAction: '',
            watchers: []
        }
        if (this.props.subcategory) {
            this.state.issueType = { category: this.props.category, subcategory: this.props.subcategory }
        } else {
            this.state.issueType = this.props.category
        }
        this.onAddUser = this.handleAddUser.bind(this)
        this.onSelectUser = this.handleSelectUser.bind(this)
        this.onCloseUserDialog = this.handleCloseSelectUserDialog.bind(this)
        this.onShowUserDialog = this.handleShowSelectUserDialog.bind(this)
    }
    componentDidMount() {
        this.fetchData(this.props.issueId)
    }
    componentWillReceiveProps(nextProps) {
        let newState = {
            watchers: Object.keys(nextProps).indexOf('watchers') !== -1 && nextProps.watchers !== undefined ? nextProps.watchers : []
        }
        this.setState(newState)
    }
    fetchData = (id) => {
        this.props.fetchWatchers(id, this.state.issueType)
    }
    handleSelectUser = (oldUser, newUser) => {
        this.setState({ user: newUser })
    }
    handleShowSelectUserDialog = () => this.setState({ selectUserDialog: true })
    handleCloseSelectUserDialog = () => this.setState({ selectUserDialog: false })
    handleAddUser = (oldUser, newUser) => {
        if (!this.state.user) {
            alert('Не выбран пользователь!')
        } else {
            let data = {
                User: this.state.user
            }
            this.props.submitAction(this.state.issueType, this.props.issueId, 'watchers', data, () => {
                this.fetchData(this.props.issueId)
                this.setState({ selectUserDialog: false })
            })
        }
    }
    onDeleteUser(userId) {
        this.props.removeWatcher(this.props.issueId, this.state.issueType, userId, () => {
            this.fetchData(this.props.issueId)
        })
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <List className={classes.root} subheader={<ListSubheader>Наблюдатели
                <Button fab mini color="primary" aria-label="add" className={classes.button}>
                        <AddIcon onTouchTap={this.onShowUserDialog} />
                    </Button>
                </ListSubheader>}>
                    {this.state.watchers.map((item, key) => (
                        <div key={key}><ListItem
                            key={key}
                            dense
                            button
                        >
                            <ListItemText primary={item.shortName} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="delete" onTouchTap={this.onDeleteUser.bind(this, item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <Dialog open={this.state.selectUserDialog} onClose={this.onCloseUserDialog}>
                    <DialogTitle>Добавить наблюдателя</DialogTitle>
                    <DialogContent>
                        <SelectUser onSelect={this.onSelectUser} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onAddUser} color='primary'>ДОБАВИТЬ</Button>
                        <Button onClick={this.onCloseUserDialog}>ОТМЕНА</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapActionCreators = {
    fetchWatchers,
    removeWatcher,
    submitAction
}
const mapStateToProps = (state) => ({
    watchers: state.watchers.data,
})
Watchers.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(Watchers))