// @flow
/* global CKEDITOR: true */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from 'material-ui/Button'
import $ from 'jquery'
import 'ckeditor'
type Props = {
  onChange: Function,
  onSubmit: Function,
  value: any
};
export default class Editor extends Component {
  constructor(props : Props) {
    super(props)
    this.onSend = this.handleSend.bind(this)
  }
  componentDidMount() {
    CKEDITOR.timestamp = '142'
    CKEDITOR.replace(this.refs.editor)
    CKEDITOR.editorConfig = (config) => {
      config.defaultLanguage = 'ru'
	    config.language = 'ru'
	    config.extraPlugins = 'uploadimage,pastebase64,uploadfile'
	    config.uploadUrl =  'https://api-files.xxx.ru/api/files'
    }
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs.editor)).remove()
  }
  props : Props;
  handleSend = () => {
    let data = CKEDITOR.instances.editor.getData()
    this.props.onSubmit(data)
    CKEDITOR.instances.editor.setData('')
  }
  render() {
    return (
        <div>
            <textarea id='editor' ref='editor' />
            <br />
            <Button raised onTouchTap={this.onSend}>Добавить сообщение</Button>
        </div>
    )
  }
}
