//@flow
import React, { Component } from 'react'
import Layout from '../Common/Components/LayoutComponent'
import Form from './FormComponent'
import { connect } from 'react-redux'
import { addItem } from '../../../../modules/add'

class AddComponent extends Component {
  static contextTypes = {
  }
  constructor(props) {
    super(props)
    this.state = {

    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item && nextProps.item.id > 0) {
      this.props.router.push(`/requests/auto/docs/view/${nextProps.item.id}`)
    }
  }
  handleSubmit = (request) => {
    this.props.addItem('auto', request, 'docs')
  }
  render() {
    const data = {}
    return (
        <Layout subcategory='docs'>
            <Form data={data} readOnly={false} type='new' onSave={this.onSubmit} />
        </Layout>
    )
  }
}

const mapActionCreators = {
  addItem
}

const mapStateToProps = (state) => ({
  item : state.addItem
})

export default connect(mapStateToProps, mapActionCreators)(AddComponent)