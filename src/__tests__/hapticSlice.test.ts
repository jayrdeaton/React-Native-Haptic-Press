import { defaultHapticSettings } from '../HapticSettingsContext'
import { hapticActions, hapticReducer } from '../redux/hapticSlice'

describe('hapticReducer', () => {
  it('returns default state when called with undefined', () => {
    const state = hapticReducer(undefined, { type: '@@init' })
    expect(state).toEqual(defaultHapticSettings)
  })

  it('initialize replaces state entirely', () => {
    const state = hapticReducer(undefined, hapticActions.initialize({ vibrate: false }))
    expect(state).toEqual({ vibrate: false })
  })

  it('setVibrate sets vibrate to false', () => {
    const state = hapticReducer(undefined, hapticActions.setVibrate(false))
    expect(state.vibrate).toBe(false)
  })

  it('setVibrate sets vibrate back to true', () => {
    const initial = hapticReducer(undefined, hapticActions.setVibrate(false))
    const state = hapticReducer(initial, hapticActions.setVibrate(true))
    expect(state.vibrate).toBe(true)
  })

  it('setVibrate does not mutate other fields', () => {
    const state = hapticReducer(undefined, hapticActions.setVibrate(false))
    expect(Object.keys(state)).toEqual(Object.keys(defaultHapticSettings))
  })
})
