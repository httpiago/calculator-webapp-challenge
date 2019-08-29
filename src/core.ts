import { includes, toNumber } from 'lodash'

export const operations: Array<Operations> = ['+', '-', '×', '÷']
export type Operations = '+' | '-' | '×' | '÷'
export type CalcChaining<N = NumericString> = Array<N | Operations>
export type NumericString = string

/**
 * Yes, I know all this logic could be avoided just by using the eval() function,
 * but I wanted to do it the hard way.
 *
 * @param chain An array with numbers and operations to process.
 * @returns The result.
 *
 * @example
 * calc([1, '+', 5]) // 6
 * calc([1, '+', 5, '×', 2]) // 11
 * calc([12, '-', 2]) // 10
 * calc([10, '-', 20]) // -10
 * calc([-30, '+', 100]) // 90
 * calc([40, '÷', 2]) // 20
 */
export default function calc(chain: CalcChaining): number {
  let finalResult = convertAllNumbersInArray(chain)
  let lastOperation: any = ''

  // Solve the multiplications and divisions first
  return resolveMathPriorityCalcs(finalResult)
    .reduce((lastResult: number, currentItem) => {
      if (includes(operations, currentItem)) {
        // If the item is an operation, save for the next item knows what to do.
        lastOperation = currentItem
        return lastResult
      }
      else {
        // Mutate the number based on the last saved operation
        return doMathOperation(lastResult, lastOperation, toNumber(currentItem))
      }
    }, 0);
}

/**
 * Do a math operation with the number1 and number2.
 */
function doMathOperation(number1: number, operation: Operations, number2: number): number {
  if (operation === '+') return number1 + number2;
  else if (operation === '-') return number1 - number2;
  else if (operation === '×') return number1 * number2;
  else if (operation === '÷') return number1 / number2;
  else return number2;
}

/**
 * Solve all operations that have priority in math, such as × and ÷.
 */
function resolveMathPriorityCalcs(chain: CalcChaining<number>): CalcChaining<number> {
  let newResultChain = [...chain]
  const index = chain.findIndex(item => item === '×' || item === '÷')

  if (index >= 0) {
    const operator = chain[index] as Operations
    const numberOnLeftSideOfCurrent = chain[index - 1] as number
    const numberOnRightSideOfCurrent = chain[index + 1] as number
    const result = doMathOperation(numberOnLeftSideOfCurrent, operator, numberOnRightSideOfCurrent)

    newResultChain = chain.slice(0, index-1).concat(result, chain.slice(index + 2))
    newResultChain = resolveMathPriorityCalcs(newResultChain)
  }

  return newResultChain
}

/**
 * Convert all string numbers in real numbers.
 */
function convertAllNumbersInArray(chain: CalcChaining): CalcChaining<number> {
  return chain.map(item => {
    if (isNumeric(item)) return toNumber(item);
    return item;
  }) as any
}

/**
 * Check if the string has numeric value.
 */
export function isNumeric(str: string): boolean {
  return /^(\-)?[\.0-9]+$/gi.test(str);
}
