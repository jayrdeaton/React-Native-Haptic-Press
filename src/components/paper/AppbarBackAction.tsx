import { Appbar } from 'react-native-paper'

import { useVibration } from '../../useVibration'

export type AppbarBackActionProps = React.ComponentProps<typeof Appbar.BackAction>

export const AppbarBackAction = ({ onPress, ...props }: AppbarBackActionProps) => {
  const { selection } = useVibration()

  const handlePress = onPress
    ? () => {
        selection()
        onPress()
      }
    : undefined

  return <Appbar.BackAction {...props} onPress={handlePress} />
}
