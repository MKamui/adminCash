import { GET_USER, GET_OPERATIONS, GET_OPERATION, POST_USER, GET_FILTERED_TYPE, RESTART_FILTER, RESTART_USER, GET_FILTERED_CATEGORY, SUM_TOTAL } from '../actions/actions'

const initialState = {
 user: {},
 allOperations: [],
 operations: [],
 operation: {},
 operationsTotal: 0
}

export function reducerApp(state = initialState, action){
 switch (action.type) {

  case POST_USER:
   return{
    ...state
   }

  case GET_USER:
   return {
    ...state,
    user: action.payload
   }

   case GET_OPERATIONS:
   return {
    ...state,
    allOperations: action.payload,
    operations: action.payload
   }

   case GET_FILTERED_TYPE:
    // action.payload = 'Income'
    let filteredType = state.allOperations.filter(operation => operation.type === action.payload)
    return{
     ...state,
     operations: filteredType
   }

   case GET_FILTERED_CATEGORY:
    // action.payload = 'Job'
    let filteredCategory = []
    if(action.payload === '')  filteredCategory = state.allOperations
    else{
     filteredCategory = state.allOperations.filter(operation => operation.category === action.payload)
    }
    return{
     ...state,
     operations: filteredCategory
   }

    case RESTART_FILTER:
     return{
      ...state,
      operations: state.allOperations
    }

    case GET_OPERATION:
     return{
      ...state,
      operation: action.payload
    }

    case RESTART_USER:{
      return{
        user: {},
        allOperations: [],
        operations: [],
        operation: {}
      }
    }

    case SUM_TOTAL:{
      let total = 0
      if(state.operations === []){
        total = 0
      } else {
      state.operations.map(op => {
        if(op.type === 'Income'){
          total += op.amount
        } else {
          total -= op.amount
        }
      })
      }
      return{
        ...state, 
        operationsTotal: total
      }
    }

   default:
    return state;
  }
 }