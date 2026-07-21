import type { ComponentType } from 'react'
import { type GestureResponderEvent } from 'react-native'

import { paper, requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

// Local mirror of react-native-paper's Card props, limited to what this wrapper touches
// plus a pass-through index signature — see src/paper.ts's PaperModuleShape for the same
// pattern. This intentionally avoids `import type { CardProps } from 'react-native-paper'`,
// which forces TypeScript to resolve the peer's real type declarations even for consumers
// who never installed the optional "react-native-paper" peer dep.
export type CardProps = {
  // Paper's real type discriminates 'outlined' as required-with-mode vs optional for
  // 'elevated'/'contained' — simplified to a plain optional union here, same tradeoff
  // as onLongPress below, to avoid mirroring the full discriminated-union shape.
  mode?: 'outlined' | 'elevated' | 'contained'
  onPress?: (e: GestureResponderEvent) => void
  onPressIn?: (e: GestureResponderEvent) => void
  // Paper's Card.onLongPress is () => void (no event arg)
  onLongPress?: () => void
  [prop: string]: unknown
}

// Local stand-in for react-native-paper's Card.Content/Title/Actions/Cover statics —
// matches PaperModuleShape['Card'] in src/paper.ts.
type PaperCardStatic = ComponentType<{ [prop: string]: unknown }>

const CardComponent = (props: CardProps) => {
  const { Card: PaperCard } = requirePaper('Card')
  const { selection, notification } = useVibration()
  const { onPress, onLongPress, onPressIn } = props

  const isInteractive = !!(onPress || onLongPress)

  const handlePressIn = isInteractive
    ? (e: GestureResponderEvent) => {
        selection()
        onPressIn?.(e)
      }
    : onPressIn

  // Paper Card.onLongPress is () => void (no event arg)
  const handleLongPress = onLongPress
    ? () => {
        notification()
        onLongPress()
      }
    : undefined

  // Paper's Card union type requires a cast when spreading + overriding handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PaperCard {...(props as any)} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}

// Statics are only attached when react-native-paper is installed (optional peer)
export const Card = Object.assign(
  CardComponent,
  paper
    ? {
        Content: paper.Card.Content,
        Title: paper.Card.Title,
        Actions: paper.Card.Actions,
        Cover: paper.Card.Cover
      }
    : {}
) as unknown as typeof CardComponent & {
  Content: PaperCardStatic
  Title: PaperCardStatic
  Actions: PaperCardStatic
  Cover: PaperCardStatic
}
