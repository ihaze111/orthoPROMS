import * as _ from 'lodash'

const initialState = {
  compositions: [],
  compositionsFiltered: [],
  search: ''
}


function search(state,data){
  let compositions = state.compositions,
      compositionsFiltered = []
  let keys = ['nhs_number','composer_name','episode_identifier','aofas_comment']
  let result = []
  if( data ){
    keys.forEach(key => {
      let tmp = compositions.filter(e => e[key] && e[key].includes(data) )
      if( tmp.length > 0){
        result = [...result,...tmp]
      }
    })
    compositionsFiltered = _.uniqWith(result, _.isEqual)
    return Object.assign({},state,{compositionsFiltered,search: data})
  }
  return Object.assign({},state,{search: data,compositionsFiltered: compositions})
}




const app = (state = initialState, action = {}) => {
  switch( action.type ){
    case 'SET_COMPOSITIONS':
      return Object.assign({},state,{compositions: action.data,compositionsFiltered: action.data});
    case 'handleSearch': 
      return search(state, action.data);
    default: return state;
  }
}

export default app;