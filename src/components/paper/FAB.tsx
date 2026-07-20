import { type GestureResponderEvent } from 'react-native'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

// Local mirror of react-native-paper's FAB props, limited to what this wrapper touches
// plus a pass-through index signature — see src/paper.ts's PaperModuleShape for the same
// pattern. This intentionally avoids `import type { FABProps } from 'react-native-paper'`,
// which forces TypeScript to resolve the peer's real type declarations even for consumers
// who never installed the optional "react-native-paper" peer dep.
export type FABProps = {
  onPress?: (e: GestureResponderEvent) => void
  onLongPress?: (e: GestureResponderEvent) => void
  [prop: string]: unknown
}

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
