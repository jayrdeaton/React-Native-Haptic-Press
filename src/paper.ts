export const paper = (() => {
  try {
    return require('react-native-paper') as typeof import('react-native-paper')
  } catch {
    return null
  }
})()

export const requirePaper = (component: string) => {
  if (!paper) throw new Error(`[@rific/haptic-press] <${component}> requires the optional peer dependency "react-native-paper" to be installed.`)
  return paper
}
