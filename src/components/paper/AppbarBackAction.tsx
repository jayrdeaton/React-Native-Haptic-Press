import type { ComponentProps, ComponentType } from 'react'
import type { GestureResponderEvent } from 'react-native'

import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

// Local stand-in for react-native-paper's Appbar.BackAction, limited to the prop this
// wrapper touches plus a pass-through index signature — see src/paper.ts's
// PaperModuleShape for the same pattern. This intentionally avoids `typeof import
// ('react-native-paper')`, which forces TypeScript to resolve the peer's real type
// declarations even for consumers who never installed the optional "react-native-paper"
// peer dep.
type AppbarBackActionComponent = ComponentType<{
  // Optional param so this wrapper can invoke `onPress()` without an event, matching the
  // existing call below.
  onPress?: (e?: GestureResponderEvent) => void
  [prop: string]: unknown
}>

export type AppbarBackActionProps = ComponentProps<AppbarBackActionComponent>

export const AppbarBackAction = ({ onPress, ...props }: AppbarBackActionProps) => {
  const { Appbar } = requirePaper('AppbarBackAction')
  const { selection } = useVibration()

  const handlePress = onPress
    ? () => {
        selection()
        onPress()
      }
    : undefined

  return <Appbar.BackAction {...props} onPress={handlePress} />
}
