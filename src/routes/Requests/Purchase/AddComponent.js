import React, { Component } from 'react'
import PurchaseLayout from './Shared/Layout'
import PurchaseForm from './Shared/Form'
import { connect } from 'react-redux'
import { addItem } from '../../../modules/add'

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
      this.props.router.push(`/requests/purchase/edit/${nextProps.item.id}`)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    this.props.addItem('purchase', request)
  }
  render() {
    const data = {
      'company' : {
         'id': '69812854-f6d9-11df-91c0-002215596dc5'
      },
       'department': {
        'id': ''
      }
    }
    return (
        <PurchaseLayout>
            <PurchaseForm data={data} readOnly={false} type='new' onSave={this.onSubmit} />
        </PurchaseLayout>
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
