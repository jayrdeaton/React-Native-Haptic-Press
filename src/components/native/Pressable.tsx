import { Pressable as RNPressable, type PressableProps } from 'react-native'

import { useVibration } from '../../useVibration'

export type { PressableProps }

export const Pressable = ({ onPress, onLongPress, onPressIn, ...props }: PressableProps) => {
  const { selection, notification } = useVibration()

  const isInteractive = !!(onPress || onLongPress)

  const handlePressIn: typeof onPressIn = isInteractive
    ? (e) => { selection(); onPressIn?.(e) }
    : onPressIn

  const handleLongPress: typeof onLongPress = onLongPress
    ? (e) => { notification(); onLongPress(e) }
    : undefined

  return <RNPressable {...props} onPress={onPress} onPressIn={handlePressIn} onLongPress={handleLongPress} />
}
