import { type GestureResponderEvent } from 'react-native'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

// Local mirror of react-native-paper's Chip props, limited to what this wrapper touches
// plus a pass-through index signature — see src/paper.ts's PaperModuleShape for the same
// pattern. This intentionally avoids `import type { ChipProps } from 'react-native-paper'`,
// which forces TypeScript to resolve the peer's real type declarations even for consumers
// who never installed the optional "react-native-paper" peer dep.
export type ChipProps = {
  mode?: 'flat' | 'outlined'
  onPress?: (e: GestureResponderEvent) => void
  onPressIn?: (e: GestureResponderEvent) => void
  // Paper's Chip.onLongPress is () => void (no event arg)
  onLongPress?: () => void
  [prop: string]: unknown
}

export const Chip = ({ onPress, onLongPress, onPressIn, ...props }: ChipProps) => {
  const { Chip: PaperChip } = requirePaper('Chip')
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
