import { type GestureResponderEvent, TouchableOpacity as RNTouchableOpacity, type TouchableOpacityProps } from 'react-native'

import { useVibration } from '../../useVibration'

export type { TouchableOpacityProps }

export const TouchableOpacity = ({ onPress, onLongPress, onPressIn, ...props }: TouchableOpacityProps) => {
  const { selection, notification } = useVibration()

  const isInteractive = !!(onPress || onLongPress)

  const handlePressIn: typeof onPressIn = isInteractive
    ? (e: GestureResponderEvent) => {
        selection()
        onPressIn?.(e)
      }
    : onPressIn

  const handleLongPress: typeof onLongPress = onLongPress
    ? (e: GestureResponderEvent) => {
        notification()
        onLongPress(e)
      }
    : undefined

  return <RNTouchableOpacity {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
