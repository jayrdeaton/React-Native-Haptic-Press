import { type ReactNode, useCallback, useContext, useState } from 'react'

import { defaultHapticSettings, type HapticSettings, HapticSettingsContext } from './HapticSettingsContext'

export type HapticPressProviderProps = {
  value?: Partial<HapticSettings>
  onChange?: (settings: HapticSettings) => void
  children: ReactNode
}

export function HapticPressProvider({ value, onChange, children }: HapticPressProviderProps) {
  const [settings, setSettings] = useState<HapticSettings>(() => ({ ...defaultHapticSettings, ...value }))
  const set = useCallback(
    (patch: Partial<HapticSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch }
        onChange?.(next)
        return next
      })
    },
    [onChange]
  )
  return <HapticSettingsContext.Provider value={{ settings, set }}>{children}</HapticSettingsContext.Provider>
}

export const useHapticPressContext = () => {
  const { settings } = useContext(HapticSettingsContext)
  return { enabled: settings.vibrate }
}
