/* global $: true */
import React, { Component } from 'react'
import { hideAlert } from '../../store/alert'
import { hideNotification } from '../../store/notification'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Header from '../../components/Header/Header'
import style from './CoreLayout.css'

import _ from 'lodash'

const theme = {
  frame: {
    position: 'absolute',
    display: 'block',
    margin: 0,
    padding: 0,
    zIndex: 10003,
    opacity: 1,
    backgroundColor: '#fff'
  }
}
type Props = {
  alert: boolean,
  alertMessage: string,
  children: Object,
  hideAlert: Function,
  hideNotification: Function,
  notification: boolean,
  notificationMessage: string
}
class CoreLayout extends Component {
  constructor(props: Props) {
    super(props)
    this.frameRect = {}
    this.onMaximize = this.maximize.bind(this)
    this.onMinimize = this.minimize.bind(this)
    this.onSnackbarClose = this.handleSnackbarClose.bind(this)
    this.onDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      fullscreen: false
    }
  }

  transform(newRect, maximize = false) {
    const boundingBox = this.getFrameRect()

    let top = this.refs.frame.offsetTop
    let left = this.refs.frame.offsetLeft
    let width = boundingBox.width
    let height = boundingBox.height

    if (!newRect) return
    this.frameRect = {}
    this.frameRect.top = typeof newRect.top === 'number' ? newRect.top : newRect.bottom
      ? (newRect.bottom - (newRect.height || height)) : top
    this.frameRect.left = typeof newRect.left === 'number' ? newRect.left : newRect.right
      ? (newRect.right - (newRect.width || width)) : left
    this.frameRect.width = typeof newRect.width === 'number' ? newRect.width
      : (typeof newRect.right === 'number' && typeof newRect.left === 'number') ? newRect.right - newRect.left
        : typeof newRect.right === 'number' ? newRect.right - this.frameRect.left : width
    this.frameRect.height = typeof newRect.height === 'number' ? newRect.height
      : (typeof newRect.bottom === 'number' && typeof newRect.top === 'number')
        ? newRect.top - newRect.bottom : typeof newRect.bottom === 'number' ? newRect.bottom - this.frameRect.top : height
    if (maximize) {
      this.frameRect = _.merge(this.frameRect, theme.frame)
    }
    this.forceUpdate()
  }
  getFrameRect() {
    return this.refs.frame.getBoundingClientRect()
  }
  handleDialogClose = () => {
    this.props.hideAlert()
  };
  handleSnackbarClose = () => {
    this.props.hideNotification()
  };
  maximize() {
    this.transform({
      top: 0, left: 0, width: document.documentElement.clientWidth,
      height: $('table.bx-layout-table').height()
    }, true)
    this.setState({ fullscreen: true })
  }
  minimize() {
    this.transform({ width: $('#root').width(), height: $('#workarea-content').height() })
    this.setState({ fullscreen: false })
  }
  render() {
    const { alert, alertMessage, children, notification, notificationMessage } = this.props

    return (
      <div ref='frame' style={{ ...this.frameRect }}>
        <Header rightIcon={this.state.fullscreen ? 'fullscreen_exit' : 'fullscreen'}
          rightIconClick={this.state.fullscreen ? this.onMinimize : this.onMaximize}
        />
        <div className={style.mainContainer}>
          {children || undefined}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={notification}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={notificationMessage}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Dialog open={alert} onClose={this.onDialogClose}>
          <DialogTitle>Внимание</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDialogClose} color="primary">OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
const mapActionCreators = {
  hideAlert,
  hideNotification
}
const mapNewRectToProps = (newRect) => ({
  alert: newRect.alert.active,
  alertMessage: newRect.alert.message,
  notification: newRect.notification.active,
  notificationMessage: newRect.notification.message
})

CoreLayout.defaultProps = {
  alert: false,
  alertMessage: '',
  notification: false,
  notificationMessage: ''
}

export default connect(mapNewRectToProps, mapActionCreators)(CoreLayout)