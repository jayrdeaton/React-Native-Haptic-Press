import { type GestureResponderEvent } from 'react-native'
import type { ButtonProps } from 'react-native-paper'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type { ButtonProps }

export const Button = ({ onPress, onLongPress, onPressIn, ...props }: ButtonProps) => {
  const { Button: PaperButton } = requirePaper('Button')
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

  return <PaperButton {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
