import { Operations, CalcChaining } from '../core'

enum ActionTypes {
  CONCAT_NUMBER,
  SET_LAST_OPERATION,
  CONCAT_COMMA,
  TOGGLE_NEGATIVE,
  CALCULATE,
  BACKSPACE,
  CLEAR_ALL_OPERATION,
}

export interface Action {
  type: keyof typeof ActionTypes,
  payload?: CalcChaining[0],
}

// #region Action Creators
export const concatNumber = (payload: number): Action => ({
  type: 'CONCAT_NUMBER',
  payload: String(payload),
})
export const setLastOperation = (payload: Operations): Action => ({
  type: 'SET_LAST_OPERATION',
  payload,
})
export const toggleNegative = (): Action => ({ type: 'TOGGLE_NEGATIVE', })
export const concatComma = (): Action => ({ type: 'CONCAT_COMMA', })
export const calculate = (): Action => ({ type: 'CALCULATE', })
export const backspace = (): Action => ({ type: 'BACKSPACE', })
export const clearAllOperation = (): Action => ({ type: 'CLEAR_ALL_OPERATION', })
// #endregion
