import { type GestureResponderEvent } from 'react-native'
import { FAB as PaperFAB, type FABProps } from 'react-native-paper'

import { useVibration } from '../../useVibration'

export type { FABProps }

// FAB does not expose onPressIn — haptic fires on onPress instead
export const FAB = ({ onPress, onLongPress, ...props }: FABProps) => {
  const { selection, notification } = useVibration()

  const handlePress: typeof onPress = onPress
    ? (e: GestureResponderEvent) => { selection(); onPress(e) }
    : undefined

  const handleLongPress: typeof onLongPress = onLongPress
    ? (e: GestureResponderEvent) => { notification(); onLongPress(e) }
    : undefined

  return <PaperFAB {...props} onPress={handlePress} onLongPress={handleLongPress} />
}
