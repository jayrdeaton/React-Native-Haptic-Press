import { type GestureResponderEvent } from 'react-native'
import type { CardProps } from 'react-native-paper'

import { paper, requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type { CardProps }

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
) as typeof CardComponent & {
  Content: (typeof import('react-native-paper'))['Card']['Content']
  Title: (typeof import('react-native-paper'))['Card']['Title']
  Actions: (typeof import('react-native-paper'))['Card']['Actions']
  Cover: (typeof import('react-native-paper'))['Card']['Cover']
}
