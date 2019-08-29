import { Action, concatNumber, setLastOperation, backspace, clearAllOperation, calculate, concatComma, toggleNegative } from './state/actions'

interface Button {
  /** Text that will be shown to user. */
  value: string,
  /** Action to be dispatched in redux. */
  action?: Action,
  classname?: string,
  title?: string,
  /** Relative keyboard key. @see http://keycode.info/ */
  key?: string,
  tabindex?: number,
  [key: string]: any,
}

const buttonMap: Array<Button> = [
  { value: 'AC', action: clearAllOperation(), title: 'Clear all', tabindex: 2 },
  { value: '', disabled: true },
  { value: '&lt;', action: backspace(), key: 'Backspace', title: 'Delete last number', tabindex: 3 },
  { value: '&divide;', action: setLastOperation('÷'), key: '%', tabIndex: 16 },

  { value: '7', action: concatNumber(7), key: '7', tabindex: 11 },
  { value: '8', action: concatNumber(8), key: '8', tabindex: 12 },
  { value: '9', action: concatNumber(9), key: '9', tabindex: 13 },
  { value: '&times;', action: setLastOperation('×'), key: '*', tabIndex: 17 },

  { value: '4', action: concatNumber(4), key: '4', tabindex: 8 },
  { value: '5', action: concatNumber(5), key: '5', tabindex: 9 },
  { value: '6', action: concatNumber(6), key: '6', tabindex: 10 },
  { value: '-', action: setLastOperation('-'), key: '-', classname: 'subtract', tabIndex: 18 },

  { value: '1', action: concatNumber(1), key: '1', tabindex: 5 },
  { value: '2', action: concatNumber(2), key: '2', tabindex: 6 },
  { value: '3', action: concatNumber(3), key: '3', tabindex: 7 },
  { value: '+', action: setLastOperation('+'), key: '+', tabIndex: 19 },

  { value: '&plusmn;', action: toggleNegative(), tabIndex: 14, title: 'Toggles the highlighted number between positive and negative' },
  { value: '0', action: concatNumber(0), key: '0', tabindex: 4 },
  { value: '.', action: concatComma(), key: '.', tabIndex: 15 },
  { value: '=', action: calculate(), key: '=', classname: 'primary', tabIndex: 20 },
]

export default buttonMap
