import { type GestureResponderEvent, TouchableHighlight as RNTouchableHighlight, type TouchableHighlightProps } from 'react-native'

import { useVibration } from '../../useVibration'

export type { TouchableHighlightProps }

export const TouchableHighlight = ({ onPress, onLongPress, onPressIn, ...props }: TouchableHighlightProps) => {
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

  return <RNTouchableHighlight {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
