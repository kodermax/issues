import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Editor from '../Editor'
import classNames from 'classnames/bind'
import { addMessage } from '../../modules/message'
import { fetchMessages } from '../../modules/messages'
import theme from './theme.css'
const cx = classNames.bind(theme)
type Props = {
  addMessage : Function,
  fetchMessages:Function,
  requestId  : number,
  message   : Object,
  messages   : Object
}

function getRandomInt(min, max) {
  let rand = Math.floor(Math.random() * (max - min + 1)) + min
  return rand
}
const borderColors = (index) => {
  switch (index) {
    case 1:
      return '#2196f3'
    case 2:
      return '#3f51b5'
    case 3:
      return '#ffc107'
    case 4:
      return '#4caf50'
    default:
      return '#000'
  }
}
class Discuss extends Component {
  constructor(props : Props) {
    super(props)
    this.state = {
      editor: '',
      messages: [],
      showError: false
    }
    this.onChangeEditor = this.handleChangeEditor.bind(this)
    this.onSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.requestId && this.props.requestId > 0) {
      this.props.fetchMessages(this.props.requestId)
    }
  }
  componentWillReceiveProps(nextProps : Object) {
    if (nextProps.message && Object.keys(nextProps.message.item).length > 0) {
      this.props.messages.items.push(nextProps.message.item)
    }
    if (Object.keys(nextProps.messages).length > 0) {
      this.setState({ messages: nextProps.messages.items })
    }
  }
  handleChangeEditor = (value) => {
    this.setState({ editor: value })
  }
  props : Props;

 
  handleSubmit = (content) => {
    if (content) {
      let data = {
        content: content,
        requestId: parseInt(this.props.requestId, 0)
      }
      this.props.addMessage(data)
      this.setState({ editor: '', showError: false })
    } else {
      this.setState({ showError : true })
    }
  }
  render() {
    return (
        <div className={cx('discuss')}>
            <h2>Обсуждение</h2>
            {this.state.messages ? this.state.messages.map((item, i) => (
                <div key={i} style={{ borderLeftColor: borderColors(getRandomInt(1, 4)) }}
                    className={cx('panel-card', 'bg-white', 'p', 'clearfix', 'm-b-sm', 'b-l', 'b-l-2x', 'r')}
                >
                    <a className={cx('pull-left', 'm-r')}>
                        <img className={cx('w-40', 'rounded')} src={item.author.photo} alt='author' />
                    </a>
                    <div className={cx('pull-right', 'text-sm', 'text-muted')}>
                        <span className={cx('hidden-xs')}>{moment(item.created).format('DD.MM.YYYY HH:mm')}</span>
                        <i className={cx('fa', 'fa-paperclip', 'm-l-sm')} />
                    </div>
                    <div className={cx('clear-message')}>
                        <div>
                            <a className={cx('text-md')}>{item.author.shortName}</a>
                        </div>
                        <div className={cx('text-ellipsis', 'm-t-xs', 'text-muted-dk', 'text-sm')}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </div>
                </div>
      )) : undefined }
            {this.state.showError ? <div style={{ color: 'red' }}>Пустое сообщение</div> : undefined }
            <Editor onChange={this.onChangeEditor} onSubmit={this.onSubmit} value={this.state.editor} />
        </div>
    )
  }
}

const mapActionCreators = {
  addMessage,
  fetchMessages
}
const mapStateToProps = (state) => ({
  message    : state.message,
  messages   : state.messages
})

export default connect(mapStateToProps, mapActionCreators)(Discuss)
