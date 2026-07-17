import { type GestureResponderEvent } from 'react-native'
import type { TouchableRippleProps } from 'react-native-paper'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type { TouchableRippleProps }

export const TouchableRipple = ({ onPress, onLongPress, onPressIn, ...props }: TouchableRippleProps) => {
  const { TouchableRipple: PaperTouchableRipple } = requirePaper('TouchableRipple')
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

  return <PaperTouchableRipple {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
