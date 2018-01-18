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
      this.props.router.push(`/requests/accesscontrol/wealth/view/${nextProps.item.id}`)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    this.props.addItem('accesscontrol', request, 'wealth')
  }
  render() {
    const data = {
      'company' : {
         'id': '',
         'title': ''
      },
      'department'      : '',
      'who'             : '',
      'to'              : '',
      'auto'            : '',
      'target'          : '',
      'date'            : ''
    }
    return (
        <Layout subcategory='wealth'>
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