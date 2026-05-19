import { type GestureResponderEvent } from 'react-native'
import { Chip as PaperChip, type ChipProps } from 'react-native-paper'

import { useVibration } from '../../useVibration'

export type { ChipProps }

export const Chip = ({ onPress, onLongPress, onPressIn, ...props }: ChipProps) => {
  const { selection, notification } = useVibration()

  const isInteractive = !!(onPress || onLongPress)

  const handlePressIn: typeof onPressIn = isInteractive
    ? (e: GestureResponderEvent) => {
        selection()
        onPressIn?.(e)
      }
    : onPressIn

  // Paper Chip.onLongPress is () => void (no event arg)
  const handleLongPress: typeof onLongPress = onLongPress
    ? () => {
        notification()
        onLongPress()
      }
    : undefined

  return <PaperChip {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
