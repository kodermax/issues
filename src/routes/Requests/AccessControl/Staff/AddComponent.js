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
      this.props.router.push(`/requests/accesscontrol/staff/view/${nextProps.item.id}`)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    this.props.addItem('accesscontrol', request, 'staff')
  }
  render() {
    const data = {
      'company' : {
         'id': '69812854-f6d9-11df-91c0-002215596dc5',
         'title': 'АО "Компания 1"'
      },
      'department': '',
      'car'             : '',
      'driver'          : '',
      'target'          : '',
      'date'            : ''
    }
    return (
        <Layout subcategory="staff">
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