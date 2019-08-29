import { Action } from './actions'
import { dropRight, last, concat, includes, toString } from 'lodash'
import calc, { CalcChaining, operations, isNumeric } from '../core'

export interface State {
  /** Chain of calculations to be processed. */
  readonly chain: CalcChaining,
  /** Indicates whether the number in the "chain" array is the result of an operation termination caused by the "CALCULATE" action. */
  readonly isFinalResult: boolean,
}

const INITIAL_STATE: State = {
  chain: ['0'],
  isFinalResult: false
}

export default function reducer(state = INITIAL_STATE, { type, payload }: Action): State {
  switch (type) {
    case 'CONCAT_NUMBER': {
      const lastItem = last(state.chain)!
      return {
        ...state,
        chain: (state.isFinalResult === true || (state.chain.length === 1 && state.chain[0] === '0')
          // If the last number is the result of an operation, override it
          ? [payload!]
          : (isNumeric(lastItem)
            // If the last item is a number, CONCATENATE the new number to it
            ? concat(dropRight(state.chain), `${lastItem}${payload!}`)
            // If last item is an operation, add new number to end of array
            : concat(state.chain, payload!)
          )
        ),
        isFinalResult: false,
      };
    }

    case 'CONCAT_COMMA': {
      const lastItem = last(state.chain)!
      const lastItemIsADecimal = String(lastItem).includes('.')
      if (!isNumeric(lastItem) || lastItemIsADecimal) return state;
      return {
        ...state,
        // Add a comma to the end of the number if it is an integer
        chain: concat(dropRight(state.chain), `${lastItem}.`),
        isFinalResult: false,
      };
    }

    case 'SET_LAST_OPERATION': {
      const lastItemIsOperation = includes(operations, last(state.chain))
      return {
        ...state,
        chain: lastItemIsOperation
          // If the last item is an operation, replace it for the new operation in payload
          ? concat(dropRight(state.chain), payload!)
          // Otherwise, add the operation to the end of the array.
          : concat(state.chain, payload!),
        isFinalResult: false,
      };
    }

    case 'TOGGLE_NEGATIVE': {
      let lastItem = last(state.chain)!
      if (!isNumeric(lastItem)) return state;
      // Toggle last number between positive and negative
      const newLastItem = Number(lastItem) > 0 ? -Math.abs(<any>lastItem) : Math.abs(<any>lastItem)
      return {
        ...state,
        chain: concat(dropRight(state.chain), toString(newLastItem)),
        isFinalResult: false,
      };
    }

    case 'CALCULATE': {
      if (state.isFinalResult === true || state.chain.length < 3) return state;
      const result = toString( calc(state.chain) )
      return {
        ...state,
        chain: [result],
        isFinalResult: true,
      }
    };

    case 'BACKSPACE': {
      const lastItem = last(state.chain)!
      const newChain = isNumeric(lastItem) && lastItem.length >= 2
        // If last item is a number, remove last number from last item in array
        ? concat(dropRight(state.chain), lastItem.slice(0, lastItem.length-1) )
        // If the last item is an operation, remove it
        : dropRight(state.chain)
      return {
        ...state,
        chain: newChain.length === 0 ? ['0'] : newChain, // This logic is to prevent the array from getting zero items
        isFinalResult: false,
      };
    }

    case 'CLEAR_ALL_OPERATION': return {
      ...state,
      chain: ['0'],
      isFinalResult: false,
    };

    default: return state;
  }
}
