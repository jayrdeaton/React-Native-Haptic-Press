export const selectionAsync = jest.fn()
export const notificationAsync = jest.fn()
export const impactAsync = jest.fn()

export enum ImpactFeedbackStyle {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
  Rigid = 'Rigid',
  Soft = 'Soft'
}

export enum NotificationFeedbackType {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error'
}
