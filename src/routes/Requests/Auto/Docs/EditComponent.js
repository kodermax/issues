import React, { Component } from 'react'
import Layout from '../Common/Components/LayoutComponent'
import Form from './FormComponent'
import { connect } from 'react-redux'
import { fetchItem } from '../../../../modules/item'
import { updateItem } from '../../../../modules/update'
import _ from 'lodash'

class EditComponent extends Component {
  static contextTypes = {
  }
  constructor(props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.item)) {
      let newState = {
        item: nextProps.item
      }
      this.setState(newState)
    }
  }
  handleSubmit = (request) => {
    request['id'] = parseInt(this.props.routeParams.id, 0)
    this.props.updateItem('auto', request, 'docs', () => {
      this.props.router.push(`/requests/auto/docs/view/${this.props.routeParams.id}`)
    })
  }
  render() {
    return (
      <Layout subcategory='docs'>
         {!_.isEmpty(this.state.item) ?
          <Form data={this.state.item} readOnly={false} type='new' onSave={this.onSubmit} /> : undefined }
      </Layout>
    )
  }
}

const mapActionCreators = {
  fetchItem,
  updateItem
}

const mapStateToProps = (state) => ({
  item: state.request.data
})

export default connect(mapStateToProps, mapActionCreators)(EditComponent)