import store from './state'
import buttonMap from './buttonMap'
import calc, { isNumeric } from './core'
import { last } from 'lodash'

const keyMap = new Map<string, Function>()
const keypad = document.querySelector<HTMLElement>('.keypad')!
const operationChain = document.querySelector<HTMLElement>('.operation-chain')!
const result = document.querySelector<HTMLElement>('.result')!

function changeDisplayNumber() {
  const { chain, isFinalResult } = store.getState()

  operationChain.value = chain.join(' ')
  if (isFinalResult) operationChain.focus()
  operationChain.classList.toggle('isFinalResult', isFinalResult)

  result.innerText = chain.length >= 3 && isNumeric(last(chain)!)
    ? `= ${calc(chain)}`
    : ''
}

changeDisplayNumber()
store.subscribe(changeDisplayNumber)


// Add buttons to interface
buttonMap.forEach(({ value, action, key, ...otherProps }) => {
  const button = document.createElement('button')
  button.innerHTML = value
  if (typeof action !== 'undefined') {
    button.addEventListener('click', () => {
      store.dispatch(action)
    })
  }

  for (const prop in otherProps) {
    const value = otherProps[prop]
    if (prop === 'classname') button.className = value;
    else if (prop === 'title') {
      button.setAttribute('title', value);
      button.setAttribute('aria-label', value);
    }
    else button.setAttribute(prop, value);
  }
  
  if (key) {
    const callback = () => button.click()
    keyMap.set(key, callback)
  }

  keypad.append(button)
})


// Listen for keyboard keys
window.addEventListener('keydown', (event) => {
  const keyCode = event.key
  if (keyMap.has(keyCode)) {
    keyMap.get(keyCode)()
  }
})

