import React, { Component } from 'react'
import RecruitmentLayout from '../Components/Layout'
import RequirementForm from '../Components/Form'
import { connect } from 'react-redux'
import { addItem } from '../../../../modules/add'


type Props = {
  addItem: Function,
  item: Object,
  router: Function
};

class AddView extends Component {
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
      this.props.router.push(`/requests/recruitment/view/${nextProps.item.id}`)
    }
  }
  props : Props;
  handleSubmit = (request) => {
    this.props.addItem('recruitment', request)
  }
  render() {
    const data = {
      'contractType'    : '',
      'jobTitle'        : '',
      'department'      : '',
      'departmentId'    : '',
      'salary'          : '',
      'firstDay'        : '',
      'workplace'       : '',
      'jobInStaffing'   : '',
      'jobInBudget'     : '',
      'dismiss'         : '',
      'lastDay'         : '',
      'schedule'        : '',
      'requirements': {
        'education'     : '',
        'experience'    : '',
        'skills'        : '',
        'computerSkills': '',
        'languages'     : '',
        'comments'      : ''
      },
      'duties'          : ''
    }
    return (
        <RecruitmentLayout>
            <RequirementForm data={data} readOnly={false} type='new' onSave={this.onSubmit} />
        </RecruitmentLayout>
    )
  }
}
const mapActionCreators = {
  addItem
}

const mapStateToProps = (state) => ({
  item : state.addItem
})

export default connect(mapStateToProps, mapActionCreators)(AddView)