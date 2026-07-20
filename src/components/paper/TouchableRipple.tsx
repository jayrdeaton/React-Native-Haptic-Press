import { type GestureResponderEvent } from 'react-native'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

// Local mirror of react-native-paper's TouchableRipple props, limited to what this
// wrapper touches plus a pass-through index signature — see src/paper.ts's
// PaperModuleShape for the same pattern. This intentionally avoids `import type {
// TouchableRippleProps } from 'react-native-paper'`, which forces TypeScript to resolve
// the peer's real type declarations even for consumers who never installed the optional
// "react-native-paper" peer dep.
export type TouchableRippleProps = {
  onPress?: (e: GestureResponderEvent) => void
  onPressIn?: (e: GestureResponderEvent) => void
  onLongPress?: (e: GestureResponderEvent) => void
  [prop: string]: unknown
}

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
