/**
 * Tests to ensure that the calculator core has the expected behavior.
 */
import calc from '../src/core'

describe('"Calc" function', () => {
  test('Should return a number', () => {
    const result = calc(['1', '+', '1'])
    expect(typeof result).toBe('number')
    expect(result).toBe(2)
  })

  test('Should return first number in array if no operation found', () => {
    expect(calc(['1'])).toBe(1)
  })

  test('Should be able to do basic operations', () => {
    expect(calc(['2', '+', '10'])).toBe(12)
    expect(calc(['100', '-', '40'])).toBe(60)
    expect(calc(['5', '×', '5'])).toBe(25)
    expect(calc(['1000', '÷', '10'])).toBe(100)
  })

  test('Should be able to do multiple operations', () => {
    expect(calc(['5', '+', '5', '+', '5'])).toBe(15)
    expect(calc(['10', '+', '20', '-', '6'])).toBe(24)
    expect(calc(['100', '+', '33', '×', '8', '+', '79', '+', '64', '-', '87'])).toBe(420)
    expect(calc(['5', '×', '5', '×', '8'])).toBe(200)
    expect(calc(['60', '÷', '3', '×', '8'])).toBe(160)
  })

  test('Should prioritize multiplication and division', () => {
    expect(calc(['10', '+', '5', '×', '2'])).not.toBe(30)
    expect(calc(['10', '+', '5', '×', '2'])).toBe(20)
    expect(calc(['4', '-', '2', '×', '3'])).toBe(-2)
    expect(calc(['25', '+', '50', '÷', '2'])).not.toBeCloseTo(37.5)
    expect(calc(['25', '+', '50', '÷', '2'])).toBe(50)
    expect(calc(['100', '-', '50', '÷', '2', '×', '3'])).toBe(25)
    expect(calc(['10', '×', '6', '÷', '3', '+', '20', '×', '4'])).toBe(100)
    expect(calc(['2', '×', '2', '×', '4', '×', '2', '×', '2'])).toBe(64)
    expect(calc(['1000000', '÷', '100', '÷', '10', '÷', '10', '÷', '100'])).toBe(1)
  })

  test('Should be able to calc negative numbers', () => {
    expect(calc(['50', '-', '75', '+', '22'])).toBe(-3)
    expect(calc(['-80', '-', '40', '+', '27'])).toBe(-93)
    expect(calc(['-20', '+', '-30'])).toBe(-50)
    expect(calc(['-20', '+', '-30', '-', '-4'])).toBe(-46)
    expect(calc(['-150', '+', '300'])).toBe(150)
    expect(calc(['-50', '×', '2'])).toBe(-100)
    expect(calc(['-6', '×', '-6'])).toBe(36)
    expect(calc(['-7', '-', '-6', '×', '-3'])).toBe(-25)
    expect(calc(['-1000', '÷', '100'])).toBe(-10)
  })

  test('Should be able to do decimal number calculations', () => {
    expect(calc(['1.5', '+', '5'])).toBeCloseTo(6.5)
    expect(calc(['1.4', '+', '2.7', '-', '0.3'])).toBeCloseTo(3.8)
    expect(calc(['-7.9', '-', '2.3'])).toBeCloseTo(-10.2)
    expect(calc(['-7.9', '-', '-2.2'])).toBeCloseTo(-5.7)
    expect(calc(['16.742', '+', '29.123'])).toBeCloseTo(45.865, 3)
    expect(calc(['54.3', '×', '82.8'])).toBeCloseTo(4496.04)
    expect(calc(['101.49', '÷', '20.3'])).toBeCloseTo(4.999507389162561, 15)
    expect(calc(['34.9537824', '+', '95.13256389', '÷', '2.5', '-', '5.92678', '×', '3.8268'])).toBeCloseTo(50.326206252, 9)
  })
})