import axios from 'axios'

export const POST_USER = 'POST_USER'
export const GET_USER = 'GET_USER'
export const GET_OPERATIONS = "GET_OPERATIONS"
export const GET_OPERATION = "GET_OPERATION"
export const GET_FILTERED_TYPE = 'GET_FILTERED_TYPE'
export const RESTART_FILTER = "RESTART_FILTER"
export const RESTART_USER = "RESTART_USER"
export const GET_FILTERED_CATEGORY = "GET_FILTERED_CATEGORY"
export const SUM_TOTAL = "SUM_TOTAL"

export function postUser(value) {
  return async function (dispatch) {
      const createUser = await axios.post(
          'http://localhost:3001/user',
          value
      );
      return dispatch({
      type: "POST_USER",
      payload: createUser
      });
  };
}
                          //{name, income, userId}
export function postOperation(value){
  return async function(dispatch){
    const createOperation = await axios.post(
      'http://localhost:3001/operation',
      value
    )
    return dispatch({
      type: "POST_OPERATION"
    })
  }
}

export function getUser(userId){
  return async function (dispatch){
    const user = await axios.get(
      `http://localhost:3001/${userId}`
    )
    return dispatch({
      type: "GET_USER",
      payload: user
    })
  }
}

export function getOperations(idUser){
  return async function (dispatch){
    const operations = await axios.get(
      `http://localhost:3001/operation/${idUser}`
    )
    return dispatch({
      type: "GET_OPERATIONS",
      payload: operations.data
    })
  }
}

export function getOperation(operationId){
  return async function (dispatch){
    const operations = await axios.get(
      `http://localhost:3001/operation/specific/${operationId}`
    )
    return dispatch({
      type: "GET_OPERATION",
      payload: operations.data[0]
    })
  }
}

//TOMAR LAS OPERACIONES FILTRADAS
export function getFilteredType(type){
  return  function (dispatch){
    return dispatch({
      type:"GET_FILTERED_TYPE",
      payload: type
    })
  }
}

export function getFilteredCategory(category){
  return  function (dispatch){
    return dispatch({
      type:"GET_FILTERED_CATEGORY",
      payload: category
    })
  }
}

//VOLVER A MOSTRAR TODAS LAS OPERACIONES
export function restartFilter(){
  return  function(dispatch){
    return dispatch({
      type:"RESTART_FILTER"
    })
  }
}

export function restartUser(){
  return async function(dispatch){
    return dispatch({
      type:"RESTART_USER"
    })
  }
}

export function editOperation(id, operation){
  return async function(dispatch){
    await axios.put(`http://localhost:3001/operation/specific/${id}`, operation)
    return dispatch({
      type:"EDIT_OPERATION"
    })
  }
}

export function deleteOperation(id){
  return async function(dispatch){
    await axios.delete(`http://localhost:3001/operation/specific/${id}`)
    return dispatch({
      type:"DELETE_OPERATION"
    })
  }
}

export function sumTotal(){
  return function(dispatch){
    return dispatch({
      type: "SUM_TOTAL"
    })
  }
}