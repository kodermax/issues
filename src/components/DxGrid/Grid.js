// @flow

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'devextreme/ui/data_grid'
import $ from 'jquery'

type Props = {
  gridId: String,
  allowColumnResizing: Boolean,
  allowColumnReordering: Boolean,
  children: Object,
  columnChooser: Object,
  dataSource: Object,
  filterRow: Object,
  editing: Object,
  export: Object,
  onRowInserting: Function,
  onToolbarPreparing: Function,
  paging: Object,
  pager: Object,
  remoteOperations: any,
  rowAlternationEnabled: Boolean,
  onCellPrepared: Function,
  onEditorPrepared: Function,
  onRowPrepared: Function,
  showBorders: Boolean,
  showRowLines: Boolean,
  summary: Object,
  stateStoring: Object,
  wordWrapEnabled: Boolean,
  columns: Object,
  loadUrl: String,
  width: any,
  twoWayBindingEnabled: Boolean
};
export default class Grid extends Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs[this.props.gridId])).dxDataGrid({
      allowColumnResizing: this.props.allowColumnResizing,
      allowColumnReordering: this.props.allowColumnReordering,
      // columnChooser: this.props.columnChooser,
      dataSource: this.props.dataSource,
      filterRow: this.props.filterRow,
      editing: this.props.editing,
      // export: this.props.export,
      onToolbarPreparing: this.props.onToolbarPreparing,
      onRowInserting: this.props.onRowInserting,
      paging: this.props.paging,
      pager: this.props.pager,
      rowAlternationEnabled: this.props.rowAlternationEnabled,
      onCellPrepared: this.props.onCellPrepared,
      onEditorPrepared: this.props.onEditorPrepared,
      onRowPrepared: this.props.onRowPrepared,
      // showBorders: this.props.showBorders,
      // showRowLines: this.props.showRowLines,
      stateStoring: this.props.stateStoring,
      summary: this.props.summary,
      // wordWrapEnabled: this.props.wordWrapEnabled,
      remoteOperations: this.props.remoteOperations,
      columns: this.props.columns,
      twoWayBindingEnabled: this.props.twoWayBindingEnabled,
      width: this.props.width
    })
  }
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.loadUrl !== this.props.loadUrl) {
      this.updateDateSource(nextProps.dataSource)
    }
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs[this.props.gridId])).remove()
  }
  updateDateSource(dataSource) {
    $(ReactDOM.findDOMNode(this.refs[this.props.gridId])).data('dxDataGrid').option('dataSource', dataSource)
    $(ReactDOM.findDOMNode(this.refs[this.props.gridId])).data('dxDataGrid').refresh()
  }
  props : Props;

  render() {
    return (
        <div id={this.props.gridId} ref={this.props.gridId}>
            {this.props.children ? this.props.children : undefined}
        </div>
    )
  }
}
