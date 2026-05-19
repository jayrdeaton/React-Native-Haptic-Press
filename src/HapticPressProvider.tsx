import { createContext, type ReactNode, useContext } from 'react'

type HapticPressContextValue = {
  enabled: boolean
}

const HapticPressContext = createContext<HapticPressContextValue>({ enabled: true })

export const useHapticPressContext = () => useContext(HapticPressContext)

type HapticPressProviderProps = {
  enabled: boolean
  children: ReactNode
}

export function HapticPressProvider({ enabled, children }: HapticPressProviderProps) {
  return <HapticPressContext.Provider value={{ enabled }}>{children}</HapticPressContext.Provider>
}
