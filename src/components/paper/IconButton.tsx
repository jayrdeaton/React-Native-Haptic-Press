import { type GestureResponderEvent } from 'react-native'
import type { IconButtonProps } from 'react-native-paper'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type { IconButtonProps }

export const IconButton = ({ onPress, onLongPress, onPressIn, ...props }: IconButtonProps) => {
  const { IconButton: PaperIconButton } = requirePaper('IconButton')
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

  return <PaperIconButton {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
