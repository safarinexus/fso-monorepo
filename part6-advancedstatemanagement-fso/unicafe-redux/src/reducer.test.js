import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good is incremented twice', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const oldstate = counterReducer(state, action)
    const newState = counterReducer(oldstate, action)
    expect(newState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('ok is incremented twice', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const oldstate = counterReducer(state, action)
    const newState = counterReducer(oldstate, action)
    expect(newState).toEqual({
      good: 0,
      ok: 2,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('bad is incremented twice', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const oldstate = counterReducer(state, action)
    const newState = counterReducer(oldstate, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 2
    })
  })

  test('zero is used', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 234,
      ok: 29, 
      bad: 13, 
    } 

    deepFreeze(state);
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ok: 0,
      good: 0,
      bad: 0
    })
  })
})