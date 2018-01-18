import { connect } from 'react-redux'
import PurchaseSteps from './components/PurchaseSteps'
import { fetchChangeApprover } from './modules/ChangeApprover'
import { fetchApprovers } from '../../../modules/approvers'
import { fetchDocs } from '../../../modules/docs'
import { fetchSteps } from './modules/steps'
import { submitAction } from '../../../modules/action'
import { showAlert } from '../../../store/alert'
const mapActionCreators = {
  fetchApprovers,
  fetchChangeApprover,
  fetchDocs,
  fetchSteps,
  showAlert,
  submitAction
}

const mapStateToProps = (state) => ({
  access: state.access.data,
  approvers: state.approvers.data,
  changeApprover: state.changeApprover.data,
  docs: state.docs.data,
  steps: state.steps.data
})

export default connect(mapStateToProps, mapActionCreators)(PurchaseSteps)
