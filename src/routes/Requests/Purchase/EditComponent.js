import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import NewProducts from './Shared/NewProducts'
import PurchaseForm from './Shared/Form'
import ProductsGrid from '../../../components/Purchase/ProductsGrid'
import PurchaseSteps from '../../../components/Purchase/Steps'
import ActionsComponent from './Shared/ActionsComponent'
import PurchaseLayout from './Shared/Layout'
import Discuss from '../../../components/Discuss'
import { connect } from 'react-redux'
import { sendRequest } from '../../../modules/send'
import { fetchItem } from '../../../modules/item'
import { updateItem } from '../../../modules/update'

type Props = {
  sendRequest : Function,
  send : Object,
  updateItem: Function,
  fetchItem: Function,
  item: Object,
  router: Function,
  routeParams: Object
};

class EditComponent extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props : Props) {
    super(props)

    this.state = {
      draft: true,
      editable: '',
      item: {},
    }
    this.onSubmit = this.handleSubmit.bind(this)
  }

  state : {
    editable: any,
    errorName: '',
    item: {},
  };
 componentWillReceiveProps(nextProps : Object) {
    if (!_.isEmpty(nextProps.item)) {
      let newState = {
        item: nextProps.item
      }
      this.setState(newState)
    }
    if (!_.isEmpty(nextProps.access)) {
      this.setState({access: nextProps.access})
    }
  }
  componentDidMount() {
    this.props.fetchItem(this.props.routeParams.id)
  }

  props : Props;

  handleSubmit = (request) => {
    request['id'] = parseInt(this.props.routeParams.id, 0)
    this.props.updateItem('purchase', request)
  }
  
  render() {
    const readOnlyForm = false
        return (
        <PurchaseLayout>
            {!_.isEmpty(this.state.item) ? <div>
                <PurchaseSteps requestId={this.state.item.id} />
                <PurchaseForm data={this.state.item} readOnly={readOnlyForm} type='edit'
                  onSave={this.onSubmit}
                />
                <br/>
                <ProductsGrid issueId={this.props.routeParams.id} editing={true} />
                <br />
                <NewProducts issueId={this.props.routeParams.id} editing={true} />
                <br/>
                <ActionsComponent requestId={this.state.item.id} />
                <Discuss requestId={this.state.item.id} />
            </div> : undefined
        }
        </PurchaseLayout>
    )
  }
}

const mapActionCreators = {
  sendRequest,
  updateItem,
  fetchItem
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  send: state.send.data,
  item: state.request.data
})

export default connect(mapStateToProps, mapActionCreators)(EditComponent)
