// @flow

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'devextreme/ui/form'
import 'devextreme/ui/date_box'
import 'devextreme/ui/radio_group'
import 'devextreme/ui/text_area'
import $ from 'jquery'
type Props = {
  formData: Object,
  colCount: Number,
  children: any,
  items: Array,
  readOnly: Boolean,
  width: any
}
export default class Form extends Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.form)).dxForm({
      formData: this.props.formData ? this.props.formData : {},
      colCount: this.props.colCount,
      items: this.props.items,
      readOnly: this.props.readOnly,
      width: this.props.width
    })
  }
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.formData) {
      $(ReactDOM.findDOMNode(this.refs.form)).data('dxForm').updateData(nextProps.formData)
    }
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs.form)).remove()
  }

  props : Props;

  render() {
    return (
        <div id='form' ref='form'>
            {this.props.children ? this.props.children : undefined}
        </div>
    )
  }
}
