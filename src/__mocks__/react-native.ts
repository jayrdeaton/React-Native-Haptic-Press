import React from 'react'

const stub = ({ children }: { children?: React.ReactNode }) => children ?? null

const StyleSheet = {
  create: <T extends object>(styles: T): T => styles,
  flatten: (style: unknown) => style
}

const Vibration = {
  vibrate: jest.fn()
}

const Platform = {
  OS: 'ios' as 'ios' | 'android',
  select: (obj: Record<string, unknown>) => obj[Platform.OS] ?? obj.default
}

export { Platform, StyleSheet, Vibration }

export const View = stub
export const Text = stub
export const Pressable = stub
export const TouchableOpacity = stub
export const TouchableHighlight = stub
export const TouchableNativeFeedback = stub
export const TouchableWithoutFeedback = stub
