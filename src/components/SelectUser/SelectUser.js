// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CustomStore from 'devextreme/data/custom_store'
import 'devextreme/ui/autocomplete'
import $ from 'jquery'
type Props = {
    children: Object,
    currentUser: String,
    onSelect: Function
};
export default class SelectUser extends Component {
  componentDidMount() {
    const dataSource = new CustomStore({
      load: function(loadOptions) {
        let  deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_USERS}/users?query=${loadOptions.searchValue}`,
          success: function(result) {
            deferred.resolve(result)
          },
          error: function() {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      },
      byKey: function(key, extra) {
        let deferred = $.Deferred()
        $.ajax({
          url: `${process.env.REACT_APP_API_USERS}/users/${key}`,
          success: function(result) {
            deferred.resolve(result)
          },
          error: function() {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })
        return deferred.promise()
      }
    })
    const onSelectionChanged = (e) => {
      if (typeof e.selectedItem === 'object') {
        this.props.onSelect(this.props.currentUser, e.selectedItem.id)
      }
    }
    $(ReactDOM.findDOMNode(this.refs.selectUser)).dxAutocomplete({
      dataSource: dataSource,
      searchExpr: 'title',
      searchMode: 'contains',
      valueExpr: 'fullName',
      itemTemplate: function(data) {
        return $('<div>' + data.fullName +
        ' (' + data.position + ')</div>')
      },
      onSelectionChanged: onSelectionChanged
    })
  }
  componentWillUnmount() {
    // $(ReactDOM.findDOMNode(this.refs.selectUser)).remove();
  }
  props : Props;

  render() {
    return (
        <div id='selectUser' ref='selectUser'>
            {this.props.children ? this.props.children : undefined}
        </div>
    )
  }
}
