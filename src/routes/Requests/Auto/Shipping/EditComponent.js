import React, { Component } from 'react'
import Layout from '../Common/Components/LayoutComponent'
import Form from './FormComponent'
import { connect } from 'react-redux'
import { fetchItem } from '../../../../modules/item'
import { updateItem } from '../../../../modules/update'
import _ from 'lodash'

type Props = {
  fetchItem: Function,
  item: Object,
  router: Function,
  updateItem: Function,
}

class EditComponent extends Component {
  static contextTypes = {
  }
  constructor(props : Props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  state : {
  };
  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }
  componentWillReceiveProps(nextProps : Object) {
    if (!_.isEmpty(nextProps.item)) {
      let newState = {
        item: nextProps.item
      }
      this.setState(newState)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    request['id'] = parseInt(this.props.routeParams.id, 0)
    this.props.updateItem('auto', request, 'shipping', () => {
      this.context.router.push(`/requests/auto/shipping/view/${this.props.routeParams.id}`)
    })
  }
  render() {
    return (
      <Layout subcategory='shipping'>
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