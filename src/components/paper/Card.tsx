import { type GestureResponderEvent } from 'react-native'
import { Card as PaperCard, type CardProps } from 'react-native-paper'

import { useVibration } from '../../useVibration'

export type { CardProps }

export const Card = (props: CardProps) => {
  const { selection, notification } = useVibration()
  const { onPress, onLongPress, onPressIn } = props

  const isInteractive = !!(onPress || onLongPress)

  const handlePressIn = isInteractive
    ? (e: GestureResponderEvent) => { selection(); onPressIn?.(e) }
    : onPressIn

  // Paper Card.onLongPress is () => void (no event arg)
  const handleLongPress = onLongPress
    ? () => { notification(); onLongPress() }
    : undefined

  // Paper's Card union type requires a cast when spreading + overriding handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PaperCard {...(props as any)} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}

Card.Content = PaperCard.Content
Card.Title = PaperCard.Title
Card.Actions = PaperCard.Actions
Card.Cover = PaperCard.Cover
