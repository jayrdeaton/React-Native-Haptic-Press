import { type GestureResponderEvent } from 'react-native'
import type { FABProps } from 'react-native-paper'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type { FABProps }

// FAB does not expose onPressIn — haptic fires on onPress instead
export const FAB = ({ onPress, onLongPress, ...props }: FABProps) => {
  const { FAB: PaperFAB } = requirePaper('FAB')
  const { selection, notification } = useVibration()

  const handlePress: typeof onPress = onPress
    ? (e: GestureResponderEvent) => {
        selection()
        onPress(e)
      }
    : undefined

  const handleLongPress: typeof onLongPress = onLongPress
    ? (e: GestureResponderEvent) => {
        notification()
        onLongPress(e)
      }
    : undefined

  return <PaperFAB {...props} onPress={handlePress} onLongPress={handleLongPress} />
}
