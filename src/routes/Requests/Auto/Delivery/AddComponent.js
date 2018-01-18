import React, { Component } from 'react'
import Layout from '../Common/Components/LayoutComponent'
import Form from './FormComponent'
import { connect } from 'react-redux'
import { addItem } from '../../../../modules/add'

type Props = {
  addItem: Function,
  item: Object,
  router: Function
};

class AddComponent extends Component {
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

  componentWillReceiveProps(nextProps : Object) {
    if (nextProps.item && nextProps.item.id > 0) {
      this.props.router.push(`/requests/auto/delivery/view/${nextProps.item.id}`)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    this.props.addItem('auto', request, 'delivery')
  }
  render() {
    const data = {
      'company' : {
         'id': '',
         'title': ''
      },
    }
    return (
        <Layout subcategory='delivery'>
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