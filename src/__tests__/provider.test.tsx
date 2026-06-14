import { act, renderHook } from '@testing-library/react'
import React from 'react'

import { HapticPressProvider } from '../HapticPressProvider'
import { useHapticSettings } from '../useHapticSettings'

describe('HapticPressProvider', () => {
  it('provides vibrate: true by default', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticPressProvider>{children}</HapticPressProvider>
    )
    const { result } = renderHook(() => useHapticSettings(), { wrapper })
    expect(result.current.settings.vibrate).toBe(true)
  })

  it('applies value prop as initial settings', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticPressProvider value={{ vibrate: false }}>{children}</HapticPressProvider>
    )
    const { result } = renderHook(() => useHapticSettings(), { wrapper })
    expect(result.current.settings.vibrate).toBe(false)
  })

  it('set updates settings in context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticPressProvider>{children}</HapticPressProvider>
    )
    const { result } = renderHook(() => useHapticSettings(), { wrapper })
    act(() => { result.current.set({ vibrate: false }) })
    expect(result.current.settings.vibrate).toBe(false)
  })

  it('calls onChange when settings are updated via set', () => {
    const onChange = jest.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticPressProvider onChange={onChange}>{children}</HapticPressProvider>
    )
    const { result } = renderHook(() => useHapticSettings(), { wrapper })
    act(() => { result.current.set({ vibrate: false }) })
    expect(onChange).toHaveBeenCalledWith({ vibrate: false })
  })

  it('does not call onChange on initial render', () => {
    const onChange = jest.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <HapticPressProvider onChange={onChange}>{children}</HapticPressProvider>
    )
    renderHook(() => useHapticSettings(), { wrapper })
    expect(onChange).not.toHaveBeenCalled()
  })
})
