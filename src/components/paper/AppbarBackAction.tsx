import { requirePaper } from '../../paper'
import { useVibration } from '../../useVibration'

export type AppbarBackActionProps = React.ComponentProps<(typeof import('react-native-paper'))['Appbar']['BackAction']>

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
