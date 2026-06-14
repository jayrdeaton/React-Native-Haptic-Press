export { HapticPressProvider } from './HapticPressProvider'
export type { HapticSettings } from './HapticSettingsContext'
export { defaultHapticSettings, HapticSettingsContext } from './HapticSettingsContext'
export { useHapticSettings } from './useHapticSettings'
export { useVibration } from './useVibration'
export { hapticActions, hapticReducer } from './redux/hapticSlice'

// Native wrappers
export { Pressable, type PressableProps } from './components/native/Pressable'
export { TouchableHighlight, type TouchableHighlightProps } from './components/native/TouchableHighlight'
export { TouchableOpacity, type TouchableOpacityProps } from './components/native/TouchableOpacity'

// Paper wrappers (requires react-native-paper peer dep)
export { AppbarBackAction, type AppbarBackActionProps } from './components/paper/AppbarBackAction'
export { Button, type ButtonProps } from './components/paper/Button'
export { Card, type CardProps } from './components/paper/Card'
export { Chip, type ChipProps } from './components/paper/Chip'
export { FAB, type FABProps } from './components/paper/FAB'
export { IconButton, type IconButtonProps } from './components/paper/IconButton'
export { TouchableRipple, type TouchableRippleProps } from './components/paper/TouchableRipple'
