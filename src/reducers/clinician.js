import * as _ from 'lodash'


const initialState = {
  patientList: [],
  patientListFiltered: [],
  search: ''
}


function search(state,data){
  let patientList = state.patientList,
      patientListFiltered = []
  let keys = ['nhsNumber','gender','sex','vitalStatus','birthYear']
  let result = []
  if( data ){
      keys.forEach(key => {
        let tmp  =  patientList.filter(e =>{
          return e[key] && e[key].includes(data)
        })
        if( tmp.length > 0 ) {
          result = [...result,...tmp]
      }
    })
    patientListFiltered = _.uniqWith(result, _.isEqual)
    return Object.assign({},state,{patientListFiltered,search: data})
  }
  return Object.assign({},state,{search: data,patientListFiltered: patientList})
}


const clinician = (state = initialState, action = {}) => {
  switch( action.type ){
    case 'SET_PATIENTLIST':
      return Object.assign({},state,{patientList: action.data,patientListFiltered: action.data});
    case 'handleCliniSearch': 
      return search(state, action.data);
    default: return state;
  }
}

export default clinician;