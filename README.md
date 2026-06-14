# @rific/haptic-press

Haptic feedback wrappers for React Native Paper and built-in pressable components. Drop-in replacements that fire `selection` haptics on touch-down and `notification` haptics on long press — with a single provider to toggle them globally.

## Install

```sh
npm install @rific/haptic-press
```

**Peer dependencies:**

```sh
# Required
npm install expo-haptics react react-native

# Optional — only needed if using Paper wrappers
npm install react-native-paper
```

## Usage

### Without a provider (always-on)

The default context has haptics enabled, so the provider is optional if you don't need a toggle.

```tsx
import { Button, Card, TouchableRipple } from '@rific/haptic-press'

export function MyScreen() {
  return (
    <Card onPress={() => openDetail()}>
      <Card.Content>
        <TouchableRipple onPress={() => doSomething()}>
          <Text>Tap me</Text>
        </TouchableRipple>
        <Button onPress={() => submit()}>Submit</Button>
      </Card.Content>
    </Card>
  )
}
```

### With a provider (user-controlled toggle)

Wrap once at your app root and pass the user's settings — every component inside reads them automatically.

```tsx
import { HapticPressProvider } from '@rific/haptic-press'

export function App() {
  return (
    <HapticPressProvider initialValue={{ vibrate: true }} onChange={saveSettings}>
      <RootNavigator />
    </HapticPressProvider>
  )
}
```

### Using the hook directly

```tsx
import { useVibration } from '@rific/haptic-press'

export function DangerButton() {
  const { notification, forceDouble } = useVibration()

  return (
    <Pressable
      onPress={() => {
        notification() // respects the provider toggle
        deleteRecord()
      }}
      onLongPress={() => {
        forceDouble() // always fires, ignores the toggle
        wipeAll()
      }}
    />
  )
}
```

## Components

All components are drop-in replacements with identical prop types to their originals.

### Paper wrappers

| Component | Fires on | Note |
|---|---|---|
| `Button` | `onPressIn` | |
| `IconButton` | `onPressIn` | |
| `TouchableRipple` | `onPressIn` | |
| `Card` | `onPressIn` | `onLongPress` has no event arg (Paper) |
| `Chip` | `onPressIn` | `onLongPress` has no event arg (Paper) |
| `AppbarBackAction` | `onPress` | Paper doesn't expose `onPressIn` |
| `FAB` | `onPress` | Paper doesn't expose `onPressIn` |

`Card` re-exports its subcomponents: `Card.Content`, `Card.Title`, `Card.Actions`, `Card.Cover`.

### Native wrappers

| Component | Fires on |
|---|---|
| `Pressable` | `onPressIn` |
| `TouchableOpacity` | `onPressIn` |
| `TouchableHighlight` | `onPressIn` |

**Haptic timing:** `selection` fires on `onPressIn` (finger down) rather than `onPress` (finger up) to match native iOS feel. Long press fires `notification` on `onLongPress`. Elements with no `onPress` or `onLongPress` are treated as non-interactive and fire nothing.

## `HapticPressProvider`

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialValue` | `Partial<HapticSettings>` | `defaultHapticSettings` | Initial settings. Merged with defaults — partial is fine. |
| `onChange` | `(settings: HapticSettings) => void` | — | Called with the full settings object whenever settings change. |
| `children` | `ReactNode` | — | |

```ts
type HapticSettings = {
  vibrate: boolean  // default: true
}
```

### `useHapticSettings`

Read or update settings from anywhere inside the provider:

```tsx
import { useHapticSettings } from '@rific/haptic-press'

export function SettingsScreen() {
  const { settings, set } = useHapticSettings()

  return (
    <Switch
      value={settings.vibrate}
      onValueChange={(value) => set({ vibrate: value })}
    />
  )
}
```

### Redux integration

If your app uses Redux, wire the included slice to your store and bridge it to the provider:

```tsx
import { configureStore } from '@reduxjs/toolkit'
import { hapticReducer, hapticActions, HapticPressProvider } from '@rific/haptic-press'
import { useSelector, useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    haptic: hapticReducer,
    // ...
  }
})

export function App() {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.haptic)

  return (
    <HapticPressProvider
      initialValue={settings}
      onChange={(next) => dispatch(hapticActions.initialize(next))}
    >
      <RootNavigator />
    </HapticPressProvider>
  )
}
```

Available actions: `hapticActions.initialize(settings)` (replace all), `hapticActions.setVibrate(boolean)`.

## `useVibration`

```ts
const {
  // Semantic
  selection,           // () => void — light tap (iOS selectionAsync)
  notification,        // (type?) => void — success/warning/error pulse

  // Impact
  short,               // () => void — light impact
  medium,              // () => void — medium impact
  long,                // () => void — heavy impact
  double,              // () => void — two-pulse notification
  custom,              // (duration: number) => void

  // Force — bypass the enabled toggle
  force,               // (duration?: number) => void
  forceShort,          // () => void
  forceMedium,         // () => void
  forceLong,           // () => void
  forceDouble,         // () => void

  isEnabled,           // boolean — current provider state
} = useVibration()
```

All methods respect the `HapticPressProvider` `enabled` flag. The `force*` variants bypass it — use them for feedback that should always fire (error states, destructive confirmations).

On iOS, methods use `expo-haptics` native APIs. On Android, they fall back to `Vibration.vibrate()` with mapped durations.

## Usage with `@rific/auto-paper`

Paper wrappers automatically inherit the theme from `@rific/auto-paper`'s `Provider` — no extra wiring needed.

```tsx
import { Provider } from '@rific/auto-paper'
import { HapticPressProvider, Button } from '@rific/haptic-press'

export function App() {
  return (
    <Provider appearance="system" color="#FF6B6B">
      <HapticPressProvider initialValue={{ vibrate }}>
        <Button onPress={handlePress}>Themed + Haptic</Button>
      </HapticPressProvider>
    </Provider>
  )
}
```

## Platform notes

- **iOS** — uses `expo-haptics` (`selectionAsync`, `notificationAsync`, `impactAsync`)
- **Android** — falls back to `Vibration.vibrate()` with duration mapping
- **Web** — haptics are no-ops (expo-haptics returns silently)
